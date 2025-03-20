const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: '*', credentials: true })); // Avoid '*' in production
app.use(passport.initialize());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Passport Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.API_URL || 'http://localhost:3000'}/api/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log('Google OAuth profile:', profile);
      const User = require('./models/User');
      try {
        let user = await User.findOne({ googleId: profile.id }); // Use googleId instead of email
        if (!user) {
          console.log('User not found, creating new user');
          user = new User({
            googleId: profile.id, // Unique Google ID
            name: profile.displayName,
            email: profile.emails[0].value,
            password: null, // No password for Google users
          });
          await user.save();
          console.log('New user created:', user);
        } else {
          // Update user info if necessary
          user.name = profile.displayName;
          user.email = profile.emails[0].value;
          await user.save();
          console.log('User found and updated:', user);
        }
        const token = jwt.sign({ id: user._id, googleId: user.googleId }, process.env.JWT_SECRET, {
          expiresIn: '1h',
        });
        console.log('JWT token generated:', token);
        return done(null, { user, token });
      } catch (err) {
        console.error('Error during Google OAuth:', err);
        return done(err, null);
      }
    }
  )
);

// Serialize and Deserialize User
passport.serializeUser((userObj, done) => {
  done(null, { user: userObj.user, token: userObj.token }); // Pass user and token directly
});

passport.deserializeUser((userObj, done) => {
  jwt.verify(userObj.token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('JWT verify error:', err);
      return done(err, null);
    }
    User.findById(decoded.id)
      .then(user => {
        console.log('JWT verified, user fetched:', user);
        done(null, { user, token: userObj.token });
      })
      .catch(err => {
        console.error('Error fetching user:', err);
        done(err, null);
      });
  });
});

// Routes
app.use('/api/auth', authRoutes);

// Health Check
app.get('/', (req, res) => res.send('API is running'));

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

/*if(process.env.NODE_ENV === 'production') {
  app.use(express.static(this.path.join(__dirname, 'client/dist')));
  app.get('*', (req, res)=> {
    res.sendFile(this.path.join(__dirname, 'client/dist/index.html'));
  })
}*/

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;