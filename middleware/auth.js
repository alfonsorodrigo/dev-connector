const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  // Get token fromm header
  const token = req.header("x-auth-token");

  //Check if not token

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token

  try {
    const decored = jwt.verify(token, config.get("jwtSecret"));
    req.user = decored.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
