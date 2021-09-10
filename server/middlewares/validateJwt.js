const { verify } = require('jsonwebtoken');
const User = require('../models/User');

const validateJwt = () => async (req, res, next) => {
	try {
		const authHeader = req.headers['Authorization'];
		const accessToken = authHeader && authHeader.split(' ')[1];

		if (!accessToken) {
			req.isAuthenticated = false;
			req.user = null;
		}

		const isValidToken = await verify(
			accessToken,
			process.env.ACCESS_TOKEN_SECRET
		);

		if (!isValidToken) {
			return res.status(401).json({
				message: 'invalid jwt',
			});
		}

		const { id } = isValidToken;

		const user = await User.findById(id);
		if (!user) {
			return res.status(401).json({
				message: 'invalid JWT',
			});
		}

		req.isAuthenticated = true;
		req.user = user;

		return next();
	} catch (err) {
		console.error('validate jwt middleware: ', err);
		res.status(500).json({
			message: err.message,
		});
	}
};

module.exports = validateJwt;
