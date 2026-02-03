import { createContext, useContext, useState, useEffect } from 'react';
import {
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase-config';
import api from '../lib/api'; // Use centralized API client

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [firebaseUser, setFirebaseUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Sync Firebase user with backend
    const syncUserWithBackend = async (firebaseUser) => {
        try {
            const idToken = await firebaseUser.getIdToken();

            // Use api.post instead of direct axios call
            const response = await api.post('/auth/verify-token', { idToken });

            if (response.data.success) {
                setUser(response.data.user);
                // Store token for API calls
                localStorage.setItem('firebase-token', idToken);
                return response.data.user;
            }
        } catch (error) {
            console.error('Error syncing user with backend:', error);
            throw error;
        }
    };

    // Listen to Firebase auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setFirebaseUser(firebaseUser);

            if (firebaseUser) {
                try {
                    await syncUserWithBackend(firebaseUser);
                } catch (error) {
                    console.error('Failed to sync user:', error);
                }
            } else {
                setUser(null);
                localStorage.removeItem('firebase-token');
            }

            setLoading(false);
        });

        return unsubscribe;
    }, []);

    // Sign in with Google
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log('Google Sign-In successful, syncing with backend...', result.user);
            const user = await syncUserWithBackend(result.user);
            return { success: true, user };
        } catch (error) {
            console.error('Google sign-in error:', error);
            throw error;
        }
    };

    // Sign up with email and password
    const signUpWithEmail = async (email, password, name) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);

            // Update display name
            await updateProfile(result.user, { displayName: name });

            // Force refresh to get updated token with display name
            await result.user.reload();

            const user = await syncUserWithBackend(result.user);
            return { success: true, user };
        } catch (error) {
            console.error('Email sign-up error:', error);
            throw error;
        }
    };

    // Sign in with email and password
    const signInWithEmail = async (email, password) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            const user = await syncUserWithBackend(result.user);
            return { success: true, user };
        } catch (error) {
            console.error('Email sign-in error:', error);
            throw error;
        }
    };

    // Logout
    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            setFirebaseUser(null);
            localStorage.removeItem('firebase-token');
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    };

    // Get current Firebase token
    const getToken = async () => {
        if (firebaseUser) {
            return await firebaseUser.getIdToken();
        }
        return null;
    };

    return (
        <AuthContext.Provider value={{
            user,
            firebaseUser,
            loading,
            signInWithGoogle,
            signUpWithEmail,
            signInWithEmail,
            logout,
            getToken
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

