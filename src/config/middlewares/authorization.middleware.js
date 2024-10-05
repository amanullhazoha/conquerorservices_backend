const authorizeUser = (...allowedRoles) => {
	return (req, res, next) => {
		if (!req.user || !allowedRoles.includes(req.user.role)) {
			return res
				.status(403)
				.json({ message: "Access denied: Insufficient permissions" });
		}
		next();
	};
};

module.exports = {
	authorizationMiddleware: authorizeUser,
};