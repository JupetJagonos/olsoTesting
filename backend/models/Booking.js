const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service', // Reference to the Service model
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['upcoming', 'completed', 'canceled'],
        default: 'upcoming',
    },
});

module.exports = mongoose.model('Booking', BookingSchema);