const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
let app;
let auth;

try {
    // Check if already initialized
    if (admin.apps.length === 0) {
        // Try to initialize with service account if available
        // Otherwise, use Application Default Credentials (ADC)
        const initConfig = {
            projectId: 'axion-helmets-61846',
        };

        // For development: Firebase Admin SDK can verify tokens using public keys
        // without needing a service account, as long as projectId is set
        app = admin.initializeApp(initConfig);
        console.log('✅ Firebase Admin initialized successfully');
        console.log('📍 Project ID:', 'axion-helmets-61846');
    } else {
        app = admin.apps[0];
        console.log('✅ Firebase Admin already initialized');
    }

    auth = admin.auth(app);
    console.log('✅ Firebase Auth ready for token verification');
} catch (error) {
    console.error('❌ Firebase Admin initialization error:', error.message);
    console.error('Full error:', error);

    // Fallback: try to get auth anyway
    try {
        auth = admin.auth();
        console.log('⚠️  Using fallback auth initialization');
    } catch (authError) {
        console.error('❌ Firebase Auth initialization error:', authError.message);
        throw new Error('Failed to initialize Firebase Admin SDK. Please check your configuration.');
    }
}

module.exports = { admin, auth };
