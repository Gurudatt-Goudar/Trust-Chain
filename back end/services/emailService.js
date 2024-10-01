// emailService.js
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    secure: false, // true for 465, false for other ports
    port: 587, // port number
    tls: {
        rejectUnauthorized: false, // may help if you run into certificate issues
    },
});

const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,  
        subject: subject,
        text: text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error.message);
            console.error('Response Code:', error.responseCode);
            console.error('Response:', error.response);
        } else {
            console.log('Email sent successfully:', info.response);
        }
    });
};

module.exports = { sendEmail };
