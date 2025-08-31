require("dotenv").config();  // load .env first!

const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Read from .env only
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;


mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

app.listen(PORT, () => {
  console.log(`✅ Server running `);
});