const router = require('express').Router();
const { getUser } = require('../controller/users');

const authOnly = require('../middlewares/authOnly');

router.get('/:id', authOnly, getUser);

module.exports = router;
