const pool = require("../../config/db");

async function createDuel({
  player1Id,
  player2Id,
  problemId,
  mode,
  durationMins,
  betAmount = 0,
}) {
  const endsAt = new Date(Date.now() + durationMins * 60 * 1000);
  const { rows } = await pool.query(
    `INSERT INTO duels (player1_id, player2_id, problem_id, mode, duration_mins, bet_amount, ends_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7)
     RETURNING *`,
    [player1Id, player2Id, problemId, mode, durationMins, betAmount, endsAt],
  );
  return rows[0];
}

async function getDuelById(duelId) {
  const { rows } = await pool.query(
    `SELECT d.*,
            p.cf_contest_id, p.cf_index, p.title AS problem_title, p.rating AS problem_rating,
            u1.cf_handle AS p1_handle, u1.cf_rating AS p1_rating,
            u2.cf_handle AS p2_handle, u2.cf_rating AS p2_rating
     FROM duels d
     JOIN problems p ON p.id = d.problem_id
     JOIN users u1   ON u1.id = d.player1_id
     LEFT JOIN users u2 ON u2.id = d.player2_id
     WHERE d.id = $1`,
    [duelId],
  );
  return rows[0] ?? null;
}

async function setDuelWinner(duelId, winnerId) {
  await pool.query(
    `UPDATE duels SET winner_id=$1, status='finished', finished_at=NOW() WHERE id=$2`,
    [winnerId, duelId],
  );
}

async function setDuelTie(duelId) {
  await pool.query(
    `UPDATE duels SET status='finished', finished_at=NOW() WHERE id=$1`,
    [duelId],
  );
}

async function insertSubmission({
  duelId,
  userId,
  cfSubmissionId,
  verdict,
  submittedAt,
  penaltyMinutes,
}) {
  await pool.query(
    `INSERT INTO submissions (duel_id, user_id, cf_submission_id, verdict, submitted_at, penalty_minutes)
     VALUES ($1,$2,$3,$4,$5,$6)
     ON CONFLICT (cf_submission_id) DO NOTHING`,
    [duelId, userId, cfSubmissionId, verdict, submittedAt, penaltyMinutes],
  );
}

async function getWACount(duelId, userId) {
  const { rows } = await pool.query(
    `SELECT COUNT(*) AS count FROM submissions
     WHERE duel_id=$1 AND user_id=$2 AND verdict != 'AC'`,
    [duelId, userId],
  );
  return parseInt(rows[0].count, 10);
}

async function hasAC(duelId, userId) {
  const { rows } = await pool.query(
    `SELECT id FROM submissions
     WHERE duel_id=$1 AND user_id=$2 AND verdict='AC' LIMIT 1`,
    [duelId, userId],
  );
  return rows.length > 0;
}

async function updateUserPoints(userId, delta) {
  const { rows } = await pool.query(
    `UPDATE users SET blitzforce_points = blitzforce_points + $1
     WHERE id = $2
     RETURNING blitzforce_points`,
    [delta, userId],
  );
  return rows[0].blitzforce_points;
}

async function insertPointsHistory({
  userId,
  duelId,
  pointsBefore,
  pointsAfter,
  delta,
}) {
  await pool.query(
    `INSERT INTO points_history (user_id, duel_id, points_before, points_after, delta)
     VALUES ($1,$2,$3,$4,$5)`,
    [userId, duelId, pointsBefore, pointsAfter, delta],
  );
}

async function getUserPoints(userId) {
  const { rows } = await pool.query(
    "SELECT blitzforce_points FROM users WHERE id=$1",
    [userId],
  );
  return rows[0]?.blitzforce_points ?? 0;
}

async function getSubmissions(duelId) {
  const { rows } = await pool.query(
    `
    SELECT
      s.id,
      s.user_id,
      s.verdict,
      s.submitted_at,
      s.penalty_minutes,
      u.cf_handle
    FROM submissions s
    JOIN users u
      ON u.id = s.user_id
    WHERE s.duel_id = $1
    ORDER BY s.submitted_at ASC
    `,
    [duelId],
  );

  return rows;
}

module.exports = {
  createDuel,
  getDuelById,
  setDuelWinner,
  setDuelTie,
  insertSubmission,
  getWACount,
  hasAC,
  updateUserPoints,
  insertPointsHistory,
  getUserPoints,
  getSubmissions,
};
