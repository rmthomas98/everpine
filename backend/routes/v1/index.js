const express = require("express");
const router = express.Router();

// import all routes here and then import this file in server.js
const userRouter = require("./user");
const authRouter = require("./auth");
const accountSetupRouter = require("./account-setup");
const subscribeRouter = require("./subscribe");
router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/account-setup", accountSetupRouter);
router.use("/subscribe", subscribeRouter);

module.exports = router;
