const jwt = require('jsonwebtoken');
require('dotenv/config');

module.exports = (req, res, next) => {
	// Get accessToken
	const accessToken = req.cookies.accessToken;

	// If There is NO accessToken -> Redirect to Login Page
	if (!accessToken) return res.redirect('/signin');

	try {
		const verified = jwt.verify(accessToken, process.env.JWT_KEY);
		req.user = verified;
		next();
	} catch (err) {
		res.status(400).send('Invalid access token');
	}
};
