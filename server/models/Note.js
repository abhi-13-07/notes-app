const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
	noteId: {
		type: String,
		required: true,
	},
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
});

module.exports = mongoose.model('Note', noteSchema);
