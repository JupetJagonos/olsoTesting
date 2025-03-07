const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    activityType: { type: String, required: true }, // Could be 'appointment', 'service', etc.
    description: { type: String, required: true },
    date: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Activity', ActivitySchema);