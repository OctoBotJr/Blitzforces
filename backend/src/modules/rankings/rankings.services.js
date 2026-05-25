const repo = require("./rankings.repository");

function getInitials(handle) {
  return handle.slice(0, 2).toUpperCase();
}

function calculateWinRate(won, total) {
  if (total === 0) return 0;
  return Math.round((won / total) * 100);
}

async function getRankings(page = 1, limit = 50, tier = null) {
  const offset = (page - 1) * limit;

  let rankings;
  if (tier) {
    rankings = await repo.getRankingsByTier(tier, limit, offset);
  } else {
    rankings = await repo.getGlobalRankings(limit, offset);
  }

  const totalUsers = await repo.getTotalUserCount();
  const totalPages = Math.ceil(totalUsers / limit);

  // Format rankings
  const formattedRankings = rankings.map((user, index) => {
    const gamesPlayed = parseInt(user.games_played, 10);
    const gamesWon = parseInt(user.games_won, 10);
    const gamesLost = parseInt(user.games_lost, 10);

    return {
      rank: offset + index + 1,
      handle: user.cf_handle,
      initials: getInitials(user.cf_handle),
      rating: user.blitzforce_points,
      cfRating: user.cf_rating,
      tier: user.cf_tier,
      gamesPlayed,
      gamesWon,
      gamesLost,
      winRate: calculateWinRate(gamesWon, gamesPlayed),
      winStreak: 0,
      joinedDate: new Date(user.created_at).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
    };
  });

  return {
    rankings: formattedRankings,
    pagination: {
      currentPage: page,
      totalPages,
      totalUsers,
      limit,
    },
  };
}

async function getTopGainers() {
  const gainers = await repo.getTopGainers(10);

  return gainers.map((user, index) => ({
    rank: index + 1,
    handle: user.cf_handle,
    initials: getInitials(user.cf_handle),
    rating: user.blitzforce_points,
    cfRating: user.cf_rating,
    tier: user.cf_tier,
    pointsGained: parseInt(user.points_gained, 10),
    duelsPlayed: parseInt(user.duels_played, 10),
  }));
}

async function getUserRankInfo(userId) {
  const rank = await repo.getUserRank(userId);
  return { rank };
}

module.exports = {
  getRankings,
  getTopGainers,
  getUserRankInfo,
};
