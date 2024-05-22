const { verifySession } = require("../../lib/session");
const prisma = require("../../db/prisma");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createSetupIntent = async (req, res) => {
  try {
    const session = await verifySession(req.cookies.session);
    if (!session) return res.status(401).send("Unauthorized");

    const { id } = session;
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return res.status(404).send("User not found");

    const setupIntent = await stripe.setupIntents.create({
      customer: user.stripeCustomerId,
    });
    if (!setupIntent) {
      return res.status(500).send("Error creating setup intent");
    }

    res.json({ clientSecret: setupIntent.client_secret });
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

const activateSubscription = async (req, res) => {
  try {
    const session = await verifySession(req.cookies.session);
    if (!session) return res.status(401).send("Unauthorized");

    const { id } = session;
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return res.status(404).send("User not found");

    // check if user already has an active subscription
    if (
      user.subscriptionStatus === "ACTIVE" ||
      user.subscriptionStatus === "TRIAL"
    ) {
      return res.status(400).send("User already has an active subscription");
    }

    const { paymentMethod } = req.body;

    // create subscription in stripe
    const subscription = await stripe.subscriptions.create({
      customer: user.stripeCustomerId,
      items: [{ price: process.env.STRIPE_PRICE_ID }],
      default_payment_method: paymentMethod,
      collection_method: "charge_automatically",
      cancel_at_period_end: false,
    });

    if (!subscription) {
      return res.status(500).send("Error creating subscription");
    }

    // update user in db
    await prisma.user.update({
      where: { id },
      data: {
        subscriptionStatus: "ACTIVE",
        stripeSubscriptionId: subscription.id,
        hasPaymentMethod: true,
        trialEndDate: null,
        cancelAtPeriodEnd: false,
        stripePaymentMethodId: paymentMethod,
      },
    });

    res.send("Subscription created");
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal server error");
  }
};

module.exports = { createSetupIntent, activateTrial, activateSubscription };
