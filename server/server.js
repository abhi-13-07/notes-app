if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// custom middlewares
const validateJwt = require('./middlewares/validateJwt');

// routers
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const notesRouter = require('./routes/notes');

app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	})
);
app.use(express.json());
app.use(cookieParser());
app.use(validateJwt());

(async () => {
	try {
		const { connection } = await mongoose.connect(process.env.DATABASE_URI);
		console.log(`Connected to Database(${connection.name})`);
	} catch (err) {
		console.log('error while connecting to db', err.message);
	}
})();

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/notes', notesRouter);

app.listen(process.env.PORT, () =>
	console.log(`Server started on port ${process.env.PORT}`)
);
