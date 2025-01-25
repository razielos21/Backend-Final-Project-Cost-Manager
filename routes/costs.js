const express = require('express');
const Cost = require('../models/cost');
const User = require('../models/user');
const router = express.Router();

// Add a cost
router.post('/add', async (req, res) => {
    try {
        const { description, category, user_id, sum } = req.body;

        // Validate input
        if (!description || !category || !user_id || !sum) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if the user exists
        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Create the cost item
        const cost = new Cost({ description, category, user_id, sum });
        await cost.save();

        // Update user's total costs and categories summary
        user.totalCosts += sum;
        user.categoriesSummary.set(category, (user.categoriesSummary.get(category) || 0) + sum);
        await user.save();

        res.status(201).json(cost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});


// Get costs by user
router.get('/user/:userId', async (req, res) => {
    try {
        const costs = await Cost.find({ user_id: req.params.userId });
        res.json(costs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;