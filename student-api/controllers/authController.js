const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = require('../data/users');
const { SECRET_KEY } = require('../middleware/authMiddleware');

// ─────────────────────────────────────────
// REGISTER
// URL: POST /api/auth/register
// ─────────────────────────────────────────
const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both username and password'
      });
    }

    // Check if username already exists
    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Username already exists! Please choose another.'
      });
    }

    // Password must be at least 6 characters
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // Hash the password — never store plain text passwords!
    // 10 is the "salt rounds" — higher = more secure but slower
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user object
    const newUser = {
      id: users.length + 1,
      username,
      password: hashedPassword  // store hashed password
    };

    // Save to our "database"
    users.push(newUser);

    res.status(201).json({
      success: true,
      message: '✅ User registered successfully! You can now login.',
      data: {
        id: newUser.id,
        username: newUser.username
        // Never send password back, even hashed!
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: error.message
    });
  }
};

// ─────────────────────────────────────────
// LOGIN
// URL: POST /api/auth/login
// ─────────────────────────────────────────
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both username and password'
      });
    }

    // Check if user exists
    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: '❌ Invalid credentials! User not found.'
      });
    }

    // Compare entered password with hashed password in database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: '❌ Invalid credentials! Wrong password.'
      });
    }

    // Generate JWT token
    // This token contains user info and expires in 1 hour
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username
      },
      SECRET_KEY,
      { expiresIn: '1h' }  // token expires in 1 hour
    );

    res.status(200).json({
      success: true,
      message: '✅ Login successful!',
      token: token,  // send token to client — they must save this!
      expiresIn: '1 hour'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: error.message
    });
  }
};

module.exports = { register, login };
