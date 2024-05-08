const express = require("express");
const router = express.Router();
const setupController = require("../../controllers/v1/account-setup");

// resend email verification token
router.get("/resend-email", setupController.resendVerificationEmail);

// get user by email token
// only time this route is accessed is when the user clicks on the email link
router.get("/:emailToken", setupController.getUserByEmailToken);

// verify email
router.post("/verify-email/:emailToken", setupController.verifyEmail);

module.exports = router;
