const authService = require("./auth.service");

async function register(req, res) {
  try {
    const { email, password, cfHandle } = req.body;
    if (!email || !password || !cfHandle) {
      return res
        .status(400)
        .json({ message: "email, password and cfHandle are required" });
    }
    const result = await authService.register({ email, password, cfHandle });
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }
    const result = await authService.login({ email, password });
    res.status(200).json(result);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
}

module.exports = { register, login };
