const repo = require("./user.repository");

function formatSolveTime(minutes) {
  if (!minutes || minutes < 0) return null;
  const m = Math.floor(minutes);
  const s = Math.round((minutes - m) * 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function getInitials(handle) {
  return handle.slice(0, 2).toUpperCase();
}

async function getProfile(userId) {
  const [
    user,
    solvedCount,
    pointsHistory,
    activityGrid,
    stats,
    bestWinsRaw,
    gameHistoryRaw,
    currentStreak,
  ] = await Promise.all([
    repo.getUserById(userId),
    repo.getSolvedCount(userId),
    repo.getPointsHistory(userId),
    repo.getDuelActivity(userId),
    repo.getDuelStats(userId),
    repo.getBestWins(userId),
    repo.getGameHistory(userId),
    repo.getCurrentStreak(userId),
  ]);

  if (!user) throw new Error("User not found");

  // Format rating history for graph
  const ratingHistory = pointsHistory.map((p, i) => ({
    date: new Date(p.date).toISOString().slice(0, 10),
    rating: p.points,
    contestName: `Duel #${i + 1} (${p.duel_mode})`,
    delta: p.delta,
  }));

  // Best wins
  const bestWins = bestWinsRaw.map((w) => ({
    opponent: w.opponent,
    opponentRating: w.opponent_rating,
    opponentInitials: getInitials(w.opponent),
    problemId: w.problem_id,
    problemRating: w.problem_rating,
    solveTime: formatSolveTime(w.solve_minutes) ?? "—",
    ratingGained: w.points_gained,
    date: new Date(w.date).toISOString().slice(0, 10),
  }));

  // Game history
  const gameHistory = gameHistoryRaw.map((g) => ({
    id: String(g.id),
    date: new Date(g.date).toISOString().slice(0, 10),
    opponent: g.opponent,
    opponentRating: g.opponent_rating,
    opponentInitials: getInitials(g.opponent),
    result: g.winner_id === userId ? "won" : "lost",
    problemId: g.problem_id,
    problemName: g.problem_name,
    problemRating: g.problem_rating,
    solveTime: formatSolveTime(g.solve_minutes),
    ratingDelta: g.rating_delta ?? 0,
    isBet: g.game_type === "bet",
    betAmount: g.bet_amount || undefined,
    gameType: g.game_type === "bet" ? "bet" : "rated",
  }));

  const total = parseInt(stats.total, 10);
  const won = parseInt(stats.won, 10);
  const lost = parseInt(stats.lost, 10);
  const totalBets = parseInt(stats.total_bets, 10);
  const betsWon = parseInt(stats.bets_won, 10);

  return {
    // Hero
    handle: user.cf_handle,
    email: user.email,
    cfHandle: user.cf_handle,
    cfRating: user.cf_rating,
    cfTier: user.cf_tier,
    blitzforcePoints: user.blitzforce_points,
    joinedDate: new Date(user.created_at).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    }),
    solvedCount,

    // Stats
    gamesPlayed: total,
    gamesWon: won,
    gamesLost: lost,
    winStreak: currentStreak,
    totalBets,
    betsWon,
    betsLost: totalBets - betsWon,

    // Graph data
    ratingHistory,
    activityGrid,
    bestWins,
    gameHistory,
  };
}

module.exports = { getProfile };
