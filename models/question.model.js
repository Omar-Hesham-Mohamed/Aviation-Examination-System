const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    subject: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    image: {
        type: Image,
        required: true,
    },
    a: {
        type: String,
        required: true,
    },
    b: {
        type: String,
        required: true,
    },
    c: {
        type: String
    },
    d: {
        type: String
    },
    correctAnswer: {
        type: String,
        required: true,
    }
})

module.exports = superUser = mongoose.model('Question', questionSchema)
