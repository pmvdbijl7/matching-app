const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
	registerValidation,
	loginValidation,
} = require('./validationController');
require('dotenv/config');

// Get Register Page
const registerGet = (req, res) => {
	res.render('pages/auth/register', { title: 'Sign up', interests: ['Men', 'Women', 'Everyone'], genders: ['Male', 'Female', 'Non-binary'] });
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
		gender: req.body.gender,
		birthdate: req.body.birthdate,
		residence: req.body.residence,
		interested_in: req.body.interested_in,
		biography: req.body.biography,
		//genres: req.body.genres,
		//movies: req.body.movies,
		//series: req.body.series
	});

	user.save()
		.then((result) => {
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
	res.redirect('/');
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
	loginGet,
	loginPost,
	logout,
};
