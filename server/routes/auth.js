const router = require('express').Router();
const {
	loginUser,
	registerUser,
	refreshAccessToken,
	logoutUser,
} = require('../controller/auth');
const {
	loginValidator,
	registerValidator,
} = require('../middlewares/formValidation');

router.post('/login', loginValidator, loginUser);

router.post('/register', registerValidator, registerUser);

router.get('/refresh', refreshAccessToken);

router.get('/logout', logoutUser);

module.exports = router;
