const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')

const { verifyToken } = require('../middleware/tokenVerifier')

router.post('/createUser', userController.createUser)

module.exports = router
