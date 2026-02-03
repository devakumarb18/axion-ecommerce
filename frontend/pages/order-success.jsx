import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { FaCheckCircle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../lib/api';

export default function OrderSuccess() {
    const router = useRouter();
    const { orderId } = router.query;
    const { user } = useAuth();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (orderId && user) {
            fetchOrder();
        }
    }, [orderId, user]);

    const fetchOrder = async () => {
        try {
            const response = await orderAPI.getById(orderId);
            setOrder(response.data.data);
        } catch (error) {
            console.error('Error fetching order:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-axion-red mb-4"></div>
                    <p className="text-gray-600">Loading order details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
            <Head>
                <title>Order Confirmed - Axion Helmets</title>
            </Head>

            <div className="max-w-2xl w-full">
                <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                    {/* Success Icon */}
                    <div className="mb-6">
                        <FaCheckCircle className="text-green-500 text-6xl mx-auto" />
                    </div>

                    {/* Success Message */}
                    <h1 className="text-3xl font-bold text-black mb-2">Order Placed Successfully!</h1>
                    <p className="text-gray-600 mb-8">
                        Thank you for your purchase. Your order has been confirmed.
                    </p>

                    {/* Order Details */}
                    {order && (
                        <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                            <h2 className="text-xl font-bold text-black mb-4">Order Details</h2>

                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Order ID:</span>
                                    <span className="font-mono font-medium">{order._id}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Order Date:</span>
                                    <span className="font-medium">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Payment Method:</span>
                                    <span className="font-medium capitalize">{order.paymentMethod}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Status:</span>
                                    <span className="font-medium capitalize text-yellow-600">{order.status}</span>
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <h3 className="font-bold text-black mb-3">Items Ordered:</h3>
                                <div className="space-y-2">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="flex justify-between text-sm">
                                            <span className="text-gray-600">
                                                {item.name} x {item.quantity}
                                            </span>
                                            <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="border-t mt-4 pt-4">
                                <div className="flex justify-between text-lg font-bold text-black">
                                    <span>Total Paid:</span>
                                    <span className="text-axion-red">₹{order.totalPrice.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="border-t mt-4 pt-4">
                                <h3 className="font-bold text-black mb-2">Shipping Address:</h3>
                                <p className="text-gray-600 text-sm">
                                    {order.shippingAddress.fullName}<br />
                                    {order.shippingAddress.address}<br />
                                    {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br />
                                    {order.shippingAddress.country}<br />
                                    Phone: {order.shippingAddress.phone}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/">
                            <button className="bg-axion-red text-white px-8 py-3 rounded-md font-bold uppercase hover:bg-red-700 transition-colors">
                                Continue Shopping
                            </button>
                        </Link>
                        <Link href="/orders">
                            <button className="bg-gray-200 text-black px-8 py-3 rounded-md font-bold uppercase hover:bg-gray-300 transition-colors">
                                View My Orders
                            </button>
                        </Link>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-8 text-sm text-gray-500">
                        <p>A confirmation email has been sent to your registered email address.</p>
                        <p className="mt-2">You can track your order status in the "My Orders" section.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
