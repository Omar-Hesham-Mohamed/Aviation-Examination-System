const express = require('express')
const router = express.Router()
const questionController = require('../controllers/question.controller')

const { verifyToken } = require('../middleware/tokenVerifier')

router.post('/createQuestion', questionController.createQuestion)
router.post('/getQuestion', questionController.getQuestion)
router.post('/updateQuestion', questionController.updateQuestion)
router.post('/deleteQuestion', questionController.deleteQuestion)

module.exports = router
