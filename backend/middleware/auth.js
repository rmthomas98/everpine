const prisma = require("../db/db");

// this will run on most of the routes
// to verify the user is authenticated or not

const auth = async (req, res, next) => {
  // get the cookie from the request
  const token = req.cookies.token;

  // if token is not present
  if (!token) return res.status(401).send("Unauthorized");
};

module.exports = auth;
