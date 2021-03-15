const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			minLength: 2,
			maxLength: 255,
			required: true,
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
	},
	{ timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
