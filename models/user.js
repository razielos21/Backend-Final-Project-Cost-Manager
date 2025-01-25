const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    birthday: { type: Date, required: true },
    marital_status: { type: String, required: true },
    totalCosts: { type: Number, default: 0 },
    categoriesSummary: { type: Map, of: Number, default: {} }
});

module.exports = mongoose.model('User', UserSchema);
