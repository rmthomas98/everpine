const { verifySession } = require("../../lib/session");
const prisma = require("../../db/prisma");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createSetupIntent = async (req, res) => {
  try {
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal server error");
  }
};

const activateTrial = async (req, res) => {
  try {
    const session = await verifySession(req.cookies.session);
    if (!session) return res.status(401).send("Unauthorized");

    const { id } = session;
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return res.status(404).send("User not found");

    const { subscriptionStatus } = user;
    if (subscriptionStatus !== "NEW_USER") {
      return res.status(400).send("Invalid subscription status");
    }

    // create subscription in stripe
    const subscription = await stripe.subscriptions.create({
      customer: user.stripeCustomerId,
      items: [{ price: process.env.STRIPE_PRICE_ID }],
      trial_period_days: 14,
      trial_settings: {
        end_behavior: {
          missing_payment_method: "cancel",
        },
      },
    });

    if (!subscription) {
      return res.status(500).send("Error creating subscription");
    }

    // update user subscription status
    await prisma.user.update({
      where: { id },
      data: {
        subscriptionStatus: "TRIAL",
        stripeSubscriptionId: subscription.id,
        hasPaymentMethod: false,
        trialEndDate: subscription.trial_end,
      },
    });

    res.send("Trial created");
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal server error");
  }
};

const activateSubscription = async (req, res) => {};

module.exports = { createSetupIntent, activateTrial, activateSubscription };
