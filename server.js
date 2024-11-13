const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Inline configuration
const SENDGRID_API_KEY = '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'; 
const PORT = 3000;

// SendGrid API Key Configuration
sgMail.setApiKey(SENDGRID_API_KEY);

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/subscribe', async (req, res) => {
    const { name, email } = req.body;

    const msg = {
        to: email,
        from: 'vansh4822.be23@chitkara.edu.in', 
        subject: 'Welcome to Pokemon Piper!',
        text: `Hello ${name}, Welcome to Pokemon Piper!`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h1 style="color: #2c3e50; text-align: center;">Welcome to Pokemon Piper!</h1>
                <p style="color: #7f8c8d; font-size: 16px;">Dear ${name},</p>
                <p style="color: #7f8c8d; font-size: 16px;">Thank you for subscribing to our newsletter! We're excited to have you join our community of pokemon trainers and scientists.</p>
                <p style="color: #7f8c8d; font-size: 16px;">You'll now receive updates about:</p>
                <ul style="color: #7f8c8d; font-size: 16px;">
                    <li>Latest Pokemon updates</li>
                    <li>Course on pokedex and pokemon tournaments</li>
                    <li>Community events and workshops where you can meet renowned scientists</li>
                    <li>Internship opportunities at Dr. Oak's LAB</li>
                </ul>
                <p style="color: #7f8c8d; font-size: 16px;">Stay tuned for our upcoming newsletters!</p>
                <div style="text-align: center; margin-top: 30px;">
                    <a href="https://your-website.com" style="background-color: #3498db; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Visit Our Website</a>
                </div>
            </div>
        `
    };

    try {
        await sgMail.send(msg);
        res.json({ success: true, message: 'Welcome email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Error sending welcome email' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
