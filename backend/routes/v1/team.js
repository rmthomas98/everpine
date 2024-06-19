const express = require("express");
const router = express.Router();
const teamController = require("../../controllers/v1/team");
const auth = require("../../middleware/auth");

router.get("/", auth, teamController.getTeams);
router.get("/roles", auth, teamController.getRoles);
router.put("/default", auth, teamController.updateDefault);

module.exports = router;
