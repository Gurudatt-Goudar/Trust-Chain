// EmailSender.js
import React, { useState } from 'react';
import axios from 'axios';

const EmailSender = () => {
    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('');
    const [text, setText] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/email/send', { to, subject, text });
            alert('Email sent successfully!');
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send email.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="Recipient Email"
                required
            />
            <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject"
                required
            />
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Email body"
                required
            />
            <button type="submit">Send Email</button>
        </form>
    );
};

export default EmailSender;
