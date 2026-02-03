const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firebaseUid: {
        type: String,
        required: [true, 'Firebase UID is required'],
        unique: true,
        index: true
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    photoURL: {
        type: String,
        default: null
    },
    provider: {
        type: String,
        enum: ['password', 'google.com'],
        default: 'password'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);

