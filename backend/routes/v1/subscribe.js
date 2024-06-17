const express = require("express");
const router = express.Router();
const subscribeController = require("../../controllers/v1/subscribe");
const auth = require("../../middleware/auth");

router.get("/get-client-secret", auth, subscribeController.createSetupIntent);

router.post("/activate-subscription", subscribeController.activateSubscription);

module.exports = router;
