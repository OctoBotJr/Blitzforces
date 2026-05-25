const {
  joinQueue,
  leaveQueue,
  getQueueStatus,
} = require("./matchmaking.service");

async function join(req, res) {
  try {
    const result = await joinQueue(req.userId);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function leave(req, res) {
  try {
    await leaveQueue(req.userId);
    res.json({ status: "left" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function status(req, res) {
  try {
    const result = await getQueueStatus(req.userId);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = { join, leave, status };
