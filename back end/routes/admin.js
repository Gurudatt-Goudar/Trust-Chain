const express = require('express');
const bcrypt = require('bcryptjs'); // For hashed passwords
const jwt = require('jsonwebtoken');
const Login = require('../models/Admin'); // Update path if necessary
const Certificate = require('../models/certificateModel'); 

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Login.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // For plain password (not recommended in production)
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET||Gurudatt, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


// Get all certificates
router.get('/all', async (req, res) => {
  try {
    const certificates = await Certificate.find({});
    res.status(200).json(certificates);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve certificates.', details: error.message });
  }
});

module.exports = router;
