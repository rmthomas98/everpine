const express = require("express");
const router = express.Router();
const subController = require("../../controllers/v1/subscription");
const auth = require("../../middleware/auth");

router.get("/get-client-secret", auth, subController.createSetupIntent);
router.post("/create-subscription", auth, subController.createSubscription);

module.exports = router;
