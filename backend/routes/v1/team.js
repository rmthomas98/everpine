const express = require("express");
const router = express.Router();
const teamController = require("../../controllers/v1/team");
const memberController = require("../../controllers/v1/team/members");
const auth = require("../../middleware/auth");

// main (for teams)
router.get("/", auth, teamController.getTeams);
router.get("/roles", auth, teamController.getRoles);
router.put("/default", auth, teamController.updateDefault);
router.delete("/leave", auth, teamController.leaveTeam);

// within teams (members, domains, subscription, limits, sso)
router.post("/members", auth, memberController.getMembers);

module.exports = router;
