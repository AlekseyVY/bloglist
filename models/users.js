const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


const userSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: 5,
        required: true
    },
    username: {
        type: String,
        minLength: 5,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String
    }
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})
userSchema.plugin(uniqueValidator)
module.exports = mongoose.model('User', userSchema)
