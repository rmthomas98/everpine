const express = require("express");
const router = express.Router();
const authController = require("../../controllers/v1/auth");

router.get("/me/:id", authController.me);

module.exports = router;
