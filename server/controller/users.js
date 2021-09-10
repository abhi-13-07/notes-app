const User = require('../models/User');

const getUser = async (req, res) => {
	const { id } = req.params;

	try {
		const user = await User.findById(id).select('-hashedPassword');
		if (!user) {
			return res.status(404).json({
				message: `Cannot find use with id ${id}`,
			});
		}
		res.status(200).json({
			user,
		});
	} catch (err) {
		console.error('get user: ', err);
		res.status(500).json({
			message: err.message,
		});
	}
};

module.exports = {
	getUser,
};
