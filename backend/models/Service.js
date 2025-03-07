const mongoose = require ('mongoose');

// const ServiceSchema = new mongoose.Schema({
//     title: { type: String,
//         required: true},
//     description: {type: String,
//         required: true},
//     price: {type: Number,
//         required: true
//     },
//     provider: {type: mongoose.Schema.Types.ObjectId,
//         ref:'User',
//         required: true },
//     category: {type: String, required: true },
// }, {timestamps: true 


// });

// module.exports = mongoose.model ('Service', ServiceSchema);

const ServiceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Service', ServiceSchema);