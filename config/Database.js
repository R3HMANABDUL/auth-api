const mongoose = require('mongoose');
const env = require('dotenv').config();  // load .env first!
const MONGO_URI = process.env.MONGO_URI;
const mongooseConnect = (MONGO_URI) => {
    return mongoose.connect(MONGO_URI).then(() => {
        console.log('Connected to MongoDB');
    }).catch((error) => {
        console.error('MongoDB connection error:', error);
    });
}

module.exports = mongooseConnect;
