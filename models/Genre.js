const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
	name: String,
	movies: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Movie',
		},
	],
	series: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Series',
		},
	],
});

module.exports = mongoose.model('Genre', genreSchema);
