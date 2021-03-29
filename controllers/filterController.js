const User = require('../models/User');

const FilterGet = (req, res) => {
	const filterGender = req.body.gender;
	const authUser = req.user._id;

	const filterParam = {
		$and: [{ gender: filterGender }],
	};

	const useFilter = User.find(filterParam);
	useFilter.exec((err, docs) => {
		if (!err) {
			res.render('pages/home', {
				title: 'Home',
				users: docs,
				authUser: authUser,
				headerLeft: { path: '/', text: 'Refresh' },
				headerRight: { path: '/matches', text: 'Matches' },
			});
		} else {
			console.log('Error in retrieving profile data: ' + err);
		}
	});
};

module.exports = {
	FilterGet,
};
