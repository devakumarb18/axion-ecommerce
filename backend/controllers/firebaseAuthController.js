const User = require('../models/User');
const { verifyIdToken } = require('../utils/firebaseTokenVerifier');

const fs = require('fs');

// @desc    Verify Firebase token and sync user with MongoDB
// @route   POST /api/auth/verify-token
// @access  Public
exports.verifyAndSyncUser = async (req, res) => {
    try {
        const { idToken } = req.body;

        console.log('Received verify-token request');
        fs.appendFileSync('auth_debug.log', `[${new Date().toISOString()}] Attempting Google Login...\n`);

        if (!idToken) {
            fs.appendFileSync('auth_debug.log', `[${new Date().toISOString()}] Error: No ID Token provided\n`);
            return res.status(400).json({
                success: false,
                message: 'ID token is required'
            });
        }

        // Verify the Firebase ID token using REST API
        const decodedToken = await verifyIdToken(idToken);
        const { uid, email, name, picture, firebase } = decodedToken;

        fs.appendFileSync('auth_debug.log', `[${new Date().toISOString()}] Token Verified. UID: ${uid}, Email: ${email}\n`);

        // Determine provider (google.com or password)
        const provider = firebase.sign_in_provider || 'password';

        // Find or create user in MongoDB
        let user = await User.findOne({ firebaseUid: uid });

        if (!user) {
            fs.appendFileSync('auth_debug.log', `[${new Date().toISOString()}] User not found in DB. Creating new user...\n`);
            // Create new user
            user = await User.create({
                firebaseUid: uid,
                email: email,
                name: name || email.split('@')[0],
                photoURL: picture || null,
                provider: provider,
                role: 'user'
            });
            console.log('✅ New user created:', user.email);
            fs.appendFileSync('auth_debug.log', `[${new Date().toISOString()}] New User Created ID: ${user._id}\n`);
        } else {
            fs.appendFileSync('auth_debug.log', `[${new Date().toISOString()}] User found in DB. Updating...\n`);
            // Update existing user info if changed
            let updated = false;
            if (user.name !== name && name) {
                user.name = name;
                updated = true;
            }
            if (user.photoURL !== picture && picture) {
                user.photoURL = picture;
                updated = true;
            }
            if (updated) {
                await user.save();
                console.log('✅ User updated:', user.email);
            }
        }

        res.status(200).json({
            success: true,
            message: 'User verified and synced',
            user: {
                id: user._id,
                firebaseUid: user.firebaseUid,
                name: user.name,
                email: user.email,
                role: user.role,
                photoURL: user.photoURL,
                provider: user.provider
            }
        });
    } catch (error) {
        console.error('❌ Token verification error:', error);
        fs.appendFileSync('auth_debug.log', `[${new Date().toISOString()}] EXCEPTION: ${error.message}\n`);
        if (error.response) {
            fs.appendFileSync('auth_debug.log', `[${new Date().toISOString()}] API RESPONSE: ${JSON.stringify(error.response.data)}\n`);
        }
        res.status(401).json({
            success: false,
            message: 'Invalid or expired token',
            error: error.message
        });
    }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                firebaseUid: user.firebaseUid,
                name: user.name,
                email: user.email,
                role: user.role,
                photoURL: user.photoURL,
                provider: user.provider
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to get user',
            error: error.message
        });
    }
};
