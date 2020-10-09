const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const joi = require('joi')
const path = require('path')
const superUser = require('../../models/superUser.model')
const User = require('../../models/users.model')
const mulUser = require('../../models/mulUsers.model')
const validator = require('../helpers/validations/user.validations')
const excel = require('exceljs')

exports.login = async (req, res) => {
	try {
		const { username, password } = req.body
		const userValidation = validator.userLoginValidation(req.body)
		if (userValidation.error)
			return res
				.status(401)
				.send({ msg: 'Validation Error', error: userValidation.error.message })
		const usersearch = await superUser.findOne({ username: username })
		if (usersearch) {
			const foundUser = usersearch
			const unhashedPassword = await bcrypt.compare(
				password,
				foundUser.password
			)
			if (unhashedPassword) {
				const { _id } = foundUser
				const expirationDate = Math.floor(Date.now() / 1000) + 1800
				const token = jwt.sign({ _id, exp: expirationDate }, 'secretOrKey')
				return res.json({
					msg: 'Successful Login',
					data: {
						_id,
						token,
					},
				})
			} else {
				return res.status(401).send({ msg: 'Invalid Credentials' })
			}
		} else {
			return res.status(401).send({ msg: 'Invalid Credentials' })
		}
	} catch (error) {
		return res.status(401).send({ msg: 'Invalid Credentials' })
	}
}

exports.CSV = async (req, res) => {
	try {
		const users = await User.find({}).select(
			'name email mobileNumber parentNumber residence subjects teacherNames'
		)
		const users1 = await mulUser
			.find({})
			.select(
				'name email mobileNumber parentNumber residence subjects teacherNames'
			)
		let workbook = new excel.Workbook() //creating workbook
		let worksheet = workbook.addWorksheet('Students')
		let worksheet2 = workbook.addWorksheet('Students1')
		worksheet.columns = [
			{ key: 'name', header: 'اسم الطالب' },
			{
				key: 'email',
				header: 'email',
			},
			{
				key: 'mobileNumber',
				header: 'تليفون الطالب',
			},
			{
				key: 'parentNumber',
				header: 'تليفون ولى الامر',
			},
			{
				key: 'residence',
				header: 'محل الاقامة',
			},
			{
				key: 'subjects',
				header: 'المواد المراد حجزها',
			},
			{
				key: 'teacherNames',
				header: 'اسماء المدرسين',
			},
		]
		worksheet2.columns = [
			{ key: 'name', header: 'اسم الطالب' },
			{
				key: 'email',
				header: 'email',
			},
			{
				key: 'mobileNumber',
				header: 'تليفون الطالب',
			},
			{
				key: 'parentNumber',
				header: 'تليفون ولى الامر',
			},
			{
				key: 'residence',
				header: 'محل الاقامة',
			},
			{
				key: 'subjects',
				header: 'المواد المراد حجزها',
			},
			{
				key: 'teacherNames',
				header: 'اسماء المدرسين',
			},
		]
		worksheet.addRows(users)
		worksheet2.addRows(users1)
		workbook.xlsx.writeFile('Students.xlsx').then(() => {
			const file = 'Students.xlsx'
			const fileLocation = path.join('./', file)
			return res.download(fileLocation, file)
		})
	} catch (error) {
		return res.status(401).send({ error: error })
	}
}
