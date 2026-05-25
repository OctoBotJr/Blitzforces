const { getDuelStatus, forfeitDuel } = require("./duel.service");

async function status(req, res) {
  try {
    const duelId = parseInt(req.params.id, 10);
    const result = await getDuelStatus(duelId, req.userId);
    res.json(result);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}
async function forfeit(req, res) {
  try {
    const duelId = parseInt(req.params.id, 10);

    await forfeitDuel(duelId, req.userId);

    res.json({
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
}
module.exports = { status, forfeit };
