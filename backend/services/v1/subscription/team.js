const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const prisma = require("../../../db/prisma");

const createTeam = async (name, company, avatar, user) => {
  try {
    const email = user.email;
    // create customer in stripe for the team
    const customer = await stripe.customers.create({
      email,
      name: company ? company.trim() : name ? name.trim() : email.split("@")[0],
    });

    // generate random avatar for the team
    const random = Math.floor(Math.random() * 5) + 1;
    const teamAvatar = `/images/avatars/${random}.webp`;

    // create team in the database
    const team = await prisma.team.create({
      data: {
        name: name || email.split("@")[0],
        company: company.trim() || null,
        avatar: avatar || teamAvatar,
        stripeCustomerId: customer?.id,
        users: { connect: { id: user.id } },
      },
    });

    // create a role for the user
    const role = await prisma.role.create({
      data: { userId: user.id, teamId: team.id },
    });

    // set default team for user
    await prisma.user.update({
      where: { id: user.id, defaultTeamId: team.id },
    });

    // return new team
    return team;
  } catch (e) {
    console.log(e);
    return null;
  }
};

module.exports = { createTeam };
