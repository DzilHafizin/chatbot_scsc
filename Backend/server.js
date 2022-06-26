require('dotenv').config()
const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const app = express()
const mongoose = require('mongoose')

//ROUTES
const auth = require('./routes/auth')

//MIDDLEWARE
app.use(cors())
app.use(express.json())

//MORGAN
if(process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
}




app.get('/', (req, res) => {
    res.send('Welcome to SCSC Chatbot Backend')
})

app.get('/hello', (req, res) => { 
    res.send('hello world')
})

app.use('/api/v1/auth',auth)

const port = process.env.PORT || 5000 //connection port





const start = async() => {
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
}

start()