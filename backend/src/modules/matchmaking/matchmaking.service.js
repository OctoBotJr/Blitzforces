const redis = require("../../config/redis");
const { getUserRating } = require("./matchmaking.repository");
const { createDuel } = require("../duel/duel.service");

const QUEUE_KEY = "matchmaking:queue"; // sorted set: score=rating, member=userId
const WAIT_TIMES = [0, 30, 60]; // seconds → band widens at each threshold
const RATING_BANDS = [200, 300, 400]; // ±band at each threshold
const BOT_WAIT_SECS = 90; // if no match after 90s → bot

// Duration options based on lower-rated player's tier
function getDurationOptions(lowerTier) {
  const expertAndAbove = [
    "expert",
    "candidate master",
    "master",
    "international master",
    "grandmaster",
    "legendary grandmaster",
  ];
  return expertAndAbove.includes(lowerTier) ? [30, 60] : [20, 40];
}

function getRatingBand(joinedAt) {
  const waited = (Date.now() - joinedAt) / 1000;
  if (waited >= WAIT_TIMES[2]) return RATING_BANDS[2];
  if (waited >= WAIT_TIMES[1]) return RATING_BANDS[1];
  return RATING_BANDS[0];
}

async function joinQueue(userId) {
  // Prevent duplicate queue entry
  const existing = await redis.hGet(`matchmaking:user:${userId}`, "joinedAt");
  if (existing) return { status: "already_queued" };

  // Prevent joining if already in active duel
  const activeDuel = await redis.get(`user:${userId}:active_duel`);
  if (activeDuel) return { status: "active_duel", duelId: activeDuel };

  const userInfo = await getUserRating(userId);
  if (!userInfo) throw new Error("User not found");

  const { cf_rating: rating, cf_tier: tier } = userInfo;
  const joinedAt = Date.now();

  // Add to sorted set (score = cf_rating for range queries)
  await redis.zAdd(QUEUE_KEY, { score: rating, value: String(userId) });

  // Store metadata
  await redis.hSet(`matchmaking:user:${userId}`, {
    joinedAt: String(joinedAt),
    rating: String(rating),
    tier,
  });

  return { status: "queued", joinedAt };
}

async function leaveQueue(userId) {
  await redis.zRem(QUEUE_KEY, String(userId));
  await redis.del(`matchmaking:user:${userId}`);
}

// Called by matchmaking worker every 5s
async function processQueue() {
  const members = await redis.zRangeWithScores(QUEUE_KEY, 0, -1);
  if (members.length < 1) return;

  const processed = new Set();

  for (const { value: userIdStr, score: rating } of members) {
    const userId = parseInt(userIdStr, 10);
    if (processed.has(userId)) continue;

    const meta = await redis.hGetAll(`matchmaking:user:${userId}`);
    if (!meta?.joinedAt) continue;

    const joinedAt = parseInt(meta.joinedAt, 10);
    const waited = (Date.now() - joinedAt) / 1000;
    const band = getRatingBand(joinedAt);

    // Check for bot fallback first
    if (waited >= BOT_WAIT_SECS) {
      await matchWithBot(userId, parseInt(meta.rating, 10), meta.tier);
      processed.add(userId);
      continue;
    }

    // Find opponent in rating band
    const minRating = rating - band;
    const maxRating = rating + band;

    const candidates = await redis.zRangeByScore(
      QUEUE_KEY,
      minRating,
      maxRating,
    );

    const opponent = candidates
      .map(Number)
      .find((id) => id !== userId && !processed.has(id));

    if (!opponent) continue;

    // Match found — create duel
    await matchPlayers(userId, opponent, parseInt(meta.rating, 10));
    processed.add(userId);
    processed.add(opponent);
  }
}

async function matchPlayers(userId1, userId2, rating1) {
  const [meta1, meta2] = await Promise.all([
    redis.hGetAll(`matchmaking:user:${userId1}`),
    redis.hGetAll(`matchmaking:user:${userId2}`),
  ]);

  const rating2 = parseInt(meta2.rating, 10);
  const avgRating = Math.round((rating1 + rating2) / 2);

  // Duration based on lower-rated player's tier
  const lowerTier = rating1 <= rating2 ? meta1.tier : meta2.tier;
  const durationOpts = getDurationOptions(lowerTier);
  const duration = durationOpts[0]; // default to shorter duration; UI can override later

  const duel = await createDuel({
    player1Id: userId1,
    player2Id: userId2,
    avgRating,
    duration,
    mode: "normal",
    isBot: false,
  });

  // Store duelId in matchmaking meta so status poll can return it
  await Promise.all([
    redis.hSet(`matchmaking:user:${userId1}`, "duelId", String(duel.id)),
    redis.hSet(`matchmaking:user:${userId2}`, "duelId", String(duel.id)),
    redis.set(`user:${userId1}:active_duel`, String(duel.id)),
    redis.set(`user:${userId2}:active_duel`, String(duel.id)),
  ]);

  // Remove from queue
  await Promise.all([
    redis.zRem(QUEUE_KEY, String(userId1)),
    redis.zRem(QUEUE_KEY, String(userId2)),
  ]);

  return duel;
}

async function matchWithBot(userId, rating, tier) {
  const durationOpts = getDurationOptions(tier);
  const duration = durationOpts[0];
  const avgRating = rating; // bot matches player rating exactly

  const duel = await createDuel({
    player1Id: userId,
    player2Id: null, // null = bot
    avgRating,
    duration,
    mode: "normal",
    isBot: true,
  });

  await Promise.all([
    redis.hSet(`matchmaking:user:${userId}`, "duelId", String(duel.id)),
    redis.set(`user:${userId}:active_duel`, String(duel.id)),
    redis.zRem(QUEUE_KEY, String(userId)),
  ]);

  return duel;
}

// Frontend polls this to know if matched
async function getQueueStatus(userId) {
  const activeDuel = await redis.get(`user:${userId}:active_duel`);
  if (activeDuel)
    return { status: "matched", duelId: parseInt(activeDuel, 10) };

  const meta = await redis.hGetAll(`matchmaking:user:${userId}`);
  if (!meta?.joinedAt) return { status: "not_queued" };

  // If duelId set but active_duel key expired
  if (meta.duelId)
    return { status: "matched", duelId: parseInt(meta.duelId, 10) };

  const waited = Math.floor((Date.now() - parseInt(meta.joinedAt, 10)) / 1000);
  return {
    status: "queued",
    waited,
    band: getRatingBand(parseInt(meta.joinedAt, 10)),
  };
}

module.exports = { joinQueue, leaveQueue, processQueue, getQueueStatus };
