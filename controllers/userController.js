const User = require('../models/User');

const profileGet = (req, res) => {
	const authUser = req.user._id;
	const user = req.params.id;

	User.findById(authUser).then((authUser) => {
		User.findById(user).then((user) => {
			res.render('pages/user/profile', {
				title: `Profile of ${user.name}`,
				authUser: authUser,
				user: user,
				headerLeft: { path: '/', text: 'Back' },
			});
		});
	});
};

const profileLikePost = (req, res) => {
	const authUser = req.user._id;

	const profileId = req.body.profile_id;
	User.findByIdAndUpdate(
		authUser,
		{ $addToSet: { liked_profiles: profileId } },
		{ safe: true, upsert: true, new: true },
		function (err, result) {
			if (err) {
				console.log(err);
			}
		}
	);
};

const profileUnlikePost = (req, res) => {
	const authUser = req.user._id;

	const profileId = req.body.profile_id;
	User.findByIdAndUpdate(
		authUser,
		{ $pull: { liked_profiles: profileId } },
		{ safe: true, upsert: true, new: true },
		function (err, result) {
			if (err) {
				console.log(err);
			}
		}
	);
};

module.exports = {
	profileGet,
	profileLikePost,
	profileUnlikePost,
};
