const prisma = require("../../db/prisma");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const plans = require("../../data/plans");
const { createTeam } = require("../../services/v1/subscription/team");

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

const billingOptions = ["month", "annual"];

const createSubscription = async (req, res) => {
  try {
    const { userId } = req;
    const { paymentMethod, plan, billing, team, company } = req.body;

    // get user from database
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) return res.status(400).json("Unauthorized");

    if (!paymentMethod || !plan || !billing || !team) {
      return res.status(400).json("Invalid request");
    }

    // check if plan is valid
    const selectedPlan = plans[plan?.toLowerCase()];
    if (!selectedPlan) return res.status(400).json("Invalid plan");

    // check if billing cycle is valid
    const billingCycle = billing?.toLowerCase();
    if (!billingOptions.includes(billingCycle)) {
      return res.status(400).json("Invalid billing option");
    }

    // check if team is valid and verify the ownership
    if (!team) return res.status(400).json("Invalid team");
    // get details of the team
    const { id: teamId, create, name, avatar } = team;
    if (!teamId || !name) return res.status(400).json("Invalid team");

    // verify team ownership
    if (!create) {
      const role = await prisma.role.findFirst({
        where: { teamId, userId },
      });
      if (!role) return res.status(400).json("Invalid team");
      if (role.role !== "OWNER" && role.role !== "SUPER_ADMIN") {
        return res.status(400).json("Invalid team");
      }
    }

    // create new team if create is true
    let newTeam;
    if (create) newTeam = await createTeam(name, company, avatar, user);

    // if company name is provided and team exists, update the name
    let updatedTeam = await prisma.team.findUnique({ where: { id: teamId } });
    if (company && !create) {
      updatedTeam = await prisma.team.update({
        where: { id: teamId },
        data: { company: company.trim() },
      });
      if (!updatedTeam) return res.status(400).json("team not found");
      // update the customer (team) name in stripe
      await stripe.customers.update(updatedTeam.stripeCustomerId, {
        name: company.trim(),
      });
    }

    // check if updated team already has a subscription
    if (updatedTeam) {
      if (updatedTeam?.subscriptionId && updatedTeam?.plan !== "FREE") {
        return res.status(400).json("Team already has a subscription");
      }
    }

    // attach payment method to the customer
    await stripe.paymentMethods.attach(paymentMethod, {
      customer: customer?.id || updatedTeam.stripeCustomerId,
    });

    // create subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer?.id || updatedTeam.stripeCustomerId,
      items: [{ price: selectedPlan.price[billingCycle] }],
      default_payment_method: paymentMethod,
      collection_method: "charge_automatically",
    });

    if (!subscription) {
      return res.status(500).json("error creating subscription");
    }

    // create subscription in database
    const subsriptionDb = await prisma.subscription.create({
      data: {
        createdById: userId,
        stripeSubscriptionId: subscription.id,
        team: { connect: { id: newTeam?.id || teamId } },
      },
    });

    // update the team with the subscription
    await prisma.team.update({
      where: { id: newTeam?.id || teamId },
      data: {
        subscription: { connect: { id: subsriptionDb.id } },
        plan: plan.toUpperCase(),
      },
    });

    // update user with the default team
    await prisma.user.update({
      where: { id: userId },
      data: { defaultTeamId: newTeam?.id || teamId },
    });

    console.log("everyting is fine so far");

    res.json();
  } catch (e) {
    console.log(e);
    res.status(500).json("Internal server error");
  }
};

module.exports = { createSetupIntent, createSubscription };
