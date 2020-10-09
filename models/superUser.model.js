const mongoose = require('mongoose')
const Schema = mongoose.Schema

const superUserSchema = new Schema({
  username: {
    type: String
  },
  password: {
    type: String
  }
})

module.exports = superUser = mongoose.model('Super', superUserSchema)
