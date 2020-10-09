const BaseJoi = require('joi')
const Extension = require('joi-date-extensions')
const Joi = BaseJoi.extend(Extension)

module.exports = {
	createUserValidation: (request) => {
		const createSchema = {
			email: Joi.string().email().required(),
			name: Joi.string().min(3).required(),
			mobileNumber: Joi.string().min(11).max(11).required().regex(/^\d+$/),
			parentNumber: Joi.string().min(11).max(11).required().regex(/^\d+$/),
			residence: Joi.string().min(3).required(),
			subjects: Joi.array().items(Joi.string()),
			teacherNames: Joi.array().items(Joi.string()),
		}
		return Joi.validate(request, createSchema)
	},
	userLoginValidation: (request) => {
		const loginSchema = {
			username: Joi.string().min(3).max(500).required(),
			password: Joi.string().min(3).max(500).required(),
		}
		return Joi.validate(request, loginSchema)
	},
}
