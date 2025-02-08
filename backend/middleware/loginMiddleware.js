const jwt = require("jsonwebtoken");

const loginMiddleware = (req, res, next) => {
  let token = req.header("Authorization");

  console.log("Received Token:", token); // Debugging line

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length).trim();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token Data:", decoded); // Debugging line
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token Verification Error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = loginMiddleware;
