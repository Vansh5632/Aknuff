const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const passport = require('passport');
const { OAuth2Client } = require('google-auth-library');
require('dotenv').config();

const jwt = require('jsonwebtoken');

// Middleware to handle errors consistently
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// Existing signup and login routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);

// Google OAuth Server-Side Flow (Passport.js)
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    const token = req.user.token; // Assuming token is attached in passport strategy
    const user = req.user.user;   // Assuming user object is attached
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    
    // Redirect to frontend with token and user data
    res.redirect(`${frontendUrl}/product?token=${token}&user=${encodeURIComponent(JSON.stringify(user))}`);
  }
);

// Google OAuth Client-Side Token Exchange (using Google ID token from frontend)
router.post('/google/token', asyncHandler(async (req, res) => {
  const { credential } = req.body;

  if (!credential) {
    console.error('No credential provided');
    return res.status(400).json({ message: 'No credential provided' });
  }

  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  try {
    // Verify the Google ID token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    const email = payload.email;
    const name = payload.name;
    const googleId = payload.sub; // Unique Google ID

    const User = require('../models/User');
    let user = await User.findOne({ googleId });

    if (!user) {
      // Create new user if not found
      user = new User({
        googleId,
        email,
        name,
        password: null, // No password for Google-authenticated users
      });
      await user.save();
    } else {
      // Update user info if needed
      user.name = name;
      user.email = email;
      await user.save();
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id, googleId: user.googleId }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error('Error verifying Google token:', error);
    res.status(401).json({ message: 'Invalid Google token', error: error.message });
  }
}));

// Error handling middleware
router.use((err, req, res, next) => {
  console.error('Route error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

module.exports = router;