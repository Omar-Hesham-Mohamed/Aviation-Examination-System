const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const joi = require('joi')
const User = require('../../models/users.model')
const mulUser = require('../../models/mulUsers.model')
const validator = require('../helpers/validations/user.validations')

exports.createUser = async function (req, res) {
	try {
		const user = req.body
		const userValidation = validator.createUserValidation(user)
		if (userValidation.error)
			switch (userValidation.error.message) {
				case 'child "residence" fails because ["residence" length must be at least 3 characters long]':
					return res
						.status(401)
						.send({ msg: 'يجب أن يكون مكان إقامتك أطول من حرفين' })
				case 'child "name" fails because ["name" length must be at least 3 characters long]':
					return res.status(401).send({ msg: 'يجب أن يكون اسمك أطول من حرفين' })
				case 'child "mobileNumber" fails because ["mobileNumber" length must be at least 11 characters long]':
					return res.status(401).send({
						msg:
							'يجب أن يكون رقم هاتفك المحمول رقمًا صحيحًا وأن يتكون من أحد عشر رقمًا',
					})
				case 'child "email" fails because ["email" must be a valid email]':
					return res.status(401).send({
						msg:
							'هذا ليس بريدًا إلكترونيًا صحيحًا. يرجى محاولة استخدام بريد إلكتروني آخر',
					})
				case 'child "parentNumber" fails because ["parentNumber" length must be at least 11 characters long]':
					return res.status(401).send({
						msg:
							'يجب أن يكون رقم الهاتف المحمول لولي الأمر صحيحًا وأحد عشر رقمًا',
					})
			}
		if (user.mobileNumber === user.parentNumber) {
			return res
				.status(401)
				.send({ msg: 'لا يمكن أن يكون رقم هاتف ولى الامر هو نفسه رقمك' })
		}
		const number = await User.findOne({ mobileNumber: user.mobileNumber })
		if (number) {
			return res.status(401).send({ msg: 'تم تسجيل رقم هاتفك المحمول من قبل' })
		}
		const userCreate = await User.create(user)
		const proms = []
		let temp = {}
		for (let i = 0; user.subjects.length > i; i++) {
			temp = {}
			temp = {
				...user,
			}
			temp.subjects = user.subjects[i]
			temp.teacherNames = user.teacherNames[i]
			proms.push(mulUser.create(temp))
		}
		await Promise.all(proms)
		if (userCreate)
			return res.json({
				msg: 'User was created successfully',
				data: userCreate,
			})
	} catch (error) {
		return res.status(401).send({ msg: 'Unkown Error', error: error })
	}
}
