const express = require("express");
const router = express.Router();

// import all routes here and then import this file in server.js
const userRouter = require("./user");
const authRouter = require("./auth");
router.use("/user", userRouter);
router.use("/auth", authRouter);

module.exports = router;
