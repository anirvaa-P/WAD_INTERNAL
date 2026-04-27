const jwt = require('jsonwebtoken');

// This is the secret key used to sign and verify tokens
// In real apps, store this in a .env file, never hardcode it
const SECRET_KEY = 'student_api_secret_123';

const verifyToken = (req, res, next) => {
  // Token is sent in the request headers like:
  // Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

  const authHeader = req.headers['authorization'];

  // Check if Authorization header exists
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: '❌ Access Denied! No token provided. Please login first.'
    });
  }

  // Header format is "Bearer <token>" — we split and take the token part
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: '❌ Token missing! Format should be: Bearer <token>'
    });
  }

  try {
    // Verify the token using our secret key
    const decoded = jwt.verify(token, SECRET_KEY);

    // Attach the decoded user info to the request
    // So controllers can access who is making the request
    req.user = decoded;

    // Call next() to move on to the actual route handler
    next();

  } catch (error) {
    // Token is invalid or expired
    return res.status(403).json({
      success: false,
      message: '❌ Invalid or expired token! Please login again.'
    });
  }
};

module.exports = { verifyToken, SECRET_KEY };