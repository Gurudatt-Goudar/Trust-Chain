const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const adminRoutes = require('./routes/admin'); 
const certificateRoutes = require('./routes/certificate');
const emailRoutes = require('./routes/email');



const app = express();
const port = process.env.PORT || 5000;

// CORS middleware
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to the Certificate Manager API!');
});

// Middleware for parsing request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
app.use('/api', adminRoutes); 
app.use('/api/email', emailRoutes);
app.use('/api/admin', adminRoutes); // Admin routes
app.use('/api/certificate', certificateRoutes); // Certificate routes

// Connect to MongoDB without deprecated options
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
