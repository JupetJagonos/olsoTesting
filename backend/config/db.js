const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://jagonosjupet:olsocapstone@olsocapstone.louj1.mongodb.net/?retryWrites=true&w=majority&appName=OLSOCapstone');
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process on failure
    }
};

module.exports = connectDB;