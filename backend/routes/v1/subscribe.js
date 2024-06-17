const express = require("express");
const router = express.Router();
const subscribeController = require("../../controllers/v1/subscribe");

router.post("/create-setup-intent", subscribeController.createSetupIntent);

router.post("/activate-subscription", subscribeController.activateSubscription);

module.exports = router;
