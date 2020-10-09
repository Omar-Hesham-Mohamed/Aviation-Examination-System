const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	mobileNumber: {
		type: String,
		required: true,
		unique: true,
	},
	parentNumber: {
		type: String,
		required: true,
	},
	residence: {
		type: String,
		required: true,
	},
	subjects: [
		{
			type: String,
		},
	],
	teacherNames: [
		{
			type: String,
		},
	],
})

module.exports = user = mongoose.model('User', userSchema)
