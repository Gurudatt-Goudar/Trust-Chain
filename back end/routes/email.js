// routes/email.js
const express = require('express');
const { sendEmail } = require('../services/emailService');
const router = express.Router();

router.post('/send', (req, res) => {
    const { to, subject, text } = req.body;

    sendEmail(to, subject, text);
    
    // Respond to the client
    res.status(200).send('Email sent successfully!');
});

module.exports = router;
