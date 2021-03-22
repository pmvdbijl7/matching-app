const User = require('../models/User');
const {
    registerValidation, editValidation,
} = require('./validationController');

// Get account profile page
const profileGet = (req, res) => {
    const authUser = req.user._id;

    User.findById(authUser).then((user) => {
        res.render('pages/account/profile', { title: 'My profile', user: user.toJSON(), headerLeft: { path: '/', text: 'Back' }, headerRight: { path: '/account/edit', text: 'Edit' } });
    });
};

// Get account edit page
const editGet = (req, res) => {
    const authUser = req.user._id;

    User.findById(authUser).then((user) => {
        res.render('pages/account/edit', { title: 'My profile', user: user.toJSON(), headerLeft: { path: '/account/profile', text: 'Back' }, headerRight: { path: '/account/advanced', text: 'Advanced' }, interests: ['Men', 'Women', 'Everyone'], genders: ['Male', 'Female', 'Non-binary'] });
    });
};

// Update account profile data
const editPost = (req, res) => {
    const authUser = req.user._id;

    const { error } = editValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    User.findByIdAndUpdate(authUser, req.body).then(() => {
        User.findOne({authUser}).then((result) => {
            res.redirect('/account/profile');
        })
    })
    if (req.body._id) {
        updateData(req, res);
    } else {
        console.log('Error: No or invalid profile id given. Profile id: ' + req.body._id)
    }
}


module.exports = {
    profileGet,
    editGet,
    editPost
};