const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
require('dotenv').config();
const WebSocket = require('ws');
const http = require('http');
const productRoutes = require('./routes/productRoutes');

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
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          console.log('User not found, creating new user');
          user = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            password: null,
          });
          await user.save();
          console.log('New user created:', user);
        } else {
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
  done(null, { user: userObj.user, token: userObj.token });
});

passport.deserializeUser((userObj, done) => {
  jwt.verify(userObj.token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('JWT verify error:', err);
      return done(err, null);
    }
    const User = require('./models/User');
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
app.use('/api/product',productRoutes);
// Health Check
app.get('/', (req, res) => res.send('API is running'));

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// Create HTTP server and WebSocket server
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Store connected clients with their user info
const clients = new Map(); // Map<ws, { userId: string, googleId: string }>

// WebSocket connection handling
wss.on('connection', (ws, req) => {
  console.log('New WebSocket connection established');

  // Authenticate WebSocket connection using JWT
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

    const User = require('./models/User');
    try {
      const user = await User.findById(decoded.id);
      if (!user) {
        ws.send(JSON.stringify({ error: 'User not found' }));
        ws.close();
        return;
      }

      // Store client info
      clients.set(ws, { userId: user._id.toString(), googleId: user.googleId });
      console.log(`Client authenticated: ${user.name} (${user.googleId})`);

      // Send welcome message
      ws.send(JSON.stringify({
        type: 'welcome',
        message: `Welcome, ${user.name}! Connected to WebSocket server`,
      }));

      // Handle incoming messages
      ws.on('message', (message) => {
        try {
          const parsedMessage = JSON.parse(message);
          console.log('Received message:', parsedMessage);

          const clientInfo = clients.get(ws);

          // Broadcast message to all connected clients
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({
                type: 'chat',
                sender: {
                  userId: clientInfo.userId,
                  name: user.name,
                  googleId: clientInfo.googleId,
                },
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

      // Handle disconnection
      ws.on('close', () => {
        clients.delete(ws);
        console.log(`Client disconnected: ${user.name} (${user.googleId})`);
      });

      // Handle errors
      ws.on('error', (error) => {
        console.error('WebSocket error:', error);
      });
    } catch (error) {
      console.error('Error verifying user:', error);
      ws.close();
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`WebSocket server running on ws://localhost:${PORT}`);
});

module.exports = app;