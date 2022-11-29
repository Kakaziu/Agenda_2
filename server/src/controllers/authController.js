const jwt = require('jsonwebtoken')

module.exports = (req, res, next) =>{
    const token = req.header('authorization-token')
    if(!token) return res.status(401).json({ error: 'Access denied.' })

    try{
        const userVerified = jwt.verify(token, process.env.SECRET)
        req.user = userVerified.id

        next()
    }catch(error){
        return res.status(500).json({ error })
    }
}
