const userService = require("./user.service");

async function getProfile(req, res) {
  try {
    const profile = await userService.getProfile(req.userId);
    res.json(profile);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

module.exports = { getProfile };
