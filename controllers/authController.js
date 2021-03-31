const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const {
  registerValidation,
  createProfileValidation,
  loginValidation,
} = require('./validationController');
const Movie = require('../models/Movie');
const { resolveInclude } = require('ejs');
require('dotenv/config');

// Get Register Page
const registerGet = (req, res) => {
  res.render('pages/auth/register', {
    title: 'Sign up',
  });
};

// Register New User
const registerPost = async (req, res) => {
  // Maak asynch functie met forEach loop
  // Zet onder functie let data = await functieNaam

  // Validate Register Data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    gender: req.body.gender,
    birthdate: undefined,
    residence: undefined,
    interested_in: undefined,
    biography: undefined,
    genres: undefined,
    movies: undefined,
    posters: undefined,
    series: undefined,
  });

  await user
    .save()
    .then((result) => {
      // Create accessToken and Assign to Cookie
      const accessToken = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
      res.cookie('accessToken', accessToken);

      // Redirect to Home
      res.redirect('/createprofile');
    })
    .catch((err) => {
      res.send(err.message);
    });
};

// Get Create Profile Page
const createProfileGet = (req, res) => {
  res.render('pages/auth/createprofile', {
    title: 'Create Profile',
    interests: ['Men', 'Women', 'Everyone'],
    genders: ['Male', 'Female', 'Non-binary'],
  });
};

// Create Profile Post
const createProfilePost = (req, res) => {
  const authUser = req.user._id;

  User.findByIdAndUpdate(authUser, req.body).then(() => {
    User.findOne({ authUser }).then((result) => {
      res.redirect('/createprofile');

// Maak asynch functie met forEach loop
  // Zet onder functie let data = await functieNaam

  // let movieArray = [];

  // async function getMoviePosters() {
  //   req.body.movies.forEach(async (movie) => {
  //     let posters = await axios({
  //       method: 'GET',
  //       url: `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&t=${movie}`,
  //     })
  //       .then((res) => {
  //         console.log(res.data.Poster);
  //         movieArray.push(res.data.Poster);
  //         console.log(movieArray);
  //       })
  //       .catch((err) => {
  //         console.log('error', err);
  //       });
  //   });
  // }

  // async function fillMovieArray() {
  //   let data = await getMoviePosters();
  // }

  // fillMovieArray();



    });
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
  createProfileGet,
  createProfilePost,
  loginGet,
  loginPost,
  logout,
};
