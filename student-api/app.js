const express = require('express');
const app = express();

// ─────────────────────────────────────────
// MIDDLEWARE
// ─────────────────────────────────────────
// Allows Express to parse incoming JSON request bodies
app.use(express.json());

// ─────────────────────────────────────────
// ROUTES
// ─────────────────────────────────────────
const studentRoutes = require('./routes/studentRoutes');
const authRoutes    = require('./routes/authRoutes');

// Public routes — no token needed
// Register and Login are accessible without authentication
app.use('/api/auth', authRoutes);

// Protected routes — token required
// All /api/students routes are guarded by JWT middleware
app.use('/api/students', studentRoutes);

// Root route — just to confirm server is running
app.get('/', (req, res) => {
  res.send('🎓 Student API with JWT Auth is running!');
});

// ─────────────────────────────────────────
// HANDLE UNKNOWN ROUTES (404)
// ─────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// ─────────────────────────────────────────
// START SERVER
// ─────────────────────────────────────────
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  console.log(`🔓 Auth  routes → http://localhost:${PORT}/api/auth`);
  console.log(`🔒 Student routes → http://localhost:${PORT}/api/students`);
});