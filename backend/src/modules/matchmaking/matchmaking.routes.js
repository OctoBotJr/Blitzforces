const express = require("express");
const controller = require("./matchmaking.controller");
const auth = require("../../middleware/auth.middleware");

const router = express.Router();

router.post("/join", auth, controller.join);
router.post("/leave", auth, controller.leave);
router.get("/status", auth, controller.status);

module.exports = router;
