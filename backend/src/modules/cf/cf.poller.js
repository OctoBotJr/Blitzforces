const cron = require("node-cron");
const pool = require("../../config/db");
const redis = require("../../config/redis");
const { cfRequest } = require("./cf.client");
const { handlePlayerAC, handleDuelTimeout } = require("../duel/duel.service");
const repo = require("../duel/duel.repository");

// Runs every 2 minutes
cron.schedule("*/10 * * * * *", async () => {
  try {
    await pollActiveDuels();
  } catch (err) {
    console.error("[cf.poller] Error:", err.message);
  }
});

async function pollActiveDuels() {
  // Get all active duels from DB
  const { rows: duels } = await pool.query(
    `SELECT d.id, d.player1_id, d.player2_id, d.started_at, d.ends_at,
            u1.cf_handle AS p1_handle,
            u2.cf_handle AS p2_handle
     FROM duels d
     JOIN users u1 ON u1.id = d.player1_id
     LEFT JOIN users u2 ON u2.id = d.player2_id
     WHERE d.status = 'active'`,
  );

  for (const duel of duels) {
    // Handle timeout first
    if (new Date() > new Date(duel.ends_at)) {
      await handleDuelTimeout(duel.id);
      continue;
    }

    // Poll real players only
    const players = [
      { id: duel.player1_id, handle: duel.p1_handle },
      ...(duel.player2_id
        ? [{ id: duel.player2_id, handle: duel.p2_handle }]
        : []),
    ];

    for (const player of players) {
      await pollPlayerSubmissions(duel, player);
    }
  }
}

async function pollPlayerSubmissions(duel, player) {
  // Skip if already has AC
  const alreadyAC = await repo.hasAC(duel.id, player.id);
  if (alreadyAC) return;

  try {
    // Fetch last 10 submissions since duel started
    const submissions = await cfRequest("user.status", {
      handle: player.handle,
      from: 1,
      count: 10,
    });

    const duelStart = new Date(duel.started_at);

    for (const sub of submissions) {
      const subTime = new Date(sub.creationTimeSeconds * 1000);
      if (subTime < duelStart) break; // submissions are newest-first; stop at pre-duel

      const problemId = `${sub.problem.contestId}${sub.problem.index}`;

      // Get duel's problem to check match
      const duelRow = await repo.getDuelById(duel.id);
      const duelProblemId = `${duelRow.cf_contest_id}${duelRow.cf_index}`;

      if (problemId !== duelProblemId) continue;

      if (sub.verdict === "OK") {
        // AC found
        await repo.insertSubmission({
          duelId: duel.id,
          userId: player.id,
          cfSubmissionId: sub.id,
          verdict: "AC",
          submittedAt: subTime,
          penaltyMinutes: parseInt(
            (await redis.hGet(`duel:${duel.id}:wa`, String(player.id))) ?? "0",
            10,
          ),
        });
        await handlePlayerAC(duel.id, player.id, subTime);
        break;
      } else if (
        [
          "WRONG_ANSWER",
          "TIME_LIMIT_EXCEEDED",
          "RUNTIME_ERROR",
          "COMPILATION_ERROR",
        ].includes(sub.verdict)
      ) {
        // Check if already stored this submission
        const { rows } = await pool.query(
          "SELECT id FROM submissions WHERE cf_submission_id=$1",
          [sub.id],
        );
        if (rows.length > 0) continue;

        // Increment WA counter in Redis
        await redis.hIncrBy(`duel:${duel.id}:wa`, String(player.id), 1);
        const waCount = parseInt(
          (await redis.hGet(`duel:${duel.id}:wa`, String(player.id))) ?? "0",
          10,
        );

        await repo.insertSubmission({
          duelId: duel.id,
          userId: player.id,
          cfSubmissionId: sub.id,
          verdict:
            sub.verdict === "WRONG_ANSWER"
              ? "WA"
              : sub.verdict === "TIME_LIMIT_EXCEEDED"
                ? "TLE"
                : sub.verdict === "RUNTIME_ERROR"
                  ? "RE"
                  : "CE",
          submittedAt: subTime,
          penaltyMinutes: waCount - 1, // WAs before this one
        });
      }
    }
  } catch (err) {
    console.error(`[cf.poller] Failed for ${player.handle}:`, err.message);
    // Continue polling other players — don't throw
  }
}

module.exports = { pollActiveDuels };
