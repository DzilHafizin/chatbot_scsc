const User = require('../models/User')

const register = async(req, res) => {

    try {
        
        const { name, email, password } = req.body
        const user = await User.create({ name, email, password })
        const token = user.createJWT()
        // console.log(user)

        res.status(201).json({
            user: {
                name: user.name,
                email: user.email
            },
            token
        })

    } catch (error) {
        res.status(500).json({msg: `an error occured: ${error}`})
    }

}

const login = async(req,res) => {
    const { email , password } = req.body

    if(!email || !password) {
        res.status(500).json({msg:"Please provide a proper values"})
    }

    const user = await User.findOne({email}).select('+password')

    // console.log(user)

    if(!user) {
        res.status(500).json({msg: "The entered email is not found or not registered"})
    }

    if(password !== user.password) {
        res.status(500).json({msg: "The entered password is incorrect"})
    }

    const token = user.createJWT()
    user.password = undefined

    res.status(201).json({user,token})
}

module.exports = {register, login}