const express = require('express');
const router = express.Router();
const { verifyAndSyncUser, getMe } = require('../controllers/firebaseAuthController');
const { register, login } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Verify Firebase token and sync user with MongoDB
router.post('/verify-token', verifyAndSyncUser);

// Standard Auth Routes
router.post('/register', register);
router.post('/login', login);

// Get current user
router.get('/me', protect, getMe);

module.exports = router;

