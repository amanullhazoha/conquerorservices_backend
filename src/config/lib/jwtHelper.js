const jwt = require('jsonwebtoken');

// Generate token
const generateToken = (payload, secret, expiresIn) => {
  const options = { expiresIn };
  const token = jwt.sign(payload, secret, options);

  return token;
};

// Verify token
const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

module.exports = {
  generateToken,
  verifyToken,
};
