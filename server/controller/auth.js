const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const { sign, verify } = require('jsonwebtoken');

const MILLI_SECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;
const ACCESS_TOKEN_EXPIRY_TIME = process.env.ACCESS_TOKEN_EXPIRY_TIME;
const REFRESH_TOKEN_EXPIRY_TIME = process.env.REFRESH_TOKEN_EXPIRY_TIME;

const loginUser = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.array(),
		});
	}
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({
				message: `${email} is not registered`,
			});
		}
		const isMatch = await bcrypt.compare(password, user.hashedPassword);
		if (!isMatch) {
			return res.status(401).json({
				message: 'Incorrect Password',
			});
		}
		const {
			id,
			firstName,
			lastName,
			name,
			displayPicture,
			createdAt,
			updatedAt,
		} = user;

		const accessToken = await signToken(
			{ id },
			process.env.ACCESS_TOKEN_SECRET,
			{
				expiresIn: ACCESS_TOKEN_EXPIRY_TIME,
			}
		);

		const refreshToken = await signToken(
			{ id },
			process.env.REFRESH_TOKEN_SECRET,
			{
				expiresIn: REFRESH_TOKEN_EXPIRY_TIME,
			}
		);

		setRefreshToken(res, refreshToken);

		res.status(200).json({
			message: 'Successfully logged in',
			user: {
				id,
				firstName,
				lastName,
				name,
				displayPicture,
				createdAt,
				updatedAt,
			},
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
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.array(),
		});
	}

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
	const refreshToken = req.cookies[process.env.REFRESH_TOKEN_COOKIE_NAME];

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

		const {
			id,
			firstName,
			lastName,
			name,
			displayPicture,
			createdAt,
			updatedAt,
		} = user;

		const accessToken = await signToken(
			{ id: user.id },
			process.env.ACCESS_TOKEN_SECRET,
			{
				expiresIn: ACCESS_TOKEN_EXPIRY_TIME,
			}
		);

		const newRefreshToken = await signToken(
			{ id: user.id },
			process.env.REFRESH_TOKEN_SECRET,
			{
				expiresIn: REFRESH_TOKEN_EXPIRY_TIME,
			}
		);

		setRefreshToken(res, newRefreshToken);

		res.status(200).json({
			message: 'Successfully refreshed access token',
			user: {
				id,
				firstName,
				lastName,
				name,
				displayPicture,
				createdAt,
				updatedAt,
			},
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
	res.clearCookie(process.env.REFRESH_TOKEN_COOKIE_NAME);
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

function setRefreshToken(res, payload) {
	res.cookie(process.env.REFRESH_TOKEN_COOKIE_NAME, payload, {
		httpOnly: true,
		maxAge: MILLI_SECONDS_IN_A_DAY * 7,
		sameSite: 'None',
		secure: true,
	});
}
