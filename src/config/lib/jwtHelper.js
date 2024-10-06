const jwt = require("jsonwebtoken");

// Generate token
const generateToken = (payload, secret, expiresIn) => {
  const options = { expiresIn };
  const token = jwt.sign(payload, secret, options);

  return token;
};

const verifyToken = (token, secret) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return { error: "Invalid token" };
    } else if (err.name === "TokenExpiredError") {
      return { error: "Token expired" };
    } else {
      return { error: "Authentication error" };
    }
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
