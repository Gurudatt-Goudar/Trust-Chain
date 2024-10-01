// utils/email.js
const mg = require('../config/mailgun');
const name=require('.../')

const sendEmail = (toEmail, subject, text) => {
  const data = {
    from: 'gurudattgoudar090@gmail.com', // Replace with your email
    to: toEmail,
    subject: 'Congratulations on Successfully Completing Your Course!',
    text: 'Dear {} Congratulations on successfully completing your course! The Faculty and Department of Computer Science, Karnataka University, Dharwad, wish you all the best in your future endeavors.',
  };

  return new Promise((resolve, reject) => {
    mg.messages().send(data, (error, body) => {
      if (error) {
        reject(error);
      } else {
        resolve(body);
      }
    });
  });
};

module.exports = sendEmail;
