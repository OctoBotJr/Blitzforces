const pool = require("../../config/db");

// Get a problem unsolved by both players within rating range
// solvedByEither: array of problem IDs already solved by either player
async function getEligibleProblem(minRating, maxRating, solvedIds) {
  const excluded = solvedIds.length > 0 ? solvedIds : [-1];
  const { rows } = await pool.query(
    `SELECT id, cf_contest_id, cf_index, title, rating
     FROM problems
     WHERE rating BETWEEN $1 AND $2
       AND id != ALL($3::int[])
     ORDER BY RANDOM()
     LIMIT 1`,
    [minRating, maxRating, excluded],
  );
  return rows[0] ?? null;
}

module.exports = { getEligibleProblem };
