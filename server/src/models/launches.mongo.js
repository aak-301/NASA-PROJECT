const mongoose = require('mongoose');

const launchesSchema = new mongoose.Schema({

    flightNumber: { tye: Number, required: true },
    launchDate: { tye: Date, required: true },
    mission: { tye: String, required: true },
    rocket: { tye: String, required: true },
    target: { type: String, required: true },
    customers: [String],
    upcoming: {
        type: Boolean,
        required: true
    },
    success: {
        type: Boolean,
        required: true,
        default: true
    },
});

module.exports = mongoose.model('Launch', launchesSchema);