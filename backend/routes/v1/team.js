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

// member and invites
router.post("/members", auth, memberController.getMembers);

router.post("/members/invite", auth, memberController.createInvite);
router.patch("/members/invite/resend", auth, memberController.resendInvite);
router.delete("/members/invite/revoke", auth, memberController.revokeInvite);
router.post("/members/invite/accept", auth, memberController.acceptInvite);

router.patch("/members/update-role", auth, () => {});
router.delete("/members/delete", auth, () => {});

module.exports = router;
