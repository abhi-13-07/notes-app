const router = require('express').Router();
const { getUser, updateUser } = require('../controller/users');

const authOnly = require('../middlewares/authOnly');

router.get('/:id', authOnly, getUser);

router.put('/update/:id', authOnly, updateUser);

module.exports = router;
