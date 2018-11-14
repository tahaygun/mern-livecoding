const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const controller = require("./controller");
const cors = require('cors');
const app = express();
var session = require('express-session');

app.use(bodyparser.json());
try {
	mongoose.connect('mongodb://root:root1234@ds155663.mlab.com:55663/livecoding');
} catch (error) {
	console.log(error);
}

app.use(
	cors({
		origin: ['http://localhost:3000'],
		credentials: true //allow setting of cookies
	})
);

app.use(
	session({
		secret: 'supersecretstring12345!',
		saveUninitialized: false,
		resave: false,
		cookie: { maxAge: 6000 * 60 * 60 }
	})
);

app.use('/api', controller);


app.listen(process.env.PORT || 8000, () => {
	console.log('Listening...');
});
