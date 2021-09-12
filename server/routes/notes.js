const router = require('express').Router();
const {
	getUserNotes,
	addNewNote,
	updateNote,
	deleteNote,
} = require('../controller/notes');
const authOnly = require('../middlewares/authOnly');

router.get('/all', authOnly, getUserNotes);

router.post('/new', authOnly, addNewNote);

router.put('/edit/:id', authOnly, updateNote);

router.delete('/delete/:id', authOnly, deleteNote);

module.exports = router;
