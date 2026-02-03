// Firebase Client Configuration
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAORIuSF0gqsvYeJNH2iBCYd8egdrHp1d0",
    authDomain: "axion-helmets-61846.firebaseapp.com",
    projectId: "axion-helmets-61846",
    storageBucket: "axion-helmets-61846.firebasestorage.app",
    messagingSenderId: "213847423136",
    appId: "1:213847423136:web:e23ffaf3fafc6b15ab31c5",
    measurementId: "G-1BS5ZR4R8T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

export default app;
