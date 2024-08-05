const express = require("express");
const router = express.Router();
const teamController = require("../../controllers/v1/team");
const memberController = require("../../controllers/v1/team/members");
const auth = require("../../middleware/auth");

// main (for teams)
router.get("/roles", auth, teamController.getRoles);
router.put("/default", auth, teamController.updateDefault);
router.delete("/leave", auth, teamController.leaveTeam);

// within teams (members, domains, subscription, limits, sso)

// member and invites
router.post("/members", auth, memberController.getMembers);

router.post("/members/invite", auth, memberController.createInvite);
router.post("/members/invite/resend", auth, memberController.resendInvite);
router.post("/members/invite/revoke", auth, memberController.revokeInvite);
router.post("/members/invite/bulk-revoke", auth, memberController.bulkRevoke);
router.post("/members/invite/get", auth, memberController.getInvite);
router.post("/members/invite/accept", auth, memberController.acceptInvite);
router.post("/members/invite/decline", auth, memberController.declineInvite);

router.patch("/members/update-role", auth, memberController.updateRole);
router.post("/members/remove", auth, memberController.removeMembers);

module.exports = router;
