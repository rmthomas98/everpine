const express = require("express");
const router = express.Router();
const createUserController = require("../../controllers/v1/user/create");
const updateUserController = require("../../controllers/v1/user/update");
const infoController = require("../../controllers/v1/user/info");
const deleteController = require("../../controllers/v1/user/delete");
const emailController = require("../../controllers/v1/user/email");
const auth = require("../../middleware/auth");

// middleware to check referrer
// check referrer to make sure the request is coming from the frontend
// router.use(checkReferrer);

// create user
router.post("/create", createUserController.create);

// resend email verification
router.patch("/resend-verification", auth, emailController.resendVerification);

// verify email
router.patch("/verify-email", emailController.verifyEmail);

// update user email
router.patch("/update-email", auth, updateUserController.updateEmail);

// update user name
router.patch("/update-name", auth, updateUserController.updateName);

// update user password
router.patch("/update-password", auth, updateUserController.updatePassword);

// update user auth settings
router.patch("/update-auth", auth, updateUserController.updateAuth);

// update user notification settings
router.patch("/update-notifs", auth, updateUserController.updateNotifs);

// get general info for user settings
router.get("/info", auth, infoController.getInfo);

// delete user account
router.delete("/delete", auth, deleteController.deleteUser);

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
