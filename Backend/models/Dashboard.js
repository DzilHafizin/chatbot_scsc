const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dashboardSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: String,
    },
    timeSpent: {
        type: Number
    }
})

const Dashboard = mongoose.model('Dashboard', dashboardSchema)
module.exports = Dashboard