const redis = require("../../config/redis");
const { getEligibleProblem } = require("./problem.repository");

// Get union of solved problem IDs for both players from Redis
// Falls back to empty if Redis sets don't exist yet
async function getSolvedUnion(userId1, userId2) {
  const [s1, s2] = await Promise.all([
    redis.sMembers(`user:${userId1}:solved`),
    userId2 ? redis.sMembers(`user:${userId2}:solved`) : Promise.resolve([]),
  ]);
  // Union — problem unsolved by BOTH means excluded if solved by EITHER
  const union = new Set([...s1, ...s2]);
  return Array.from(union).map(Number);
}

async function selectProblem(player1Id, player2Id, avgRating) {
  const minRating = avgRating - 100;
  const maxRating = avgRating + 100;

  const solvedIds = await getSolvedUnion(player1Id, player2Id);
  const problem = await getEligibleProblem(minRating, maxRating, solvedIds);

  if (!problem) {
    // Widen range if nothing found
    const fallback = await getEligibleProblem(
      avgRating - 200,
      avgRating + 200,
      solvedIds,
    );
    return fallback ?? null;
  }
  return problem;
}

module.exports = { selectProblem };
