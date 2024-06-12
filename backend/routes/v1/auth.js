const express = require("express");
const router = express.Router();
const authController = require("../../controllers/v1/auth");

router.post("/signin", authController.signIn);

module.exports = router;
