const User = require('../models/User');

const homeGet = (req, res) => {
    User.find((err, docs) => {
        if (!err) {
            res.render('pages/home', { title: 'Home', users: docs, headerLeft: { path: '/logout', text: 'Log out' }, headerRight: {path: '/matches', text: 'Matches'}  });
        } else {
            console.log('Error in retrieving profile data: ' + err)
        }
    })
};

module.exports = {
    homeGet,
};

