const rankingsService = require("./rankings.services");

async function getRankings(req, res) {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 50;
    const tier = req.query.tier || null;

    const data = await rankingsService.getRankings(page, limit, tier);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getTopGainers(req, res) {
  try {
    const gainers = await rankingsService.getTopGainers();
    res.json(gainers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getUserRank(req, res) {
  try {
    const rankInfo = await rankingsService.getUserRankInfo(req.userId);
    res.json(rankInfo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  getRankings,
  getTopGainers,
  getUserRank,
};
