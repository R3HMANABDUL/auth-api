require("dotenv").config();  // load .env first!
const express = require("express");
const app = express();
const mongooseConnect = require("./config/Database");
const Path = require('path')
const AuthRoutes = require('./Routers/Auth.route')
const auth = require('./Middleware/Auth')
app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static("public"))
app.use('./Uploads',express.json(Path.join(__dirname,'Uploads')))







// Read from .env only
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
// Db Connection
mongooseConnect(MONGO_URI);

app.use('/api/user', AuthRoutes);
app.use(auth);
app.get('/api/abc',(req,res)=>{
  res.json({ message: 'Welcome to the Auth API',});
})


app.listen(PORT, () => {
  console.log(`Express Server running on port ${PORT}`);
});