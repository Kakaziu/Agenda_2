const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true},
    password: { type: String, required: true }
})

const userModel = mongoose.model('User', UserSchema)

class User{
    constructor(body){
        this.body = body
        this.errors = []
        this.user = null
    }
}

module.exports = User