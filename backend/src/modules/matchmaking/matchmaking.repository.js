const pool = require("../../config/db");

async function getUserRating(userId) {
  const { rows } = await pool.query(
    "SELECT cf_rating, cf_tier FROM users WHERE id = $1",
    [userId],
  );
  return rows[0] ?? null;
}

module.exports = { getUserRating };
