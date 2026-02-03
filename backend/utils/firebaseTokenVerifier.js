const axios = require('axios');

/**
 * Verify Firebase ID token using Firebase REST API
 * This method doesn't require Firebase Admin SDK credentials
 * @param {string} idToken - The Firebase ID token to verify
 * @returns {Promise<Object>} - The decoded token payload
 */
async function verifyIdToken(idToken) {
    try {
        // Use Firebase's v1 endpoint to verify the token
        const response = await axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.FIREBASE_API_KEY || 'AIzaSyAORIuSF0gqsvYeJNH2iBCYd8egdrHp1d0'}`,
            {
                idToken: idToken
            }
        );

        if (response.data && response.data.users && response.data.users.length > 0) {
            const user = response.data.users[0];
            return {
                uid: user.localId,
                email: user.email,
                name: user.displayName || user.email.split('@')[0],
                picture: user.photoUrl || null,
                firebase: {
                    sign_in_provider: user.providerUserInfo && user.providerUserInfo.length > 0
                        ? user.providerUserInfo[0].providerId
                        : 'password'
                }
            };
        } else {
            throw new Error('Invalid token - no user data returned');
        }
    } catch (error) {
        console.error('Token verification error:', error.response?.data || error.message);
        throw new Error('Invalid or expired token');
    }
}

module.exports = { verifyIdToken };
