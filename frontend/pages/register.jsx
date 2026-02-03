import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { useAuth } from '../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';

export default function Register() {
    const router = useRouter();
    const { signUpWithEmail, signInWithGoogle } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEmailRegister = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validate password length
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            setLoading(false);
            return;
        }

        // Validate confirm password
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const result = await signUpWithEmail(formData.email, formData.password, formData.name);

            // Show success toast
            toast.success('Account created successfully!', {
                duration: 2000,
                position: 'top-center',
                style: {
                    background: '#10B981',
                    color: '#fff',
                    fontWeight: 'bold',
                },
            });

            // Show welcome message
            setTimeout(() => {
                toast.success(`Welcome, ${result.user.name}!`, {
                    duration: 3000,
                    position: 'top-center',
                });
            }, 500);

            // Redirect to home
            setTimeout(() => {
                router.push('/');
            }, 1000);

        } catch (err) {
            console.error('Registration Error:', err);

            let errorMessage = 'Registration failed. Please try again.';
            if (err.code === 'auth/email-already-in-use') {
                errorMessage = 'An account with this email already exists.';
            } else if (err.code === 'auth/invalid-email') {
                errorMessage = 'Invalid email address.';
            } else if (err.code === 'auth/weak-password') {
                errorMessage = 'Password is too weak. Please use a stronger password.';
            }

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleRegister = async () => {
        setError('');
        setLoading(true);

        try {
            const result = await signInWithGoogle();

            toast.success('Account created successfully!', {
                duration: 2000,
                position: 'top-center',
                style: {
                    background: '#10B981',
                    color: '#fff',
                    fontWeight: 'bold',
                },
            });

            setTimeout(() => {
                toast.success(`Welcome, ${result.user.name}!`, {
                    duration: 3000,
                    position: 'top-center',
                });
            }, 500);

            setTimeout(() => {
                router.push('/');
            }, 1000);
        } catch (err) {
            console.error('Google Registration Error:', err);

            let errorMessage = 'Google sign-in failed. Please try again.';
            if (err.code === 'auth/popup-closed-by-user') {
                errorMessage = 'Sign-in cancelled.';
            } else if (err.code === 'auth/popup-blocked') {
                errorMessage = 'Popup blocked. Please allow popups for this site.';
            }

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Toaster />
            <div className="min-h-screen bg-brand-white flex">
                <Head>
                    <title>Sign Up - AXION Helmets</title>
                </Head>

                {/* Left Side - Image */}
                <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-brand-black to-gray-900 items-center justify-center p-12 relative overflow-hidden">
                    <div className="absolute inset-0 bg-brand-red opacity-10"></div>
                    <div className="relative z-10 text-center">
                        <h1 className="text-6xl font-extrabold text-white mb-6">AXION</h1>
                        <p className="text-xl text-white mb-12">Join the Revolution in Safety</p>
                        <div className="relative w-96 h-96 mx-auto">
                            <Image
                                src="/helmet-white.png"
                                alt="AXION Helmet"
                                fill
                                className="object-contain drop-shadow-2xl"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full space-y-8">
                        <div>
                            <h2 className="mt-6 text-center text-4xl font-extrabold text-brand-black">
                                AXION
                            </h2>
                            <p className="mt-2 text-center text-sm text-gray-600">
                                Create your account
                            </p>
                        </div>

                        <div className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-md">
                            {error && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                                    {error}
                                </div>
                            )}

                            {/* Google Sign-In Button */}
                            <button
                                onClick={handleGoogleRegister}
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-red disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
                            >
                                <FcGoogle className="text-2xl" />
                                Continue with Google
                            </button>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or register with email</span>
                                </div>
                            </div>

                            <form onSubmit={handleEmailRegister} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-brand-red focus:border-brand-red focus:z-10 sm:text-sm"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-brand-red focus:border-brand-red focus:z-10 sm:text-sm"
                                        placeholder="you@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-brand-red focus:border-brand-red focus:z-10 sm:text-sm"
                                        placeholder="••••••••"
                                    />
                                    <p className="mt-1 text-xs text-gray-500">Must be at least 6 characters</p>
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                        Confirm Password
                                    </label>
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        required
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-brand-red focus:border-brand-red focus:z-10 sm:text-sm"
                                        placeholder="••••••••"
                                    />
                                    <p className="mt-1 text-xs text-gray-500">Re-enter your password for security</p>
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-brand-red hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-red disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider shadow-lg"
                                    >
                                        {loading ? 'Creating account...' : 'Create Account'}
                                    </button>
                                </div>
                            </form>

                            <div className="text-center text-sm">
                                <span className="text-gray-600">Already have an account? </span>
                                <Link href="/login" className="font-medium text-brand-red hover:text-red-700">
                                    Sign in
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
