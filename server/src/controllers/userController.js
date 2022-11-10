const User = require('../models/User')

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