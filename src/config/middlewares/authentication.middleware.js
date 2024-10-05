const { verifyToken } = require("../lib/jwtHelper");

const authenticateUser = async (req, res, next) => {
	try {
		// Extract authentication token from headers
		const token =
			req.headers?.authorization && req.headers?.authorization?.split(" ")[1];

		if (!token) {
			return res.status(401).json({ message: "Authentication token missing" });
		}

		// Verify token and attach the user to the request
		req.user = verifyToken(token, process.env.JWT_SECRET);

		next();
	} catch (error) {
		res.status(403).json({ message: "Invalid or expired token" });
		next(error);
	}
};

module.exports = {
	authenticationMiddleware: authenticateUser,
};
