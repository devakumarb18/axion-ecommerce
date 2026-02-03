import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../lib/api';

export default function Checkout() {
    const router = useRouter();
    const { cart, clearCart, buyNowItem, clearBuyNow } = useCart();
    const { user } = useAuth();

    // Determine which items to checkout (Buy Now item takes precedence)
    const checkoutItems = buyNowItem ? [buyNowItem] : cart;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        fullName: user?.name || '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
        phone: '',
        paymentMethod: 'card'
    });

    // Calculate prices
    // Calculate prices
    const itemsPrice = checkoutItems.reduce((sum, item) => {
        const price = parseFloat(item.price.replace(/[₹,]/g, ''));
        return sum + (price * item.quantity);
    }, 0);
    const taxPrice = itemsPrice * 0.1;
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const totalPrice = itemsPrice + taxPrice + shippingPrice;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const detectLocation = async () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser. Using IP-based location.');
            detectLocationByIP();
            return;
        }

        const confirmPermission = confirm("Allow access to your location for faster delivery?");
        if (!confirmPermission) {
            detectLocationByIP();
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    // Method 1: Browser Geolocation + OpenStreetMap Reverse Geocoding
                    const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                    const address = response.data.address;

                    setFormData(prev => ({
                        ...prev,
                        city: address.city || address.town || address.village || '',
                        postalCode: address.postcode || '',
                        country: address.country || '',
                        address: [address.road, address.suburb, address.neighbourhood].filter(Boolean).join(', ')
                    }));
                } catch (error) {
                    console.error("Geocoding failed, falling back to IP location", error);
                    detectLocationByIP();
                }
            },
            (error) => {
                console.warn("Location permission denied or error. Falling back to IP location.", error);
                detectLocationByIP();
            }
        );
    };

    const detectLocationByIP = async () => {
        try {
            // Method 2: IP-Based Location
            const response = await axios.get('https://ipapi.co/json/');
            const data = response.data;

            setFormData(prev => ({
                ...prev,
                city: data.city || '',
                postalCode: data.postal || '',
                country: data.country_name || '',
                // Address cannot be accurately detected by IP, leaving it for user to fill
            }));
        } catch (error) {
            console.error("IP Location failed", error);
            // Fail silently or show a toast
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError('Please login to place an order');
            router.push('/login');
            return;
        }

        if (checkoutItems.length === 0) {
            setError('Your cart is empty');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const orderData = {
                items: checkoutItems.map(item => ({
                    product: item._id || item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image
                })),
                shippingAddress: {
                    fullName: formData.fullName,
                    address: formData.address,
                    city: formData.city,
                    postalCode: formData.postalCode,
                    country: formData.country,
                    phone: formData.phone
                },
                paymentMethod: formData.paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice
            };

            const response = await orderAPI.create(orderData);

            // Clear cart and redirect to success page
            // Clear cart/buyNow and redirect to success page
            if (buyNowItem) {
                clearBuyNow();
            } else {
                clearCart();
            }
            router.push(`/order-success?orderId=${response.data.data._id}`);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Please Login</h2>
                    <Link href="/login">
                        <button className="bg-axion-red text-white px-6 py-3 rounded-md font-bold">
                            Go to Login
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    if (checkoutItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="pt-24 pb-12 text-center">
                    <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                    <Link href="/">
                        <button className="bg-axion-red text-white px-6 py-3 rounded-md font-bold">
                            Continue Shopping
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Head>
                <title>Checkout - Axion Helmets</title>
            </Head>

            <Navbar />

            <main className="pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold mb-8 text-black">Checkout</h1>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Checkout Form */}
                        <div className="lg:col-span-2">
                            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-2xl font-bold text-black">Shipping Information</h2>
                                        <button
                                            type="button"
                                            onClick={detectLocation}
                                            className="text-sm text-axion-red font-semibold hover:text-red-700 flex items-center gap-2"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                            </svg>
                                            Detect My Location
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                required
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-axion-red focus:border-axion-red"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Address *
                                            </label>
                                            <input
                                                type="text"
                                                name="address"
                                                required
                                                value={formData.address}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-axion-red focus:border-axion-red"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                City *
                                            </label>
                                            <input
                                                type="text"
                                                name="city"
                                                required
                                                value={formData.city}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-axion-red focus:border-axion-red"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Postal Code *
                                            </label>
                                            <input
                                                type="text"
                                                name="postalCode"
                                                required
                                                value={formData.postalCode}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-axion-red focus:border-axion-red"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Country *
                                            </label>
                                            <input
                                                type="text"
                                                name="country"
                                                required
                                                value={formData.country}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-axion-red focus:border-axion-red"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Phone *
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                required
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-axion-red focus:border-axion-red"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-2xl font-bold mb-4 text-black">Payment Method</h2>

                                    <div className="space-y-3">
                                        {/* UPI Option */}
                                        <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${formData.paymentMethod === 'upi' ? 'border-axion-red bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="upi"
                                                checked={formData.paymentMethod === 'upi'}
                                                onChange={handleChange}
                                                className="w-5 h-5 text-axion-red focus:ring-axion-red"
                                            />
                                            <div className="ml-4 flex-1">
                                                <span className="block font-semibold text-gray-800">UPI (Google Pay / PhonePe / Paytm)</span>
                                                <span className="text-xs text-gray-500">Pay using any UPI app</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/2560px-Google_Pay_Logo.svg.png" alt="GPay" className="h-4 object-contain" />
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/PhonePe_Logo.svg/1200px-PhonePe_Logo.svg.png" alt="PhonePe" className="h-4 object-contain" />
                                            </div>
                                        </label>

                                        {/* Card Option */}
                                        <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${formData.paymentMethod === 'card' ? 'border-axion-red bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="card"
                                                checked={formData.paymentMethod === 'card'}
                                                onChange={handleChange}
                                                className="w-5 h-5 text-axion-red focus:ring-axion-red"
                                            />
                                            <div className="ml-4 flex-1">
                                                <span className="block font-semibold text-gray-800">Credit / Debit / ATM Card</span>
                                                <span className="text-xs text-gray-500">Visa, Mastercard, RuPay, Maestro</span>
                                            </div>
                                        </label>

                                        {/* Net Banking */}
                                        <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${formData.paymentMethod === 'netbanking' ? 'border-axion-red bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="netbanking"
                                                checked={formData.paymentMethod === 'netbanking'}
                                                onChange={handleChange}
                                                className="w-5 h-5 text-axion-red focus:ring-axion-red"
                                            />
                                            <div className="ml-4">
                                                <span className="block font-semibold text-gray-800">Net Banking</span>
                                                <span className="text-xs text-gray-500">All Indian banks supported</span>
                                            </div>
                                        </label>

                                        {/* COD Option */}
                                        <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${formData.paymentMethod === 'cod' ? 'border-axion-red bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="cod"
                                                checked={formData.paymentMethod === 'cod'}
                                                onChange={handleChange}
                                                className="w-5 h-5 text-axion-red focus:ring-axion-red"
                                            />
                                            <div className="ml-4">
                                                <span className="block font-semibold text-gray-800">Cash on Delivery</span>
                                                <span className="text-xs text-gray-500">Pay cash at your doorstep</span>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-axion-red text-white py-3 rounded-md font-bold uppercase hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Processing...' : 'Place Order'}
                                </button>
                            </form>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                                <h2 className="text-2xl font-bold mb-4 text-black">Order Summary</h2>

                                <div className="space-y-3 mb-4">
                                    {checkoutItems.map((item) => (
                                        <div key={item.id} className="flex justify-between text-sm">
                                            <span className="text-gray-600">{item.name} x {item.quantity}</span>
                                            <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t pt-3 space-y-2 mb-4">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span>₹{itemsPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Tax (10%)</span>
                                        <span>₹{taxPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span>{shippingPrice === 0 ? 'FREE' : `₹${shippingPrice.toFixed(2)}`}</span>
                                    </div>
                                </div>

                                <div className="border-t pt-3 flex justify-between text-xl font-bold text-black">
                                    <span>Total</span>
                                    <span className="text-axion-red">₹{totalPrice.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
