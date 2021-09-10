const User = require('../models/User');
const bcrypt = require('bcrypt');
const { sign, verify } = require('jsonwebtoken');

const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({
				message: `${email} is not registred`,
			});
		}
		const isMatch = await bcrypt.compare(password, user.hashedPassword);
		if (!isMatch) {
			return res.status(401).json({
				message: 'Password doesnot match',
			});
		}
		const { id } = user;

		const accessToken = await signToken(
			{ id },
			process.env.ACCESS_TOKEN_SECRET,
			{
				expiresIn: '15m',
			}
		);

		const refreshToken = await signToken(
			{ id },
			process.env.REFRESH_TOKEN_SECRET,
			{
				expiresIn: '7d',
			}
		);

		res.cookie('RF_TKN', refreshToken, {
			httpOnly: true,
		});

		res.status(200).json({
			message: 'Successfully logged in',
			accessToken,
		});
	} catch (err) {
		console.error('Login: ', err);
		res.status(500).json({
			message: err.message,
		});
	}
};

const registerUser = async (req, res) => {
	const { name, email, password } = req.body;
	try {
		const hashedPassword = await hashPassword(password);
		const user = new User({
			name,
			email,
			hashedPassword,
		});

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({
				message: 'email is already in use',
			});
		}

		const newUser = await user.save();
		res.status(201).json({
			message: `Successfully registered, login with ${newUser.email}`,
		});
	} catch (err) {
		console.error('register: ', err);
		res.status(500).json({
			message: err.message,
		});
	}
};

const refreshAccessToken = async (req, res) => {
	const refreshToken = req.cookies['RF_TKN'];

	if (!refreshToken) {
		return res.status(400).json({
			message: 'refresh token is required',
		});
	}

	try {
		const decodedToken = await verify(
			refreshToken,
			process.env.REFRESH_TOKEN_SECRET
		);

		if (!decodedToken) {
			return res.status(401).json({
				message: 'Invalid refresh token',
			});
		}

		const user = await User.findById(decodedToken.id);

		if (!user) {
			return res.status(401).json({
				message: `Cannot find user with id ${decodedToken.id}`,
			});
		}

		const accessToken = await signToken(
			{ id: user.id },
			process.env.ACCESS_TOKEN_SECRET,
			{
				expiresIn: '15m',
			}
		);

		const newRefreshToken = await signToken(
			{ id: user.id },
			process.env.REFRESH_TOKEN_SECRET,
			{
				expiresIn: '7d',
			}
		);

		res.cookie('RF_TKN', newRefreshToken, {
			httpOnly: true,
		});

		res.status(200).json({
			message: 'Successfully refreshed access token',
			accessToken,
		});
	} catch (err) {
		console.error('RefreshAccessToken: ', err);
		res.status(500).json({
			message: err.message,
		});
	}
};

const logoutUser = (req, res) => {
	res.clearCookie('RF_TKN');
	res.status(200).json({
		message: 'Successfully Logged out',
	});
};

module.exports = {
	loginUser,
	registerUser,
	refreshAccessToken,
	logoutUser,
};

async function hashPassword(plainTextPassword) {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(plainTextPassword, salt);
}
async function signToken(payload, secrect, options) {
	return await sign(payload, secrect, options);
}
