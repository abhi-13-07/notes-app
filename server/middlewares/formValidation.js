const { body } = require('express-validator');
const User = require('../models/User');

const COMMON_PASSWORDS = [
	'1234567890',
	'0987654321',
	'qwerty',
	'password',
	'drowssap',
	'password123',
	'123456',
	'!@#$%^&*()',
	')(*&^%$#@!',
];

const loginValidator = body('email')
	.exists({
		checkFalsy: true,
		checkNull: true,
	})
	.withMessage('Please Enter Email')
	.bail()
	.isEmail()
	.withMessage('Please enter a valid email')
	.bail()
	.normalizeEmail();

const registerValidator = [
	body('name')
		.exists({ checkFalsy: true, checkNull: true })
		.withMessage('Please Enter your name')
		.bail(),
	body('email')
		.exists({ checkFalsy: true, checkNull: true })
		.withMessage('Please enter Email')
		.bail()
		.isEmail()
		.withMessage('Please enter a valid email')
		.custom(async email => {
			const user = await User.findOne({ email });
			if (user) {
				return Promise.reject('Email is already in use');
			}
			return Promise.resolve();
		})
		.normalizeEmail(),
	body('password')
		.exists({ checkFalsy: true, checkNull: true })
		.withMessage('Please enter password')
		.bail()
		.isLength({ min: 6 })
		.withMessage('Password must be atleast 6 characters long')
		.bail()
		.custom((password, { req }) => {
			if (password === req.body.email) {
				return Promise.reject('You cannot have your email as your password ');
			}
			if (COMMON_PASSWORDS.includes(password)) {
				return Promise.reject('Your password is too common');
			}
			if (password !== req.body.confirmPassword) {
				return Promise.reject('Password does not match');
			}
			return Promise.resolve();
		}),
];

module.exports = {
	loginValidator,
	registerValidator,
};
