
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // REPLACED: process.env.MONGODB_URI with a placeholder text string
    await mongoose.connect('YOUR_MONGODB_URI_HERE');
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
