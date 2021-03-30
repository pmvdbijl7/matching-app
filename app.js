const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv/config');
const passport = require('passport');

// Get .env Variables
const hostURL = process.env.URL;
const hostPort = process.env.PORT || 3000;
const dbConnection = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@buster.boqc9.mongodb.net/teamfeature?retryWrites=true&w=majority`;

// Import Routes
const accountRoutes = require('./routes/accountRoutes');
const authRoutes = require('./routes/authRoutes');
const matchesRoutes = require('./routes/matchesRoutes');
const homeRoutes = require('./routes/homeRoutes');
const userRoutes = require('./routes/userRoutes');
const filterRoutes = require('./routes/filterRoutes');

// Set Templating Engine
app.set('view engine', 'ejs');

// Set Public Directory as a Static Directory
app.use(express.static('public'));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// Connect to Database
mongoose.connect(
	dbConnection,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: true,
	},
	() => {
		console.log('Succesfully Connected to Database');
	}
);

// Route Middlewares
app.use(accountRoutes);
app.use(authRoutes);
app.use(matchesRoutes);
app.use(homeRoutes);
app.use(userRoutes);
app.use(filterRoutes);

// Show 404 Page if Page Doesn't Exists
app.use((req, res, next) => {
	res.status(404).send('This page does not exist!');
});

// Start Server at Given Host and Port
app.listen(hostPort, () => {
	console.log(`App Listening at ${hostURL}:${hostPort}`);
});
