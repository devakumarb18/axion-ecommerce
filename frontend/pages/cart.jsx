import { useCart } from '../context/CartContext';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import toast, { Toaster } from 'react-hot-toast';

export default function Cart() {
    const router = useRouter();
    const { cart, updateQuantity, removeFromCart, getCartTotal, getCartCount } = useCart();

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity < 1) return;
        updateQuantity(productId, newQuantity);
        toast.success('Quantity updated', {
            duration: 1500,
            position: 'top-center',
        });
    };

    const handleRemove = (productId, productName) => {
        removeFromCart(productId);
        toast.success(`${productName} removed from cart`, {
            duration: 2000,
            position: 'top-center',
        });
    };

    const subtotal = getCartTotal();
    const deliveryCharges = subtotal > 50000 ? 0 : 500;
    const total = subtotal + deliveryCharges;

    if (cart.length === 0) {
        return (
            <>
                <Head>
                    <title>Your Cart - AXION Helmets</title>
                </Head>
                <Navbar />
                <div className="min-h-screen bg-brand-white flex items-center justify-center py-20">
                    <div className="text-center">
                        <div className="mb-8">
                            <svg className="w-32 h-32 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-brand-black mb-4">Your cart is empty</h2>
                        <p className="text-gray-600 mb-8">Start shopping with AXION.</p>
                        <Link href="/#products">
                            <span className="bg-brand-red text-white px-8 py-3 font-bold uppercase tracking-wider hover:bg-brand-black transition-colors cursor-pointer inline-block">
                                Continue Shopping
                            </span>
                        </Link>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Head>
                <title>Your Cart ({getCartCount()} items) - AXION Helmets</title>
            </Head>
            <Toaster />
            <Navbar />

            <div className="min-h-screen bg-brand-white py-12">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-extrabold text-brand-black mb-2">Your Shopping Cart</h1>
                        <p className="text-gray-600">{getCartCount()} {getCartCount() === 1 ? 'item' : 'items'} in your cart</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cart.map((item) => (
                                <div key={item.id} className="bg-white rounded-lg shadow-md p-6 flex gap-6">
                                    {/* Product Image */}
                                    <div className="w-32 h-32 flex-shrink-0 bg-gray-50 rounded-lg flex items-center justify-center">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={120}
                                            height={120}
                                            className="object-contain"
                                        />
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-brand-black mb-1">{item.name}</h3>
                                        <p className="text-gray-600 text-sm mb-3">{item.category}</p>
                                        <div className="text-2xl font-extrabold text-brand-red mb-4">{item.price}</div>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center border-2 border-gray-300 rounded-lg">
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                    className="px-4 py-2 text-xl font-bold hover:bg-gray-100 transition-colors"
                                                >
                                                    −
                                                </button>
                                                <span className="px-6 py-2 font-bold text-lg border-x-2 border-gray-300">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                    className="px-4 py-2 text-xl font-bold hover:bg-gray-100 transition-colors"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => handleRemove(item.id, item.name)}
                                                className="text-brand-red font-bold hover:text-red-700 transition-colors"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>

                                    {/* Item Subtotal */}
                                    <div className="text-right">
                                        <p className="text-sm text-gray-600 mb-1">Subtotal</p>
                                        <p className="text-xl font-bold text-brand-black">
                                            ₹{(parseFloat(item.price.replace(/[₹,]/g, '')) * item.quantity).toLocaleString('en-IN')}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Cart Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                                <h2 className="text-2xl font-bold text-brand-black mb-6">Order Summary</h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-700">
                                        <span>Subtotal</span>
                                        <span className="font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-700">
                                        <span>Delivery Charges</span>
                                        <span className="font-semibold">
                                            {deliveryCharges === 0 ? (
                                                <span className="text-green-600">FREE</span>
                                            ) : (
                                                `₹${deliveryCharges}`
                                            )}
                                        </span>
                                    </div>
                                    {subtotal < 50000 && (
                                        <p className="text-xs text-gray-500">
                                            Add ₹{(50000 - subtotal).toLocaleString('en-IN')} more for FREE delivery
                                        </p>
                                    )}
                                    <div className="border-t-2 border-gray-200 pt-4">
                                        <div className="flex justify-between text-xl font-bold text-brand-black">
                                            <span>Total</span>
                                            <span>₹{total.toLocaleString('en-IN')}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-xs text-gray-500 mb-6 flex items-start gap-2">
                                    <svg className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>All payments are 100% secure and encrypted</span>
                                </div>

                                <button
                                    onClick={() => router.push('/checkout')}
                                    className="w-full bg-brand-red text-white py-4 font-bold uppercase tracking-wider hover:bg-brand-black transition-colors mb-3"
                                >
                                    Proceed to Checkout
                                </button>

                                <Link href="/#products">
                                    <span className="block w-full text-center border-2 border-brand-black text-brand-black py-4 font-bold uppercase tracking-wider hover:bg-brand-black hover:text-white transition-colors cursor-pointer">
                                        Continue Shopping
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
