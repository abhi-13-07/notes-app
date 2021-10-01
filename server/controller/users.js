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

const updateUser = async (req, res) => {
	const { id } = req.params;
	let update = {};

	if (id !== req.user.id) {
		return res.status(403).json({
			message: 'you are not authorized to perform this action',
		});
	}

	if (req.body?.name) {
		const [firstName, lastName] = req.body.name.split(' ');
		update = { ...update, firstName, lastName };
	}

	if (req.body?.email) {
		return res.status(400).json({
			message: 'You cannot change your email',
		});
	}

	console.log(req.body);
	try {
		const user = await User.findByIdAndUpdate(id, update, {
			new: true,
		}).select('-hashedPassword');

		res.status(200).json({
			message: 'Successfully Updated!',
			user: { ...user, id: user.id },
		});
	} catch (err) {
		console.log('Update user: ', err.message);
		res.status(500).json({
			message: err.message,
		});
	}
};

module.exports = {
	getUser,
	updateUser,
};
