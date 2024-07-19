const express = require("express");
const router = express.Router();
const authController = require("../../controllers/v1/auth");
const auth = require("../../middleware/auth");

router.post("/check-two-factor", authController.checkTwoFactor);

router.post("/verify-two-factor", authController.verifyTwoFactor);

router.post("/resend-two-factor", authController.resendTwoFactor);

router.post("/signin", authController.signIn);

router.post("/check-db", authController.checkUser);

router.post("/google-signin", authController.googleSignIn);

router.get("/me", auth, authController.me);

module.exports = router;
