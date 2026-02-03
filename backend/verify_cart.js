const axios = require('axios');
const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, 'verification_log.txt');
const BASE_URL = 'http://localhost:5003/api';

function log(msg) {
    console.log(msg);
    fs.appendFileSync(LOG_FILE, msg + '\n');
}

// Clear log file
fs.writeFileSync(LOG_FILE, '');

async function test() {
    log('🚀 Starting Cart Verification v2...');

    try {
        // 0. Check Server
        log('0. Checking Server Root...');
        try {
            let rootRes = await axios.get('http://localhost:5003/');
            log(`Server Root: ${JSON.stringify(rootRes.data)}`);
            let apiRes = await axios.get('http://localhost:5003/api');
            log(`API Root: ${JSON.stringify(apiRes.data)}`);
        } catch (e) {
            log(`Server check failed: ${e.message}`);
        }

        // 1. Register User
        const email = `cart_test_${Date.now()}@example.com`;
        const password = 'password123';

        log('\n1. Registering User...');
        let token = '';

        try {
            let res = await axios.post(`${BASE_URL}/auth/register`, { name: 'Cart Tester', email, password });
            token = res.data.token;
            log('✅ Registration successful');
        } catch (error) {
            log('Registration error caught');
            if (error.response) {
                log(`Response status: ${error.response.status}`);
                log(`Response data: ${JSON.stringify(error.response.data)}`);

                if (error.response.data.message === 'User already exists') {
                    log('   Logging in instead...');
                    let res = await axios.post(`${BASE_URL}/auth/login`, { email, password });
                    token = res.data.token;
                    log('✅ Login successful');
                } else {
                    throw error;
                }
            } else {
                log('No response in error');
                throw error;
            }
        }

        const authHeader = { headers: { 'Authorization': `Bearer ${token}` } };

        // ... rest of the script (truncated for brevity since we failed early)
        // I'll just put a simple check next

        log('Token obtained. Proceeding to Cart check...');

        // 4. Get Cart (Skip product creation for a moment to isolate issue)
        log('\n4. Getting Cart...');
        try {
            let getRes = await axios.get(`${BASE_URL}/cart`, authHeader);
            log(`✅ Cart retrieved with status: ${getRes.status}`);
        } catch (e) {
            log(`❌ Get Cart failed: ${e.message}`);
        }

    } catch (error) {
        log(`❌ Test failed details:`);
        log(JSON.stringify(error, Object.getOwnPropertyNames(error)));
        if (error.response) {
            log(`Response Data: ${JSON.stringify(error.response.data)}`);
        }
        process.exit(1);
    }
}

test();
