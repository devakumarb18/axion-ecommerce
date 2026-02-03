import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { useAuth } from '../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';

export default function Login() {
    const router = useRouter();
    const { signInWithEmail, signInWithGoogle } = useAuth();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await signInWithEmail(formData.email, formData.password);

            toast.success(`Welcome back, ${result.user.name}!`, {
                duration: 3000,
                position: 'top-center',
                style: {
                    background: '#10B981',
                    color: '#fff',
                    fontWeight: 'bold',
                },
            });

            setTimeout(() => {
                router.push('/');
            }, 500);
        } catch (err) {
            console.error('Login Error:', err);

            let errorMessage = 'Login failed. Please try again.';
            if (err.code === 'auth/user-not-found') {
                errorMessage = 'No account found with this email.';
            } else if (err.code === 'auth/wrong-password') {
                errorMessage = 'Incorrect password.';
            } else if (err.code === 'auth/invalid-email') {
                errorMessage = 'Invalid email address.';
            } else if (err.code === 'auth/invalid-credential') {
                errorMessage = 'Invalid email or password.';
            }

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError('');
        setLoading(true);

        try {
            const result = await signInWithGoogle();

            toast.success(`Welcome, ${result.user.name}!`, {
                duration: 3000,
                position: 'top-center',
                style: {
                    background: '#10B981',
                    color: '#fff',
                    fontWeight: 'bold',
                },
            });

            setTimeout(() => {
                router.push('/');
            }, 500);
        } catch (err) {
            console.error('Google Login Error:', err);

            let errorMessage = 'Google sign-in failed. Please try again.';
            if (err.code === 'auth/popup-closed-by-user') {
                errorMessage = 'Sign-in cancelled.';
            } else if (err.code === 'auth/popup-blocked') {
                errorMessage = 'Popup blocked. Please allow popups for this site.';
            } else if (err.response && err.response.data && err.response.data.message) {
                errorMessage = `Server Error: ${err.response.data.message}`;
            } else if (err.message) {
                errorMessage = `Error: ${err.message}`;
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
                    <title>Login - AXION Helmets</title>
                </Head>

                {/* Left Side - Image */}
                <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-brand-red to-red-800 items-center justify-center p-12 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black opacity-10"></div>
                    <div className="relative z-10 text-center">
                        <h1 className="text-6xl font-extrabold text-white mb-6">AXION</h1>
                        <p className="text-xl text-white mb-12">Where Safety Meets Innovation</p>
                        <div className="relative w-96 h-96 mx-auto">
                            <Image
                                src="/helmet-black.png"
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
                                Sign in to your account
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
                                onClick={handleGoogleLogin}
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
                                    <span className="px-2 bg-white text-gray-500">Or continue with email</span>
                                </div>
                            </div>

                            <form onSubmit={handleEmailLogin} className="space-y-4">
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
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-brand-red hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-red disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider shadow-lg"
                                    >
                                        {loading ? 'Signing in...' : 'Sign In'}
                                    </button>
                                </div>
                            </form>

                            <div className="text-center text-sm">
                                <span className="text-gray-600">Don't have an account? </span>
                                <Link href="/register" className="font-medium text-brand-red hover:text-red-700">
                                    Sign up
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
