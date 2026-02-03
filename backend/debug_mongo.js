const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/axion-helmets';

console.log('Testing MongoDB connection...');
mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
    .then(() => {
        console.log('✅ Connected to MongoDB successfully');
        process.exit(0);
    })
    .catch(err => {
        console.error('❌ Failed to connect to MongoDB:', err.message);
        process.exit(1);
    });
