const express = require("express");
const router = express.Router();
const subscribeController = require("../../controllers/v1/subscribe");

router.post("/creat-trial", subscribeController.activateTrial);

router.post("/activate-subscription", subscribeController.activateSubscription);

module.exports = router;
