const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dashboardSchema = new Schema({
    dayName: {
        type: String
    },
    date: {
        type: String
    },
    timeSpent: {
        type: Number
    }
})

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    dashboard: [dashboardSchema]
})

const User = mongoose.model('User', userSchema)
module.exports = User