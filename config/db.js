const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://SAHAN:SAHAN8@sahan.srjbswh.mongodb.net/?appName=SAHAN";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;