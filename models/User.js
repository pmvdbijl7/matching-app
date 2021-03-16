const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			minLength: 2,
			maxLength: 255,
		},
		gender: {
			type: String,
			required: true,
		},
		birthdate: {
			type: Date,
			required: true,
		},
		residence: {
			type: String,
			required: true,
		},
		interested_in: {
			type: String,
			required: true,
		},
		biography: {
			type: String,
			maxLength: 1024,
		},
		email: {
			type: String,
			maxLength: 255,
			required: true,
		},
		password: {
			type: String,
			minLength: 8,
			required: true,
		},
		genres: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Genre',
			},
		],
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
	},
	{ timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
