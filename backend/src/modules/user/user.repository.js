const pool = require("../../config/db");

async function getUserById(userId) {
  const { rows } = await pool.query(
    `SELECT id, cf_handle, email, cf_rating, cf_tier, blitzforce_points, created_at
     FROM users WHERE id = $1`,
    [userId],
  );
  return rows[0] ?? null;
}

async function getSolvedCount(userId) {
  const { rows } = await pool.query(
    `SELECT COUNT(*) AS count FROM user_solved_problems WHERE user_id = $1`,
    [userId],
  );
  return parseInt(rows[0].count, 10);
}

// Blitzforce points history per duel (for rating graph)
async function getPointsHistory(userId) {
  const { rows } = await pool.query(
    `SELECT ph.points_after AS points,
            ph.delta,
            ph.created_at  AS date,
            d.mode         AS duel_mode
     FROM points_history ph
     JOIN duels d ON d.id = ph.duel_id
     WHERE ph.user_id = $1
     ORDER BY ph.created_at ASC`,
    [userId],
  );
  return rows;
}

// Duel activity per day (for activity grid)
async function getDuelActivity(userId) {
  const { rows } = await pool.query(
    `SELECT DATE(started_at)::text AS date, COUNT(*) AS count
     FROM duels
     WHERE (player1_id = $1 OR player2_id = $1)
       AND status = 'finished'
       AND started_at >= NOW() - INTERVAL '1 year'
     GROUP BY DATE(started_at)
     ORDER BY date ASC`,
    [userId],
  );
  return rows.map((r) => ({ date: r.date, count: parseInt(r.count, 10) }));
}

// Duel stats: wins, losses, streaks, bets
async function getDuelStats(userId) {
  const { rows } = await pool.query(
    `SELECT
       COUNT(*)                                          AS total,
       COUNT(*) FILTER (WHERE winner_id = $1)           AS won,
       COUNT(*) FILTER (WHERE winner_id != $1
                          AND winner_id IS NOT NULL)     AS lost,
       COUNT(*) FILTER (WHERE mode = 'bet')             AS total_bets,
       COUNT(*) FILTER (WHERE mode = 'bet'
                          AND winner_id = $1)           AS bets_won
     FROM duels
     WHERE (player1_id = $1 OR player2_id = $1)
       AND status = 'finished'`,
    [userId],
  );
  return rows[0];
}

// Best wins: top 3 wins against highest-rated opponents
async function getBestWins(userId) {
  const { rows } = await pool.query(
    `SELECT
       d.id,
       d.started_at                                         AS date,
       opp.cf_handle                                        AS opponent,
       opp.cf_rating                                        AS opponent_rating,
       p.cf_contest_id || p.cf_index                        AS problem_id,
       p.rating                                             AS problem_rating,
       ph.delta                                             AS points_gained,
       -- fastest AC submission time in minutes
       EXTRACT(EPOCH FROM (
         SELECT MIN(s.submitted_at) FROM submissions s
         WHERE s.duel_id = d.id AND s.user_id = $1 AND s.verdict = 'AC'
       ) - d.started_at) / 60.0                            AS solve_minutes
     FROM duels d
     JOIN users opp ON opp.id = CASE
                         WHEN d.player1_id = $1 THEN d.player2_id
                         ELSE d.player1_id END
     JOIN problems p   ON p.id  = d.problem_id
     JOIN points_history ph ON ph.duel_id = d.id AND ph.user_id = $1
     WHERE d.winner_id = $1
       AND d.status = 'finished'
     ORDER BY opp.cf_rating DESC
     LIMIT 3`,
    [userId],
  );
  return rows;
}

// Last 100 duels for game history table
async function getGameHistory(userId) {
  const { rows } = await pool.query(
    `SELECT
       d.id,
       d.started_at                                         AS date,
       d.mode                                               AS game_type,
       d.bet_amount,
       d.winner_id,
       opp.cf_handle                                        AS opponent,
       opp.cf_rating                                        AS opponent_rating,
       p.cf_contest_id || p.cf_index                        AS problem_id,
       p.title                                              AS problem_name,
       p.rating                                             AS problem_rating,
       ph.delta                                             AS rating_delta,
       EXTRACT(EPOCH FROM (
         SELECT MIN(s.submitted_at) FROM submissions s
         WHERE s.duel_id = d.id AND s.user_id = $1 AND s.verdict = 'AC'
       ) - d.started_at) / 60.0                            AS solve_minutes
     FROM duels d
     JOIN users opp ON opp.id = CASE
                         WHEN d.player1_id = $1 THEN d.player2_id
                         ELSE d.player1_id END
     JOIN problems p        ON p.id  = d.problem_id
     LEFT JOIN points_history ph ON ph.duel_id = d.id AND ph.user_id = $1
     WHERE (d.player1_id = $1 OR d.player2_id = $1)
       AND d.status = 'finished'
     ORDER BY d.started_at DESC
     LIMIT 100`,
    [userId],
  );
  return rows;
}

// Current win streak
async function getCurrentStreak(userId) {
  const { rows } = await pool.query(
    `SELECT winner_id FROM duels
     WHERE (player1_id = $1 OR player2_id = $1)
       AND status = 'finished'
       AND winner_id IS NOT NULL
     ORDER BY finished_at DESC
     LIMIT 20`,
    [userId],
  );
  let streak = 0;
  for (const row of rows) {
    if (row.winner_id === userId) streak++;
    else break;
  }
  return streak;
}

module.exports = {
  getUserById,
  getSolvedCount,
  getPointsHistory,
  getDuelActivity,
  getDuelStats,
  getBestWins,
  getGameHistory,
  getCurrentStreak,
};
