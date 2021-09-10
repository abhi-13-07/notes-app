const router = require('express').Router();
const {
	loginUser,
	registerUser,
	refreshAccessToken,
	logoutUser,
} = require('../controller/auth');

router.post('/login', loginUser);

router.post('/register', registerUser);

router.get('/refresh', refreshAccessToken);

router.get('/logout', logoutUser);

module.exports = router;
