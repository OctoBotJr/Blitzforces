const express = require("express");
const controller = require("./user.controller");
const auth = require("../../middleware/auth.middleware");

const router = express.Router();

router.get("/profile", auth, controller.getProfile);

module.exports = router;
