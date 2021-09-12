const Note = require('../models/Note');

const getUserNotes = async (req, res) => {
	const { userId } = req.query;

	try {
		const userNotes = await Note.find({ userId });

		res.status(200).json({
			notes: userNotes,
		});
	} catch (err) {
		console.error('get user notes', err);
		res.status(500).json({
			message: err.message,
		});
	}
};

const addNewNote = async (req, res) => {
	const { title, body } = req.body;
	const { id: userId } = req.user;

	const note = new Note({
		title,
		body,
		userId,
	});

	try {
		await note.save();

		res.status(201).json({
			message: 'Successfully created new note',
		});
	} catch (err) {
		console.error('add new note', err);
		res.status(500).json({
			message: err.message,
		});
	}
};

const updateNote = async (req, res) => {
	const { id: noteId } = req.params;
	const { id: userId } = req.user;

	try {
		const note = await Note.findById(noteId);

		if (note.userId.toString() !== userId) {
			return res.status(403).json({
				message: 'you cannot perform this action',
			});
		}

		await Note.findByIdAndUpdate(noteId, req.body);
		res.status(200).json({
			message: 'Successfully updated note',
		});
	} catch (err) {
		console.error('Update note', err);
		res.status(500).json({
			message: err.message,
		});
	}
};

const deleteNote = async (req, res) => {
	const { id: noteId } = req.params;
	const { id: userId } = req.user;

	try {
		const note = await Note.findById(noteId);

		if (note.userId.toString() !== userId) {
			return res.status(403).json({
				message: 'you cannot perform this action',
			});
		}

		await Note.findByIdAndDelete(noteId);
		res.status(200).json({
			message: `Successfully deleted ${note.title}`,
		});
	} catch (err) {
		console.error('Update note', err);
		res.status(500).json({
			message: err.message,
		});
	}
};

module.exports = {
	getUserNotes,
	addNewNote,
	updateNote,
	deleteNote,
};