const express = require("express");
const router = express.Router();

// import all routes here and then import this file in server.js
const userRouter = require("./user");
const authRouter = require("./auth");
const accountSetupRouter = require("./account-setup");
router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/account-setup", accountSetupRouter);

module.exports = router;
