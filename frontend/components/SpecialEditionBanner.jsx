import React from 'react';
import Image from 'next/image';
import { FaShoppingBag } from 'react-icons/fa';

const SpecialEditionBanner = () => {
    return (
        <section className="w-full py-20 px-4 md:px-12 bg-white flex justify-center items-center">
            {/* Main Container - Relative for positioning */}
            <div className="relative w-full max-w-[1400px] h-[600px] md:h-[700px] flex items-center">

                {/* Red Background Block (85-90% width) */}
                <div className="absolute left-0 top-0 bottom-0 w-[90%] bg-[#CD1d1D] rounded-lg shadow-2xl overflow-hidden z-0">
                    {/* Background Texture/Gradient (Optional for premium feel) */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20"></div>
                </div>

                {/* Content Container (Inside Red Block) */}
                <div className="relative z-10 w-[90%] h-full flex flex-col justify-between p-10 md:p-16">

                    {/* Top Left: Title & Small Lines */}
                    <div className="mt-8">
                        <h2 className="text-4xl md:text-6xl font-sans font-bold text-white mb-6 tracking-wide drop-shadow-md">
                            Axion Max (Special Edition)
                        </h2>

                        {/* Small White Lines Block */}
                        <div className="space-y-3 w-[250px] opacity-90">
                            {[...Array(6)].map((_, i) => (
                                <div key={`small-${i}`} className="h-[3px] bg-white w-full rounded-full shadow-sm"></div>
                            ))}
                        </div>
                    </div>

                    {/* Middle Left: Big Lines Block */}
                    <div className="w-[60%] md:w-[50%] space-y-3 mt-8 opacity-80">
                        {[...Array(10)].map((_, i) => (
                            <div key={`big-${i}`} className="h-[3px] bg-white w-full rounded-full shadow-sm"></div>
                        ))}
                    </div>

                    {/* Bottom Right of Red Block: Add to Cart Button */}
                    <div className="absolute bottom-10 right-10">
                        <button className="bg-black text-white px-8 py-4 rounded-full flex items-center gap-3 font-bold text-lg tracking-widest hover:scale-105 hover:bg-gray-900 transition-all shadow-xl hover:shadow-2xl border border-gray-800">
                            <FaShoppingBag />
                            Add To Cart
                        </button>
                    </div>
                </div>

                {/* Right Side: Helmet Image (Overlapping) */}
                {/* Position: Top Right, overlapping red background edge */}
                <div className="absolute top-[5%] right-0 w-[40%] md:w-[35%] h-[90%] z-20 pointer-events-none select-none flex items-center justify-center">
                    {/* Helmet Image */}
                    <div className="relative w-full h-full transform rotate-[-12deg] hover:rotate-0 transition-all duration-500 ease-in-out">
                        <Image
                            src="/helmet-red.png"
                            alt="Axion Max Special Edition Helmet"
                            layout="fill"
                            objectFit="contain"
                            className="drop-shadow-[0_35px_35px_rgba(0,0,0,0.6)]"
                        />

                        {/* Connection Lines (Cosmetic - pointing to helmet parts like in the image) */}
                        <div className="absolute top-10 right-10 w-20 h-[1px] bg-red-900/50"></div>
                        <div className="absolute top-10 right-10 w-1 h-20 bg-red-900/50"></div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default SpecialEditionBanner;
