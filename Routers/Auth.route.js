
const express = require('express')
const router = express.Router()
const AuthUser = require('../config/model/AuthUser')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

router.post('/register',async(req,res)=>{
    try {
        const {username,email,password} = req.body;
        const existingUser = await AuthUser.findOne({$or:[{username},{email}]})
        if(existingUser) return res.status(400).json({message:"User already exist"})
            
                const hashedPassword = await bcrypt.hash(password,10)
                const newUser = new AuthUser({username,email,password:hashedPassword})
                const saveUser =await newUser.save()
                res.json(saveUser)
    } catch (error) {
        console.error('Error registering user:', error)
        res.status(500).json({ message: 'Internal server error' })
    }

})
router.post('/login',async(req,res)=>{
     try {
        const {username,password} = req.body;
        const user = await AuthUser.findOne({username})
        if(!user) return res.status(400).json({message:"userNotFound"})
            const isMatch = await bcrypt.compare(password,user.password)
            if(!isMatch) return res.status(400).json({message:"Invalid credentials"})
            const token = jwt.sign({ id: user._id,username:user.username },
            process.env.JWT_SECRET, { expiresIn: '1h' })
            res.json({ token })
     } catch (error) {
         console.error('Error logging in user:', error)
         res.status(500).json({ message: 'Internal server error' })
     }
})

router.post('/logout', (req, res) => {
    res.json({ message: 'Logout successful' })
})


module.exports = router;