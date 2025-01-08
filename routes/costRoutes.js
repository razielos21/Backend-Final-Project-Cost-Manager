const express = require('express');
const Cost = require('../models/Cost');
const User = require('../models/User');
const router = express.Router();

// Add a cost
router.post('/add', async (req, res) => {
    try {
        const cost = new Cost(req.body);
        await cost.save();

        // Update user's total costs and categories summary
        await User.findByIdAndUpdate(req.body.user_id, {
            $inc: {
                totalCosts: req.body.sum,
                [`categoriesSummary.${req.body.category}`]: req.body.sum
            }
        });

        res.status(201).json(cost);
    } catch (error) {
        res.status(400).json({ error: error.message });
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