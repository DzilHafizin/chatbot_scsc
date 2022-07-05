const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes/user-routes')
const cors = require('cors')
const app = express()
const cookieParser = require('cookie-parser')

app.use(cors({credentials: true, origin: "http://localhost:3000"}))
app.use(cookieParser())
app.use(express.json())
app.use('/api', router)

mongoose
    .connect(
        "mongodb+srv://dzilhafizin:dzil123@cluster0.bupyx.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => {
        app.listen(5000)
        console.log("Database is connected! Listening to localhost 5000")
    })
    .catch((err) => console.log(err))