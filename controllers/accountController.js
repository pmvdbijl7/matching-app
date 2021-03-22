const User = require('../models/User');

const profileGet = (req, res) => {
    res.render('pages/account/profile', { title: 'My profile', user: req.user });
};

module.exports = {
    profileGet
};