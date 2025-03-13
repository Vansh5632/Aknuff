// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const path = require('path');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: '*', credentials: true }));
app.use(passport.initialize());

// Serve static files from the React app (client/build folder) only for non-API routes
app.use(express.static(path.join(__dirname, '../client/dist'))); // Adjust path to client build directory

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Passport Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.API_URL || 'http://localhost:3000'}/api/auth/google/callback`
},
async (accessToken, refreshToken, profile, done) => {
  const User = require('./models/User');
  try {
    let user = await User.findOne({ email: profile.emails[0].value });
    if (!user) {
      user = new User({
        name: profile.displayName,
        email: profile.emails[0].value,
        password: 'google-auth-' + Math.random().toString(36).slice(-8), // Dummy password
      });
      await user.save();
    }
    const token = require('jsonwebtoken').sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return done(null, { user, token });
  } catch (err) {
    return done(err, null);
  }
}));

passport.serializeUser((userObj, done) => done(null, userObj));
passport.deserializeUser((userObj, done) => done(null, userObj));

// Routes
app.use('/api/auth', authRoutes);

// Serve React app only for root route (optional, adjust as needed)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;