const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const passport = require('passport');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

// Enhanced async handler with logging
const asyncHandler = (fn) => (req, res, next) => 
  Promise.resolve(fn(req, res, next))
    .catch((error) => {
      console.error(`Async handler error at ${req.path}:`, error);
      next(error);
    });

// Existing routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);

// Google OAuth Routes
// ===================

// 1. Server-Side Flow (Passport.js)
router.get('/google', passport.authenticate('google', { 
  scope: ['profile', 'email'],
  accessType: 'offline', // For refresh tokens
  prompt: 'consent' // Force consent screen
}));

router.get('/google/callback',
  passport.authenticate('google', { 
    session: false, 
    failureRedirect: '/login',
    failureMessage: true 
  }),
  (req, res) => {
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    
    // Secure cookie-based response
    res.cookie('token', req.user.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000 // 1 hour
    });
    
    res.redirect(`${frontendUrl}/products`);
  }
);

// 2. Client-Side Token Verification
router.post('/google/token', asyncHandler(async (req, res) => {
  const { credential: idToken } = req.body; // Match frontend's credential name
  
  if (!idToken) {
    return res.status(400).json({ 
      success: false,
      message: 'Missing Google ID token' 
    });
  }

  const client = new OAuth2Client({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  });

  try {
    // Verify ID token
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { sub: googleId, email, name, picture } = ticket.getPayload();

    // Enhanced user handling
    const user = await User.findOneAndUpdate(
      { googleId },
      { 
        $set: { 
          email, 
          name,
          avatar: picture,
          lastLogin: new Date() 
        }
      },
      { 
        upsert: true,
        new: true,
        setDefaultsOnInsert: true 
      }
    );

    // JWT generation
    const token = jwt.sign(
      { 
        userId: user._id,
        email: user.email,
        provider: 'google' 
      },
      process.env.JWT_SECRET,
      { 
        expiresIn: '1h',
        issuer: 'your-app-name'
      }
    );

    // Secure response with sameSite cookies
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600000
    });

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      }
    });

  } catch (error) {
    console.error('Google authentication error:', error);
    res.status(401).json({
      success: false,
      message: 'Authentication failed',
      error: error.message
    });
  }
}));

// Enhanced error handling
router.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(`Global error handler: ${err.message}`);
  
  res.status(statusCode).json({
    success: false,
    message: process.env.NODE_ENV === 'production' 
      ? 'An error occurred' 
      : err.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
});

module.exports = router;