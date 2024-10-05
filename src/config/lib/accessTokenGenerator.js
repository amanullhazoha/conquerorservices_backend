const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  const access_token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.COOKIE_PARSER_TOKEN,
    {
      expiresIn: process.env.COOKIE_EXPIRE_TIME,
      issuer: user.id.toString(),
    }
  );

  return access_token;
};

module.exports = { generateAccessToken };
