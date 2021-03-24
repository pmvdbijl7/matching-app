const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			minLength: 2,
			maxLength: 255,
			required: true,
		},
		gender: {
			type: String,
		},
		birthdate: {
			type: Date,
		},
		residence: {
			type: String,
		},
		interested_in: {
			type: String,
		},
		biography: {
			type: String,
			maxLength: 1024,
		},
		email: {
			type: String,
			maxLength: 255,
			required: true,
			unique: true,
			uniqueCaseInsensitive: true,
		},
		password: {
			type: String,
			minLength: 8,
			required: true,
		},
		profile_image: {
			data: Buffer,
			type: String,
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

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);
