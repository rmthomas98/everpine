const express = require("express");
const router = express.Router();
const createUserController = require("../../controllers/v1/user/create");

// middleware to check referrer
// check referrer to make sure the request is coming from the frontend
// router.use(checkReferrer);

// create user
router.post("/create", createUserController);

// verify user email

// Get all users
// Path: /api/v1/user
// router.get("/", (req, res) => {
//   // call the controller
//   console.log("get all users");
//   res.send("Get all users");
//   res.on("finish", () => {
//     // call controller to send email
//     console.log("res finish");
//   });
//
//   res.on("close", () => {
//     console.log("res close");
//   });
// });

// get user by id
// router.get("/:id", (req, res) => {
//   // call the controller
//   res.send(
//     req.params.id ? `Get user with id ${req.params.id}` : "Get user by id",
//   );
// });

module.exports = router;
