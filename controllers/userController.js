const User = require('../models/User');

const profileGet = async (req, res) => {
    const selectedProfile = await User.findById(req.params.id);
    res.render('pages/user/profile', {
        title: 'Profile',
        profile: selectedProfile
    })
};

const profileLikePost = (req, res) => {
    const authUser = req.user._id;

    const profileId = req.body.profile_id;
    User.findByIdAndUpdate(
        authUser,
        { $push: { liked_profiles: profileId } },
        { safe: true, upsert: true, new: true },
        function (err, result) {
            if (err){
            console.log(err);
            }
        }
    );
};


module.exports = {
    profileGet,
    profileLikePost
};