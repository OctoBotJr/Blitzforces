const express = require("express");
const controller = require("./rankings.controller");
const auth = require("../../middleware/auth.middleware");

const router = express.Router();

// Get global or tier-filtered rankings
router.get("/", controller.getRankings);

// Get top gainers in last 7 days
router.get("/top-gainers", controller.getTopGainers);

// Get current user's rank (requires auth)
router.get("/my-rank", auth, controller.getUserRank);

module.exports = router;
