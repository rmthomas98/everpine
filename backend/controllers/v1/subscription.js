const { verifySession } = require("../../lib/token");
const prisma = require("../../db/prisma");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createSetupIntent = async (req, res) => {
  try {
    const setupIntent = await stripe.setupIntents.create({});
    if (!setupIntent) return res.status(500).json("error creating intent");
    res.json({ clientSecret: setupIntent.client_secret });
  } catch (e) {
    console.log(e);
    res.status(500).json("Internal server error");
  }
};

const createSubscription = async (req, res) => {
  try {
    const { userId } = req;
    const { paymentMethod, plan, billing, team, company } = req.body;
  } catch (e) {
    console.log(e);
    res.status(500).json("Internal server error");
  }
};

module.exports = { createSetupIntent, createSubscription };
