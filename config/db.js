
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Replace this string with your actual MongoDB connection string
    const db = 'YOUR_MONGODB_URI_HERE'; 
    
    if (db === 'YOUR_MONGODB_URI_HERE') {
        console.warn('MongoDB URI is not set. Database connection will fail.');
        return;
    }

    await mongoose.connect(db);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
