module.exports = (req, res, next) => {
	if (!req.isAuthenticated) {
		return res.status(401).json({
			message: 'you are not authorized',
		});
	}
	return next();
};
