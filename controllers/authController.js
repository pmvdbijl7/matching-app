const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
	registerValidation,
	loginValidation,
} = require('./validationController');
require('dotenv/config');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Setup Google Auth
passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

passport.use(
	new GoogleStrategy(
		{
			clientID:
				'540353050143-phakl2qnuft1uun0ff9hqki4l254h3d8.apps.googleusercontent.com',
			clientSecret: '__-FlHMDpmAcOGYr0PlLJAFR',
			callbackURL: 'http://localhost:3000/google/callback',
		},
		(accessToken, refreshToken, profile, cb) => {
			cb(null, profile);
		}
	)
);

// Get Register Page
const registerGet = (req, res) => {
	res.render('pages/auth/register', { title: 'Create an Account' });
};

// Register New User
const registerPost = async (req, res) => {
	// Validate Register Data
	const { error } = registerValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// Hash Password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	// Create New User
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashedPassword,
	});

	user.save()
		.then((user) => {
			// Redirect to Home
			res.redirect('/signin');
		})
		.catch((err) => {
			res.send(err.message);
		});
};

// Google Callback
const googleCb = (req, res) => {
	// Create New User
	const user = new User({
		name: req.user._json.given_name,
		email: req.user._json.email,
		password: null,
	});

	user.save()
		.then((user) => {
			// Create accessToken and Assign to Cookie
			const accessToken = jwt.sign(
				{ _id: user._id },
				process.env.JWT_KEY
			);
			res.cookie('accessToken', accessToken);

			// Redirect to Home
			res.redirect('/');
		})
		.catch((err) => {
			res.send(err.message);
		});
};

// Get Login Page
const loginGet = (req, res) => {
	res.render('pages/auth/login', { title: 'Log in' });
};

// Login User
const loginPost = async (req, res) => {
	// Validate Login Data
	const { error } = loginValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// Check if Email Address is Correct
	const user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send('Your email address is wrong.');

	// Check if Password is Correct
	const validPass = await bcrypt.compare(req.body.password, user.password);
	if (!validPass) return res.status(400).send('Your password is wrong.');

	// Create accessToken and Assign to Cookie
	const accessToken = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
	res.cookie('accessToken', accessToken);

	if (!user.gender) {
		res.redirect('/signin/preferences');
	} else {
		res.redirect('/');
	}
};

// Get Preferences Page
const preferencesGet = (req, res) => {
	res.render('pages/auth/preferences', {
		title: 'Preferences',
		genders: ['Male', 'Female', 'Non-binary'],
		interests: ['Men', 'Women', 'Everyone'],
	});
};

// Update Preferences
const preferencesPost = (req, res) => {
	// Get Authenticated User
	const authUser = req.user._id;

	// Update User
	User.findByIdAndUpdate(authUser, {
		gender: req.body.gender,
		birthdate: req.body.birthdate,
		residence: req.body.residence,
		interested_in: req.body.interested_in,
		biography: req.body.biography,
	})
		.then((user) => {
			res.redirect('/');
		})
		.catch((err) => {
			res.send(err.message);
		});
};

// Logout User
const logout = (req, res) => {
	if (req.cookies.accessToken) {
		res.clearCookie('accessToken');
		res.redirect('/signin');
	}
};

module.exports = {
	registerGet,
	registerPost,
	googleCb,
	loginGet,
	loginPost,
	preferencesGet,
	preferencesPost,
	logout,
};
