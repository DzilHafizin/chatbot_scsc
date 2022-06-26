const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please provide name'],
        minlength: 4,
        maxlength: 50,
        trim: true
    },
    email:{
        type: String,
        required: true,
        validate: {
            validator: validator.default.isEmail,
            message: 'Please provide a valid email address'
        },
        unique: true,
    },
    password:{
        type: String,
        required: [true, 'Please provide password'],
        minlength: 8,
        select: false
    }
})

UserSchema.methods.createJWT = function() {
    return jwt.sign({userId:this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
}

// UserSchema.methods.comparePassword = async function(candidate) {
//     const isMatch = await byrypt.js.compare(candidate.this.password)
//     return isMatch
// }

module.exports = mongoose.model('User', UserSchema)