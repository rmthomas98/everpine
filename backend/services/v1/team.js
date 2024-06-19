const prisma = require("../../db/prisma");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createTeam = async (name, company, avatar, user) => {
  try {
    // create customer in stripe for the team
    const customer = await stripe.customers.create({
      email: user.email,
      name: company
        ? company.trim()
        : name
        ? name.trim()
        : user.email.split("@")[0],
    });

    // generate random avatar for the team
    const random = Math.floor(Math.random() * 5) + 1;
    const teamAvatar = `/images/avatars/${random}.webp`;

    // create team in the database
    const team = await prisma.team.create({
      data: {
        name: name || user.email.split("@")[0],
        company: company ? company.trim() : null,
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
      where: { id: user.id },
      data: { defaultTeamId: team.id },
    });

    // return new team
    return team;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const verifyOwnership = async (teamId, userId) => {
  try {
    const role = await prisma.role.findFirst({ where: { teamId, userId } });
    if (!role) return null;
    if (role.role !== "OWNER" && role.role !== "SUPER_ADMIN") return false;
    return true;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const updateCompanyName = async (teamId, company) => {
  try {
    const updatedTeam = await prisma.team.update({
      where: { id: teamId },
      data: { company: company.trim() },
    });
    if (!updatedTeam) return null;
    await stripe.customers.update(updatedTeam.stripeCustomerId, {
      name: company.trim(),
    });
    return updatedTeam;
  } catch (e) {
    console.log(e);
    return null;
  }
};

module.exports = { createTeam, verifyOwnership, updateCompanyName };
