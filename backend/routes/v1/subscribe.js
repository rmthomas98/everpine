const express = require("express");
const router = express.Router();
const subscribeController = require("../../controllers/v1/subscribe");

const { createTrial, activateSubscription } = subscribeController;

router.post("/creat-trial", createTrial);

router.post("/activate-subscription", activateSubscription);

module.exports = router;
