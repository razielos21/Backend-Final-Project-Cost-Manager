const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    birthday: { type: Date, required: true },
    marital_status: { type: String, required: true },
    totalCosts: { type: Number, default: 0 },
    categoriesSummary: {
        food: { type: Number, default: 0 },
        health: { type: Number, default: 0 },
        housing: { type: Number, default: 0 },
        sport: { type: Number, default: 0 },
        education: { type: Number, default: 0 }
    }
});

module.exports = mongoose.model('User', userSchema);
