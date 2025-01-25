require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./routes/users');
const costRoutes = require('./routes/costs');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/users', userRoutes);
app.use('/costs', costRoutes);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/CostManager')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} GEVERRRRRR`));