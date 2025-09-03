const jwt = require('jsonwebtoken')
const AuthUser = require('../config/model/AuthUser')
const { nextFrame } = require('@tensorflow/tfjs')



const auth = async(req,res,next)=>{
    try {
        const bearerHeader = req.headers['authorization']
            if(typeof bearerHeader !== 'undefined'){
                const token = bearerHeader.split(' ')[1]
                const user = jwt.verify(token, process.env.JWT_SECRET)
                if(!user) return res.status(401).json({message:"Unauthorized"})
                req.user = user
                next()
            }
    } catch (error) {
        return res.status(401).json({message:"Unauthorized"})
    }
}

module.exports = auth;