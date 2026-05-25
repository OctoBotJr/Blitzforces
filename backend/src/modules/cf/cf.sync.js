const pool = require("../../config/db");
const redis = require("../../config/redis");
const { cfRequest } = require("./cf.client");

// Maps CF rating to tier string
function getTier(rating) {
  if (!rating || rating < 1200) return "newbie";
  if (rating < 1400) return "pupil";
  if (rating < 1600) return "specialist";
  if (rating < 1900) return "expert";
  if (rating < 2100) return "candidate master";
  if (rating < 2300) return "master";
  if (rating < 2400) return "international master";
  if (rating < 3000) return "grandmaster";
  return "legendary grandmaster";
}

// Fetch CF user info (rating, handle) and update users table
async function syncUserInfo(userId, cfHandle) {
  const [info] = await cfRequest("user.info", { handles: cfHandle });

  const rating = info.rating || 0;
  const tier = getTier(rating);

  const { rows } = await pool.query(
    `UPDATE users
     SET cf_rating = $1, cf_tier = $2
     WHERE id = $3
     RETURNING cf_tier`,
    [rating, tier, userId],
  );

  return { rating, tier, previousTier: rows[0]?.cf_tier };
}

// Fetch all AC submissions, upsert problems + user_solved_problems, populate Redis
async function syncUserSolvedProblems(userId, cfHandle) {
  const submissions = await cfRequest("user.status", {
    handle: cfHandle,
    from: 1,
    count: 10000,
  });

  // Only AC with a rated problem
  const seen = new Map();
  for (const s of submissions) {
    if (s.verdict !== "OK" || !s.problem.rating || !s.problem.contestId)
      continue;
    const key = `${s.problem.contestId}-${s.problem.index}`;
    if (!seen.has(key)) {
      seen.set(key, {
        cf_contest_id: s.problem.contestId,
        cf_index: s.problem.index,
        title: s.problem.name,
        rating: s.problem.rating,
        tags: s.problem.tags ?? [],
        solved_at: new Date(s.creationTimeSeconds * 1000),
      });
    }
  }

  if (seen.size === 0) return;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    for (const p of seen.values()) {
      // Upsert problem
      const { rows } = await client.query(
        `INSERT INTO problems (cf_contest_id, cf_index, title, rating, tags, fetched_at)
         VALUES ($1,$2,$3,$4,$5,NOW())
         ON CONFLICT (cf_contest_id, cf_index)
         DO UPDATE SET title=EXCLUDED.title, rating=EXCLUDED.rating,
                       tags=EXCLUDED.tags, fetched_at=NOW()
         RETURNING id`,
        [p.cf_contest_id, p.cf_index, p.title, p.rating, p.tags],
      );

      const problemId = rows[0].id;

      // Upsert user_solved_problems
      await client.query(
        `INSERT INTO user_solved_problems (user_id, problem_id, solved_at)
         VALUES ($1,$2,$3)
         ON CONFLICT (user_id, problem_id) DO NOTHING`,
        [userId, problemId, p.solved_at],
      );

      // Redis SET for fast duel-time lookup
      await redis.sAdd(`user:${userId}:solved`, String(problemId));
    }

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }

  await redis.set(`user:${userId}:last_sync`, Date.now());
  console.log(`[cf.sync] ${cfHandle}: ${seen.size} problems synced`);
}

// Master sync — call this on login & from cron job
async function syncUser(userId, cfHandle) {
  await syncUserInfo(userId, cfHandle);
  await syncUserSolvedProblems(userId, cfHandle);
}

module.exports = { syncUser, syncUserInfo, syncUserSolvedProblems, getTier };
