const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verified: Boolean
})

const user = mongoose.model('user', userSchema)

module.exports = user