const User = require('../models/User');

const profileGet = (req, res) => {
    const authUser = req.user._id;

    User.findById(authUser).then(async (user) => {
        const selectedProfile = await User.findById(req.params.id);
        res.render('pages/user/profile', {
            title: 'Profile',
            user: user.toJSON(),
            profile: selectedProfile
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
    profileUnlikePost
};