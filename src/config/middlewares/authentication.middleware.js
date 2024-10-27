const { verifyToken } = require("../lib/jwtHelper");
const User = require("../../modules/user/user.model");

const authenticateUser = async (req, res, next) => {
  try {
    const token =
      req.headers?.authorization && req.headers?.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Authentication token missing" });
    }

    const verify_user = verifyToken(token, process.env.COOKIE_PARSER_TOKEN);

    const user = await User.findOne({ where: { id: verify_user?.id } });

    if (!user) res.status(404).json({ message: "User not found" });

    req.user = user;

    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
    next(error);
  }
};

module.exports = {
  authenticationMiddleware: authenticateUser,
};
