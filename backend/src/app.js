require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./modules/auth/auth.routes");
const userRoutes = require("./modules/user/user.routes");
const matchmakingRoutes = require("./modules/matchmaking/matchmaking.routes");
const duelRoutes = require("./modules/duel/duel.routes");
const rankingsRoutes = require("./modules/rankings/rankings.routes");

require("./jobs/cf.sync.job");
require("./jobs/matchmaking.worker");
require("./modules/cf/cf.poller");

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" }));
app.use(express.json());

// ── Routes ────────────────────────────────────────────────────────────────────
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/matchmaking", matchmakingRoutes);
app.use("/duel", duelRoutes);
app.use("/rankings", rankingsRoutes);

// ── Health check ─────────────────────────────────────────────────────────────
app.get("/health", (_req, res) => res.json({ status: "ok" }));

// ── Error handler ─────────────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`[server] Running on port ${PORT}`));
