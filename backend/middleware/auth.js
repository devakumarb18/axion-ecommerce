const User = require('../models/User');
const { verifyIdToken } = require('../utils/firebaseTokenVerifier');

const jwt = require('jsonwebtoken');

exports.protect = async (req, res, next) => {
    let token;

    // Check for token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized to access this route'
        });
    }

    try {
        // 1. Try Standard JWT (for local auth)
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id);
            if (req.user) {
                return next();
            }
        } catch (err) {
            // Ignore JWT error and proceed to Firebase check
        }

        // 2. Verify Firebase ID token using REST API
        const decodedToken = await verifyIdToken(token);

        // Get user from MongoDB by Firebase UID
        req.user = await User.findOne({ firebaseUid: decodedToken.uid });

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'User not found'
            });
        }

        next();
    } catch (error) {
        console.error('Auth middleware error:', error.message);
        return res.status(401).json({
            success: false,
            message: 'Not authorized to access this route',
            error: error.message
        });
    }
};

// Admin middleware
exports.admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({
            success: false,
            message: 'Access denied. Admin only.'
        });
    }
};
