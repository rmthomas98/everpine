const { verifySession } = require("../../lib/session");
const prisma = require("../../db/prisma");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createTrial = async (req, res) => {
  try {
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal server error");
  }
};

const activateSubscription = async (req, res) => {};

module.exports = { createTrial, activateSubscription };
