const express = require("express");
const router = express.Router();

// import all routes here and then import this file in server.js
const userRouter = require("./user");
const authRouter = require("./auth");
const subscriptionRouter = require("./subscription");
const teamRouter = require("./team");
router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/subscription", subscriptionRouter);
router.use("/team", teamRouter);

module.exports = router;
