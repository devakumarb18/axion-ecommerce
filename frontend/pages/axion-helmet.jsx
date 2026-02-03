import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import { FaShoppingBag } from 'react-icons/fa';
import { BsHeart } from 'react-icons/bs';

export default function AxionHelmet() {
    const [selectedColor, setSelectedColor] = useState('black');

    const products = [
        { id: 'black', color: 'Black', image: '/helmet-black.png', price: '₹4,999' },
        { id: 'grey', color: 'Grey', image: '/helmet-white.png', price: '₹4,999' },
        { id: 'green', color: 'Green', image: '/helmet-green.png', price: '₹4,999' },
        { id: 'yellow', color: 'Yellow', image: '/helmet-yellow.png', price: '₹4,999' },
    ];

    const currentProduct = products.find(p => p.id === selectedColor);

    const handleNext = () => {
        const currentIndex = products.findIndex(p => p.id === selectedColor);
        const nextIndex = (currentIndex + 1) % products.length;
        setSelectedColor(products[nextIndex].id);
    };

    const handlePrev = () => {
        const currentIndex = products.findIndex(p => p.id === selectedColor);
        const prevIndex = (currentIndex - 1 + products.length) % products.length;
        setSelectedColor(products[prevIndex].id);
    };

    return (
        <div className="min-h-screen bg-white font-pin-sans overflow-x-hidden relative">
            <Head>
                <title>AXION Helmets - {currentProduct.color} Edition</title>
                <meta name="description" content="Premium Axion Helmets" />
            </Head>

            <Navbar />

            <main className="relative pt-8 pb-12 px-4 md:px-12 max-w-[1600px] mx-auto min-h-[85vh]">

                <div className="flex flex-col lg:flex-row h-full relative">

                    {/* 1. LEFT COLUMN: Title & Lines (Approx 25%) */}
                    <div className="w-full lg:w-[25%] mb-10 lg:mb-0 z-20 pt-10">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-black mb-6 leading-tight">
                            AXION Helmets
                        </h1>
                        <div className="space-y-3 max-w-[250px]">
                            <div className="h-[6px] bg-gray-400 w-full rounded-full"></div>
                            <div className="h-[6px] bg-gray-400 w-full rounded-full"></div>
                            <div className="h-[6px] bg-gray-400 w-full rounded-full"></div>
                            <div className="h-[6px] bg-gray-400 w-full rounded-full"></div>
                            <div className="h-[6px] bg-gray-400 w-[60%] rounded-full"></div>
                        </div>
                    </div>

                    {/* 2. CENTER COLUMN: Interactive Swiper (Approx 35%) */}
                    <div className="w-full lg:w-[40%] relative flex items-center justify-center pt-20">
                        {/* Swiper Container */}
                        <div className="flex items-center justify-center w-full relative">
                            {/* Left Arrow */}
                            <button onClick={handlePrev} className="text-gray-400 hover:text-brand-red transition-colors text-4xl lg:text-5xl mr-4 md:mr-8 z-20">
                                ◀
                            </button>

                            {/* Main Interactive Helmet */}
                            <div className="relative transform transition-all duration-500 ease-in-out hover:scale-105 drop-shadow-2xl z-10 w-[300px] md:w-[400px]">
                                <Image
                                    src={currentProduct.image}
                                    alt={`Axion Helmet ${currentProduct.color}`}
                                    width={450}
                                    height={450}
                                    className="object-contain"
                                    priority
                                />
                                {/* Wishlist Heart Next to Helmet */}
                                <div className="absolute top-0 right-0 text-gray-400 hover:text-brand-red text-xl cursor-pointer">
                                    <BsHeart />
                                </div>
                            </div>

                            {/* Right Arrow */}
                            <button onClick={handleNext} className="text-gray-400 hover:text-brand-red transition-colors text-4xl lg:text-5xl ml-4 md:ml-8 z-20">
                                ▶
                            </button>
                        </div>
                    </div>

                    {/* 3. RIGHT COLUMN: Static Hero & Details (Approx 35%) */}
                    <div className="w-full lg:w-[35%] relative flex flex-col items-center lg:items-end">

                        {/* TOP RIGHT: Static Red Helmet & AXION Text */}
                        <div className="relative w-full h-[350px] mb-10 flex items-center justify-center lg:justify-end">
                            {/* Large AXION Background Text */}
                            <div className="absolute top-1/2 left-1/2 lg:left-0 transform -translate-x-1/2 lg:translate-x-0 -translate-y-1/2 z-0 select-none pointer-events-none">
                                <span className="text-[6rem] lg:text-[8rem] font-bold text-white tracking-widest pl-10"
                                    style={{ WebkitTextStroke: '2px #4b5563' }}>
                                    AXION
                                </span>
                            </div>

                            {/* Decorative Lines for Static Section */}
                            <div className="absolute top-10 right-10 w-[200px] h-[200px] border-t-2 border-r-2 border-brand-red opacity-80 z-0">
                                <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-brand-red rounded-full"></div>
                                <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-brand-red rounded-full"></div>
                            </div>

                            {/* Static RED Helmet */}
                            <div className="relative z-10 transform rotate-[-15deg] translate-x-4 lg:translate-x-0">
                                <Image
                                    src="/helmet-red.png"
                                    alt="Axion Red Helmet"
                                    width={350}
                                    height={350}
                                    className="object-contain drop-shadow-xl"
                                />
                            </div>
                        </div>

                        {/* BOTTOM RIGHT: Details Block (Below Static Helmet) */}
                        <div className="w-full max-w-[300px] lg:mr-10 flex flex-col gap-6">
                            {/* Grey Details Lines */}
                            <div className="space-y-3">
                                <div className="h-4 bg-gray-500 w-full rounded-sm"></div>
                                <div className="h-4 bg-gray-500 w-full rounded-sm"></div>
                                <div className="mt-4 space-y-2">
                                    <div className="h-3 bg-gray-400 w-[60%] rounded-sm"></div>
                                    <div className="h-3 bg-gray-400 w-[80%] rounded-sm"></div>
                                    <div className="h-3 bg-gray-400 w-[70%] rounded-sm"></div>
                                    <div className="h-3 bg-gray-400 w-[50%] rounded-sm"></div>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="text-3xl font-extrabold text-brand-black">
                                {currentProduct.price}
                            </div>

                            {/* Add To Cart Button */}
                            <button className="bg-black text-white py-4 px-6 flex items-center justify-center gap-3 hover:bg-brand-red transition-all duration-300 uppercase font-bold tracking-widest text-sm w-full">
                                <FaShoppingBag />
                                Add To Cart
                            </button>
                        </div>

                    </div>
                </div>

                {/* BOTTOM: THUMBNAILS (Across Width) */}
                <div className="w-full flex justify-center items-end gap-12 mt-4 pb-8 border-b-4 border-transparent">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => setSelectedColor(product.id)}
                            className={`cursor-pointer transition-all duration-300 group flex flex-col items-center gap-4`}
                        >
                            <div className={`transition-all duration-300 ${selectedColor === product.id ? 'scale-110 opacity-100' : 'scale-90 opacity-60 hover:opacity-100'}`}>
                                <Image
                                    src={product.image}
                                    alt={product.color}
                                    width={90}
                                    height={90}
                                    className="object-contain"
                                />
                            </div>

                            {selectedColor === product.id ? (
                                <div className="w-16 h-1 bg-gray-600 rounded-full"></div>
                            ) : (
                                <div className="w-12 h-1 bg-gray-200 rounded-full group-hover:bg-gray-400"></div>
                            )}
                        </div>
                    ))}
                </div>

            </main>
        </div>
    );
}
