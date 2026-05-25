const express = require("express");
const controller = require("./duel.controller");
const auth = require("../../middleware/auth.middleware");

const router = express.Router();

router.get("/:id/status", auth, controller.status);
router.post("/:id/forfeit", auth, controller.forfeit);

module.exports = router;
