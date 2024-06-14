const express = require("express");
const router = express.Router();
const authController = require("../../controllers/v1/auth");

router.post("/signin", authController.signIn);

router.post("/check-db", authController.checkUser);

router.post("/google-signin", authController.googleSignIn);

module.exports = router;
