const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// API routes
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Handle React routing (if using React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));