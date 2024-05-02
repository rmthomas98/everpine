const express = require("express");
const router = express.Router();

// import all routes here and then import this file in server.js
const userRouter = require("./user");
router.use("/user", userRouter);

module.exports = router;
