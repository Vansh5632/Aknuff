// server/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const passport = require('passport');
require('dotenv').config();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

// Google Auth Routes (for server-side fallback or hybrid flow)
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    const { user, token } = req.user;
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    res.redirect(`${frontendUrl}/product?token=${token}&user=${encodeURIComponent(JSON.stringify(user))}`);
  }
);

// New endpoint for client-side token exchange
router.post('/auth/google/token', async (req, res) => {
  const { credential } = req.body;
  if (!credential) return res.status(400).json({ message: 'No credential provided' });

  // Verify the Google token (you'll need the google-auth-library)
  const { OAuth2Client } = require('google-auth-library');
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const email = payload.email;
    const name = payload.name;

    const User = require('../models/User');
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name, email, password: 'google-auth-' + Math.random().toString(36).slice(-8) });
      await user.save();
    }
    const token = require('jsonwebtoken').sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user });
  } catch (error) {
    res.status(401).json({ message: 'Invalid Google token', error });
  }
});

module.exports = router;