// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/email');

const jwtSecret = process.env.JWT_SECRET || 'Gurudatt'; // Use environment variable

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, jwtSecret, {
      expiresIn: '1h',
    });

    // Optionally send a notification email upon login
    try {
      await sendEmail(email, 'Login Notification', 'You have successfully logged in.');
    } catch (emailError) {
      console.error('Failed to send login notification email:', emailError);
    }

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
