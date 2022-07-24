const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes/user-routes')
const cors = require('cors')
const app = express()
const cookieParser = require('cookie-parser')
const User = require('./models/User')
const Dashboard = require('./models/Dashboard')

app.use(cors({credentials: true, origin: "http://localhost:3000"}))
app.use(cookieParser())
app.use(express.json())
// app.use('/api', router)

mongoose.connect(
    "mongodb+srv://dzilhafizin:dzil123@cluster0.bupyx.mongodb.net/?retryWrites=true&w=majority"
)
.then(() => {
    app.listen(5000)
    console.log("Database is connected! Listening to localhost 5000")
})
.catch((err) => {
    console.log(err)
})

app.post('/getUser', async(req, res) => {
    const user = await User.findOne({email: req.body.email})
    return res.json(user)
})

app.post('/editUser', async(req, res) => {
    console.log(req.body)

    await User.updateOne({email: req.body.email}, {$set: { "firstName" : req.body.firstName, "lastName" : req.body.lastName}})
        .catch((err) => {
            console.log(err)
            return res.status(400).json({message: `Error: ${err}`})
        })

    return res.json(req.body)
})

app.post('/getData', async(req, res) => {
    // console.log(req.body)
    const user = await User.findOne({email: req.body.email})

    const data = user.dashboard

    const sorter = {
        "Sun": 0,
        "Mon": 1,
        "Tue": 2,
        "Wed": 3,
        "Thu": 4,
        "Fri": 5,
        "Sat": 6
      }
    data.sort((a,b) => {
        const day1 = a.dayName;
        const day2 = b.dayName;
        return sorter[day1] - sorter[day2];
    });

   return res.json(data)
})

app.post('/register', async(req, res) => {

    const isExist = await User.findOne({email: req.body.email})

    if(isExist) {
        return res.status(400).json({message: "user already registered"})
    }

    const newUser = new User(req.body)
    
    await newUser.save()
        .then((result) => {
            console.log(result)
            return res.send("Successfully registered")
        }).catch((err) => {
            console.log(err)
        })
})

app.post('/uploadAct', async(req, res) => {
    // const dashboard = new Dashboard()
    const currDate = new Date()
    const dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const user = await User.findOne({email: req.body.email})

    if(!user) {
        return res.status(400).json({message: "User not found!"})
    }

    const dashboard = {
        dayName: req.body.date.split(" ")[0],
        date: req.body.date,
        timeSpent: Math.ceil(req.body.timeSpent)
    }

    console.log(dashboard.timeSpent, req.body.timeSpent)

    const isExistDate = checkExist(user.dashboard, dashboard.dayName)

    if ((user.dashboard.length === 0) || (!isExistDate.exist)) {
        console.log(dashboard)
        await User.updateOne({email: req.body.email}, {$push: {dashboard: dashboard}})
        .then((result) => {
            console.log("Add new data in Dashboard")
        })
        .catch((err) => {
            console.log(err)
        })
        return res.send("Add new data in Dashboard")
    }

    else if (
        isExistDate.exist && 
        (dashboard.dayName === dayName[currDate.getDay()]) && 
        (Number(req.body.date.split(" ")[2]) === currDate.getDate()) &&
        (currDate.getDate() !== Number(isExistDate.date.split(" ")[2]))
       ) 
    {

        await User.updateOne(
            {
                email: req.body.email,
                "dashboard.dayName" : dashboard.dayName
            }, 
            {
                $set: {
                    "dashboard.$.date" : dashboard.date,
                    "dashboard.$.timeSpent" : dashboard.timeSpent
                }
            }
        )
        .then((result) => {
            console.log("Update new data in Dashboard on different date")
        })
        .catch((err) => {
            console.log(err)
        })
        return res.send("Update new data in Dashboard on different date")
    }
    
    else if (isExistDate.exist && (dashboard.dayName === dayName[currDate.getDay()]) && (Number(req.body.date.split(" ")[2]) === currDate.getDate())) {

        await User.updateOne(
            {
                email: req.body.email,
                "dashboard.dayName" : dashboard.dayName
            }, 
            {
                $set: {
                    "dashboard.$.timeSpent" : dashboard.timeSpent + isExistDate.timeSpent
                }
            }
        )
        .then((result) => {
            console.log("Increment data in Dashboard on same date")
        })
        .catch((err) => {
            console.log(err)
        })
        return res.send("Increment data in Dashboard on same date")
    }

    else if (isExistDate.exist) {

        await User.updateOne(
            {
                email: req.body.email,
                "dashboard.dayName" : dashboard.dayName
            }, 
            {
                $set: {
                    "dashboard.$.date" : dashboard.date,
                    "dashboard.$.timeSpent" : dashboard.timeSpent
                }
            }
        )
        .then((result) => {
            console.log("Update data in Dashboard on different date")
        })
        .catch((err) => {
            console.log(err)
        })
        return res.send("Update data in Dashboard on different date")
    }

})

function checkExist(array, dayName) {

    var exist = false;
    var timeSpent
    var dayName
    var date

    array.forEach(element => {
        if (dayName === element.dayName) {
            date = element.date
            dayName = element.dayName
            timeSpent = element.timeSpent
            exist = true;
        }
    });

    return {
        exist,
        timeSpent,
        dayName,
        date
    };
}