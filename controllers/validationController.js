const Joi = require('joi');

const registerValidation = (data) => {
	const schema = Joi.object({
		name: Joi.string().min(2).max(255).required(),
		email: Joi.string().max(255).email().required(),
		password: Joi.string().min(8).required(),
		gender: Joi.string().required(),
		birthdate: Joi.date().required(),
		residence: Joi.string().required(),
		interested_in: Joi.string().required(),
		biography: Joi.string().max(1024),
		// genres: Joi.array().items(Joi.string()),
		// movies: Joi.array().items(Joi.string()),
		// series: Joi.array().items(Joi.string())
	});

	return schema.validate(data);
};

const loginValidation = (data) => {
	const schema = Joi.object({
		email: Joi.string().max(255).email().required(),
		password: Joi.string().min(8).required(),
	});

	return schema.validate(data);
};

const editValidation = (data) => {
	const schema = Joi.object({
		name: Joi.string().min(2).max(255).required(),
		email: Joi.string().max(255).email().required(),
		gender: Joi.string().required(),
		birthdate: Joi.date().required(),
		residence: Joi.string().required(),
		interested_in: Joi.string().required(),
		biography: Joi.string().max(1024),
		// genres: Joi.array().items(Joi.string()),
		// movies: Joi.array().items(Joi.string()),
		// series: Joi.array().items(Joi.string())
	});

	return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.editValidation = editValidation;
