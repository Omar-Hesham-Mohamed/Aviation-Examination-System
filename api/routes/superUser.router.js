const express = require('express')
const router = express.Router()
const superUserController = require('../controllers/superUser.controller')

const { verifyToken } = require('../middleware/tokenVerifier')

router.post('/login', superUserController.login)
router.get('/CSV', superUserController.CSV)

module.exports = router
