import { useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../lib/api';
import { useRouter } from 'next/router';

export default function Orders() {
    const router = useRouter();
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            router.push('/login');
            return;
        }
        fetchOrders();
    }, [user]);

    const fetchOrders = async () => {
        try {
            const response = await orderAPI.getMyOrders();
            setOrders(response.data.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: 'text-yellow-600 bg-yellow-100',
            processing: 'text-blue-600 bg-blue-100',
            shipped: 'text-purple-600 bg-purple-100',
            delivered: 'text-green-600 bg-green-100',
            cancelled: 'text-red-600 bg-red-100'
        };
        return colors[status] || 'text-gray-600 bg-gray-100';
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Head>
                <title>My Orders - Axion Helmets</title>
            </Head>

            <Navbar />

            <main className="pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold mb-8 text-black">My Orders</h1>

                    {loading ? (
                        <div className="text-center py-20">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-axion-red"></div>
                            <p className="mt-4 text-gray-600">Loading orders...</p>
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-md p-12 text-center">
                            <p className="text-gray-600 text-lg mb-6">You haven't placed any orders yet</p>
                            <a href="/">
                                <button className="bg-axion-red text-white px-8 py-3 rounded-md font-bold uppercase hover:bg-red-700 transition-colors">
                                    Start Shopping
                                </button>
                            </a>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {orders.map((order) => (
                                <div key={order._id} className="bg-white rounded-lg shadow-md p-6">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                        <div>
                                            <h3 className="text-lg font-bold text-black">Order #{order._id}</h3>
                                            <p className="text-sm text-gray-600">
                                                Placed on {new Date(order.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="mt-2 md:mt-0">
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                                {order.status.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="border-t pt-4">
                                        <div className="space-y-2 mb-4">
                                            {order.items.map((item, index) => (
                                                <div key={index} className="flex justify-between text-sm">
                                                    <span className="text-gray-600">
                                                        {item.name} x {item.quantity}
                                                    </span>
                                                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="border-t pt-3 flex justify-between items-center">
                                            <span className="text-lg font-bold text-black">Total:</span>
                                            <span className="text-xl font-bold text-axion-red">${order.totalPrice.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
