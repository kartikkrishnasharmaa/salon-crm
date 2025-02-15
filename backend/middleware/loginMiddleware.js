const jwt = require("jsonwebtoken");

const loginMiddleware = (req, res, next) => {
  let token = req.header("Authorization");


  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length).trim();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = loginMiddleware;
