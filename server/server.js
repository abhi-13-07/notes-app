if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

(async () => {
	try {
		const { connection } = await mongoose.connect(process.env.DATABASE_URI);
		console.log(`Connected to Database(${connection.name})`);
	} catch (err) {
		console.log('error while connecting to db', err.message);
	}
})();

app.listen(process.env.PORT, () =>
	console.log(`Server started on port ${process.env.PORT}`)
);
