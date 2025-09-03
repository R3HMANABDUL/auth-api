const { unique } = require('@tensorflow/tfjs');
const mongoose = require('mongoose');
const AuthUserScema = new mongoose.Schema({
    username:{
        type:String,
        required:true,        
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,        
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
})



const AuthUser = mongoose.model('AuthUser', AuthUserScema);
module.exports = AuthUser;