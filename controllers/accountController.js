const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    registerValidation,
    loginValidation,
} = require('./validationController');
require('dotenv/config');

const profileGet = (req, res) => {
    res.render('pages/account/profile', { title: 'My profile' });
};