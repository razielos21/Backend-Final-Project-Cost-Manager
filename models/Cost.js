const mongoose = require('mongoose');

const costSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    sum: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cost', costSchema);