const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
	name: String,
});

module.exports = mongoose.model('Genre', genreSchema);
