const User = require('../models/User');
const bcrypt = require('bcrypt');
const {
    registerValidation, editValidation, deleteValidation, /*passwordValidation*/
} = require('./validationController');

// Get account profile page
const profileGet = (req, res) => {
    const authUser = req.user._id;

    User.findById(authUser).then((user) => {
        res.render('pages/account/profile', { title: 'Your profile', user: user.toJSON(), headerLeft: { path: '/', text: 'Back' }, headerRight: { path: '/account/edit', text: 'Edit' } });
    });
};

// Get account edit page
const editGet = (req, res) => {
    const authUser = req.user._id;

    User.findById(authUser).then((user) => {
        res.render('pages/account/edit', { title: 'Edit your profile', user: user.toJSON(), headerLeft: { path: '/account/profile', text: 'Back' }, headerRight: { path: '/account/delete', text: 'Delete' }, interests: ['Men', 'Women', 'Everyone'], genders: ['Male', 'Female', 'Non-binary'] });
    });
};

// Update account profile data
const editPost = (req, res) => {
    const authUser = req.user._id;

    // Check if Password is Correct
    const { error } = editValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    User.findByIdAndUpdate(authUser, req.body).then(() => {
        User.findOne({ authUser }).then((result) => {
            res.redirect('/account/profile');
        });
    });
};

// Get delete account page
const deleteGet = (req, res) => {
    const authUser = req.user._id;

    User.findById(authUser).then((user) => {
        res.render('pages/account/delete', { title: 'Advanced account settings', user: user.toJSON(), headerLeft: { path: '/account/profile', text: 'Back' } });
    });
};

// Delete account data
const deletePost = async (req, res) => {
    const authUser = req.user._id;
    const { error } = deleteValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if Password is Correct
    const user = await User.findById(authUser).exec();
    console.log(req.body.password, user.password)
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Your password isn\'t valid.');

    User.findByIdAndRemove(authUser, (error, doc) => {
        if (!error) {
            res.redirect('/logout');
        } else {
        console.log('Error: No or invalid profile id given. Profile id: ' + req.body._id)
    }
});
};

// // Update advanced account data
// const passwordPost = (req, res) => {
//     const authUser = req.user._id;

//     const { error } = passwordValidation(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     User.findByIdAndUpdate(authUser, req.body).then(() => {
//         User.findOne({ authUser }).then((result) => {
//             res.redirect('/account/profile');
//         });
//     });
//     if (req.body._id) {
//         updateData(req, res);
//     } else {
//         console.log('Error: No or invalid profile id given. Profile id: ' + req.body._id)
//     }
// };


module.exports = {
    profileGet,
    editGet,
    editPost,
    deleteGet,
    deletePost
    // passwordPost
};