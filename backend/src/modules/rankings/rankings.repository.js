const pool = require("../../config/db");

/**
 * Get global rankings ordered by blitzforce points
 * @param {number} limit - Number of users to fetch
 * @param {number} offset - Pagination offset
 * @returns {Promise<Array>}
 */
async function getGlobalRankings(limit = 50, offset = 0) {
  const { rows } = await pool.query(
    `
    SELECT
      u.id,
      u.cf_handle,
      u.email,
      u.cf_rating,
      u.cf_tier,
      u.blitzforce_points,
      u.created_at,

      COUNT(d.id) FILTER (
        WHERE d.status = 'finished'
      ) AS games_played,

      COUNT(d.id) FILTER (
        WHERE d.status = 'finished'
        AND d.winner_id = u.id
      ) AS games_won,

      COUNT(d.id) FILTER (
        WHERE d.status = 'finished'
        AND d.winner_id IS NOT NULL
        AND d.winner_id != u.id
      ) AS games_lost

    FROM users u

    LEFT JOIN duels d
      ON (
        d.player1_id = u.id
        OR d.player2_id = u.id
      )

    GROUP BY u.id

    ORDER BY
      u.blitzforce_points DESC,
      u.cf_rating DESC

    LIMIT $1
    OFFSET $2
    `,
    [limit, offset],
  );

  return rows;
}
/**
 * Get total count of users for pagination
 */
async function getTotalUserCount() {
  const { rows } = await pool.query(`SELECT COUNT(*) AS count FROM users`);
  return parseInt(rows[0].count, 10);
}

/**
 * Get user's rank position
 */
async function getUserRank(userId) {
  const { rows } = await pool.query(
    `SELECT COUNT(*) + 1 AS rank
     FROM users
     WHERE blitzforce_points > (
       SELECT blitzforce_points FROM users WHERE id = $1
     )`,
    [userId],
  );
  return parseInt(rows[0].rank, 10);
}

/**
 * Get rankings filtered by tier
 */
async function getRankingsByTier(tier, limit = 50, offset = 0) {
  const { rows } = await pool.query(
    `SELECT 
       u.id,
       u.cf_handle,
       u.email,
       u.cf_rating,
       u.cf_tier,
       u.blitzforce_points,
       u.created_at,
       COUNT(d.id) FILTER (WHERE d.status = 'finished') AS games_played,
       COUNT(d.id) FILTER (WHERE d.status = 'finished' AND d.winner_id = u.id) AS games_won,
       COUNT(d.id) FILTER (WHERE d.status = 'finished' AND d.winner_id != u.id AND d.winner_id IS NOT NULL) AS games_lost
     FROM users u
     LEFT JOIN duels d ON (d.player1_id = u.id OR d.player2_id = u.id)
     WHERE u.cf_tier = $1
     GROUP BY u.id
     ORDER BY u.blitzforce_points DESC, u.cf_rating DESC
     LIMIT $2 OFFSET $3`,
    [tier, limit, offset],
  );
  return rows;
}

/**
 * Get top gainers in the last 7 days
 */
async function getTopGainers(limit = 10) {
  const { rows } = await pool.query(
    `SELECT 
       u.id,
       u.cf_handle,
       u.cf_rating,
       u.cf_tier,
       u.blitzforce_points,
       SUM(ph.delta) AS points_gained,
       COUNT(ph.id) AS duels_played
     FROM users u
     JOIN points_history ph ON ph.user_id = u.id
     WHERE ph.created_at >= NOW() - INTERVAL '7 days'
     GROUP BY u.id
     HAVING SUM(ph.delta) > 0
     ORDER BY points_gained DESC
     LIMIT $1`,
    [limit],
  );
  return rows;
}

module.exports = {
  getGlobalRankings,
  getTotalUserCount,
  getUserRank,
  getRankingsByTier,
  getTopGainers,
};
