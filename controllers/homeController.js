const homeGet = (req, res) => {
	res.render('pages/home', { title: 'Home' });
};

module.exports = {
	homeGet,
};
