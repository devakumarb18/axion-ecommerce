import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useCart } from '../context/CartContext';
import toast, { Toaster } from 'react-hot-toast';


export default function ProductShowcase() {
    const router = useRouter();
    const { addToCart } = useCart();
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Buy Now Handler - Flipkart Style
    const handleBuyNow = (product) => {
        addToCart(product);
        toast.success(`${product.name} added to cart successfully`, {
            duration: 2000,
            position: 'top-center',
            style: {
                background: '#D70101',
                color: '#fff',
                fontWeight: 'bold',
            },
        });
        // Auto-redirect to cart page (Flipkart style)
        setTimeout(() => {
            router.push('/cart');
        }, 500);
    };

    // Add to Cart Handler - Stay on page
    const handleAddToCart = (product) => {
        addToCart(product);
        toast.success(`${product.name} added to cart`, {
            duration: 2000,
            position: 'top-center',
        });
    };

    const products = [
        {
            id: 1,
            name: 'AXION Max',
            category: 'standard',
            price: '₹24,999',
            image: '/helmet-red.png',
            highlights: [
                'Carbon Fiber Shell',
                'Multi-Density EPS',
                'Advanced Ventilation',
                'DOT & ECE Certified'
            ],
            badge: 'Bestseller'
        },
        {
            id: 2,
            name: 'AXION Max (SE)',
            category: 'se',
            price: '₹29,999',
            image: '/helmet-yellow.png',
            highlights: [
                'Premium Carbon Composite',
                'Enhanced Aerodynamics',
                'Quick-Release Visor',
                'Limited Edition Graphics'
            ],
            badge: 'Special Edition'
        },
        {
            id: 3,
            name: 'AXION Max - Iron Man Edition',
            category: 'special',
            price: '₹34,999',
            image: '/helmet-ironman.png',
            highlights: [
                'Exclusive Iron Man Design',
                'Gold-Plated Accents',
                'Premium Leather Interior',
                'Collector\'s Certificate'
            ],
            badge: 'Marvel Edition'
        },
        {
            id: 4,
            name: 'AXION Max - Spiderman Edition',
            category: 'special',
            price: '₹34,999',
            image: '/helmet-spiderman.png',
            highlights: [
                'Exclusive Spiderman Design',
                'Web Pattern Details',
                'Premium Comfort Liner',
                'Collector\'s Certificate'
            ],
            badge: 'Marvel Edition'
        },
        {
            id: 5,
            name: 'AXION Max - Viper',
            category: 'se',
            price: '₹27,999',
            image: '/helmet-green.png',
            highlights: [
                'High-Visibility Green',
                'Reflective Accents',
                'Enhanced Safety Features',
                'Sport Aerodynamics'
            ],
            badge: 'New'
        },
        {
            id: 6,
            name: 'AXION Max - Stealth',
            category: 'se',
            price: '₹28,999',
            image: '/helmet-black.png',
            highlights: [
                'Matte Black Finish',
                'Stealth Design',
                'Premium Ventilation',
                'Anti-Scratch Coating'
            ],
            badge: 'New'
        },
        {
            id: 7,
            name: 'AXION Max - Arctic',
            category: 'se',
            price: '₹28,999',
            image: '/helmet-white.png',
            highlights: [
                'Pearl White Finish',
                'Lightweight Design',
                'UV Protection',
                'Premium Comfort Padding'
            ],
            badge: 'New'
        }
    ];


    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(p => p.category === selectedCategory);

    return (
        <>
            <Toaster />
            <section id="products" className="py-20 bg-gradient-to-b from-brand-white to-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-extrabold text-brand-black mb-4">
                            AXION Collection
                        </h2>
                        <div className="h-1 w-24 bg-brand-red mx-auto mb-6"></div>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Engineered for excellence. Designed for champions. Choose from our premium lineup of helmets.
                        </p>
                    </div>

                    {/* Category Filter */}
                    <div className="flex justify-center gap-4 mb-12 flex-wrap">
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className={`px-6 py-3 font-bold uppercase tracking-wider transition-all ${selectedCategory === 'all'
                                ? 'bg-brand-red text-white shadow-lg'
                                : 'bg-white text-brand-black hover:bg-gray-100'
                                }`}
                        >
                            All Products
                        </button>
                        <button
                            onClick={() => setSelectedCategory('standard')}
                            className={`px-6 py-3 font-bold uppercase tracking-wider transition-all ${selectedCategory === 'standard'
                                ? 'bg-brand-red text-white shadow-lg'
                                : 'bg-white text-brand-black hover:bg-gray-100'
                                }`}
                        >
                            AXION Max
                        </button>
                        <button
                            onClick={() => setSelectedCategory('se')}
                            className={`px-6 py-3 font-bold uppercase tracking-wider transition-all ${selectedCategory === 'se'
                                ? 'bg-brand-red text-white shadow-lg'
                                : 'bg-white text-brand-black hover:bg-gray-100'
                                }`}
                        >
                            Special Edition
                        </button>
                        <button
                            onClick={() => setSelectedCategory('special')}
                            className={`px-6 py-3 font-bold uppercase tracking-wider transition-all ${selectedCategory === 'special'
                                ? 'bg-brand-red text-white shadow-lg'
                                : 'bg-white text-brand-black hover:bg-gray-100'
                                }`}
                        >
                            Marvel Editions
                        </button>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                            >
                                {/* Product Image */}
                                <div className="relative h-80 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
                                    {product.badge && (
                                        <div className="absolute top-4 right-4 bg-brand-red text-white px-4 py-2 text-xs font-bold uppercase z-10">
                                            {product.badge}
                                        </div>
                                    )}
                                    <div className="relative w-full h-full flex items-center justify-center p-8">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            width={400}
                                            height={400}
                                            className="object-contain drop-shadow-2xl transform group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                </div>

                                {/* Product Details */}
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold text-brand-black mb-2">
                                        {product.name}
                                    </h3>
                                    <div className="text-3xl font-extrabold text-brand-red mb-4">
                                        {product.price}
                                    </div>

                                    {/* Key Highlights */}
                                    <div className="space-y-2 mb-6">
                                        {product.highlights.map((highlight, index) => (
                                            <div key={index} className="flex items-start gap-2">
                                                <div className="w-1.5 h-1.5 bg-brand-red mt-2 flex-shrink-0"></div>
                                                <span className="text-sm text-gray-700">{highlight}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* CTA Buttons */}
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => handleBuyNow(product)}
                                            className="flex-1 bg-brand-red text-white py-3 font-bold uppercase tracking-wider hover:bg-brand-black transition-colors"
                                        >
                                            Buy Now
                                        </button>
                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            className="px-4 border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white transition-colors"
                                            title="Add to Cart"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Special Edition Banner */}
                    <div className="mt-20 bg-brand-red text-white rounded-2xl overflow-hidden shadow-2xl">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-12">
                            <div>
                                <h3 className="text-4xl font-extrabold mb-6">
                                    Limited Edition Marvel Collection
                                </h3>
                                <p className="text-lg mb-8 opacity-90">
                                    Own a piece of superhero legacy. Our exclusive Marvel editions combine cutting-edge safety technology with iconic designs. Limited quantities available.
                                </p>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-white"></div>
                                        <span>Officially Licensed Marvel Designs</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-white"></div>
                                        <span>Numbered Certificate of Authenticity</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-white"></div>
                                        <span>Premium Collector's Packaging</span>
                                    </li>
                                </ul>
                                <button className="bg-white text-brand-red px-10 py-4 font-bold uppercase tracking-wider hover:bg-brand-black hover:text-white transition-all shadow-lg">
                                    Shop Marvel Collection
                                </button>
                            </div>
                            <div className="relative h-96 flex items-center justify-center">
                                <Image
                                    src="/helmet-ironman.png"
                                    alt="Marvel Edition"
                                    width={500}
                                    height={500}
                                    className="object-contain drop-shadow-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
