const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
require('dotenv').config();
const WebSocket = require('ws');
const http = require('http');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const User = require('./models/User');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(passport.initialize());
app.use(cookieParser());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Passport Google Strategy
passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.API_URL || 'http://localhost:3000'}/api/auth/google/callback`,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ googleId: profile.id });

      if (!user) {
        user = new User({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          password: null,
        });
        await user.save();
      }

      const token = jwt.sign({ id: user._id, googleId: user.googleId }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      return done(null, { user, token });
    } catch (err) {
      console.error('Error during Google OAuth:', err);
      return done(err, null);
    }
  }
));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);

// WebSocket Setup
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const clients = new Map();

wss.on('connection', (ws, req) => {
  console.log('New WebSocket connection established');

  const token = new URLSearchParams(req.url.split('?')[1]).get('token');

  if (!token) {
    ws.send(JSON.stringify({ error: 'Authentication required' }));
    ws.close();
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      ws.send(JSON.stringify({ error: 'Invalid token' }));
      ws.close();
      return;
    }

    try {
      const user = await User.findById(decoded.id);
      if (!user) {
        ws.send(JSON.stringify({ error: 'User not found' }));
        ws.close();
        return;
      }

      clients.set(ws, { userId: user._id.toString(), googleId: user.googleId });

      ws.send(JSON.stringify({ type: 'welcome', message: `Welcome, ${user.name}!` }));

      ws.on('message', (message) => {
        try {
          const parsedMessage = JSON.parse(message);

          wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({
                type: 'chat',
                sender: { userId: decoded.id, name: user.name },
                message: parsedMessage.message,
                timestamp: new Date().toISOString(),
              }));
            }
          });
        } catch (error) {
          console.error('Error parsing message:', error);
          ws.send(JSON.stringify({ error: 'Invalid message format' }));
        }
      });

      ws.on('close', () => clients.delete(ws));
    } catch (error) {
      console.error('Error verifying user:', error);
      ws.close();
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
