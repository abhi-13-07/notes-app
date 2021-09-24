const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
	{
		firstName: {
			type: String,
			trim: true,
		},
		lastName: {
			type: String,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		displayPicture: {
			type: String,
			default:
				'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg',
		},
		hashedPassword: {
			type: String,
		},
		googleId: {
			type: String,
		},
		createdAt: {
			type: Date,
			default: Date.now(),
		},
	},
	{ toJson: { virtuals: true }, timestamps: true }
);

userSchema
	.virtual('name')
	.get(function () {
		return `${this.firstName}${this.lastName ? ` ${this.lastName}` : ''}`;
	})
	.set(function (name) {
		const [firstName, lastName] = name.split(' ');
		this.firstName = firstName;
		this.lastName = lastName ?? '';
	});

module.exports = mongoose.model('User', userSchema);
