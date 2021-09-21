const mongoose = require('mongoose');

const noteSchema = mongoose.Schema(
	{
		title: {
			type: String,
			trim: true,
		},
		body: {
			type: String,
			trim: true,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Note', noteSchema);
