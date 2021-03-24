const Joi = require('joi');

const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    email: Joi.string().max(255).email().required(),
    password: Joi.string().min(8).required(),
    repeat_password: Joi.ref('password'),
    gender: Joi.string().required(),
    birthdate: Joi.date().required(),
    residence: Joi.string().required(),
    interested_in: Joi.string().required(),
    biography: Joi.string().max(1024),
    // genres: Joi.array().items(Joi.string()),
    movies: Joi.string().required(),
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

const deleteValidation = (data) => {
  const schema = Joi.object({
    password: Joi.string().min(8).required(),
    repeat_password: Joi.ref('password'),
  });

  return schema.validate(data);
};

// const passwordValidation = (data) => {
// 	const schema = Joi.object({
// 		old_password: Joi.string().min(8).required(),
// 		new_password: Joi.string().min(8).required(),
// 		repeated_new_password: Joi.string().min(8).required()
// 	});

// 	return schema.validate(data);
// };

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.editValidation = editValidation;
module.exports.deleteValidation = deleteValidation;
//module.exports.passwordValidation = passwordValidation;
