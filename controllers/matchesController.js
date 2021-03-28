const User = require('../models/User');

const matchesGet = (req, res) => {
	const authUser = req.user._id;

	User.findById(authUser).then((user) => {
		User.find((err, docs) => {
			if (!err) {
				res.render('pages/matches', {
					title: 'Home',
					user: user.toJSON(),
					users: docs,
					headerLeft: {
						path: '/logout',
						text: 'Log out'
					},
					headerRight: {
						path: '/account/profile',
						text: 'My profile'
					}
				});
			} else {
				console.log('Error in retrieving profile data: ' + err)
			}
		});
	});
};

module.exports = {
	matchesGet
};
