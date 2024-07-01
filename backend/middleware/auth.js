const verifyToken = require("../lib/token");

// this middleware verifies the user's access token
const auth = async (req, res, next) => {
  // get bearer token from the header
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  // decrypt and verify the token
  const userId = await verifyToken(token);
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  // send the user id to the next middleware
  req.userId = userId;
  next();
};

module.exports = auth;
