const User = require('../models/User')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) =>{
    const user = new User(req.body)

    try{
        await user.register()

        if(user.errors.length > 0) return res.status(400).json({ errors: user.errors })

        return res.json(user.user)
    }catch(error){
        return res.status(500).json({ error })
    }
}

exports.login = async (req, res) =>{
    const user = new User(req.body)

    try{
        await user.login()

        if(user.errors.length > 0) return res.status(400).json({ errors: user.errors })

        const token = jwt.sign({ id: user.user._id }, process.env.SECRET)

        res.header('authorization-token', token)
        return res.json({
            user: user.user,
            token: token
        })
    }catch(error){
        return res.status(500).json({ error })
    }
}

exports.validateToken = async (req, res) =>{
    const { token } = req.body

    console.log(token)

    try{
        const userVerified = jwt.verify(token, process.env.SECRET)
        const user = await User.findUser(userVerified.id)

        return res.json(user)
    }catch(error){
        return res.status(500).json({ error })
    }
}
