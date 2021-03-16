const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	genres: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Genre',
			required: true,
		},
	],
});

module.exports = mongoose.model('Movie', movieSchema);
