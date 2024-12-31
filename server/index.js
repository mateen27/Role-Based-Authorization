const express = require('express');
const dbConnect = require('./config/dbConnect');
const dotenv = require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');


dbConnect();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

// Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));