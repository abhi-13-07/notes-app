const User = require('../models/User');

const findOrCreateUser = async (condition, create) => {
	try {
		const user = await User.findOne({ ...condition });
		if (user) {
			return user;
		}

		const newUser = await User.create(create);
		return newUser;
	} catch (err) {
		throw new Error(err);
	}
};

module.exports = findOrCreateUser;
