const { verifySession } = require("../../lib/token");
const prisma = require("../../db/prisma");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createSetupIntent = async (req, res) => {
  try {
    const { userId } = req;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json("User not found");

    const setupIntent = await stripe.setupIntents.create({
      customer: user.stripeCustomerId,
    });
    if (!setupIntent) {
      return res.status(500).json("Error creating setup intent");
    }

    res.json({ clientSecret: setupIntent.client_secret });
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

module.exports = { createSetupIntent, activateSubscription };
