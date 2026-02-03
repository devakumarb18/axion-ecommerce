import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FaShoppingBag, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const SpecialEdition = ({ title, subtitle, image, verticalText, reverse = false, scale = 1, description, features, price }) => {
    const router = useRouter();
    const { addToCart, buyNow } = useCart();

    const handleAddToCart = () => {
        const product = {
            id: title.replace(/\s+/g, '-').toLowerCase() + '-' + subtitle.replace(/\s+/g, '-').toLowerCase(),
            name: title + ' ' + subtitle,
            price: price,
            image: image,
            category: 'Special Edition'
        };
        addToCart(product);
        toast.success(
            <div className="flex items-center gap-2">
                <span>Added to cart!</span>
                <span className="font-bold underline cursor-pointer" onClick={() => window.location.href = '/cart'}>Go to Cart</span>
            </div>,
            { duration: 3000 }
        );
    };

    const handleBuyNow = () => {
        const product = {
            id: title.replace(/\s+/g, '-').toLowerCase() + '-' + subtitle.replace(/\s+/g, '-').toLowerCase(),
            name: title + ' ' + subtitle,
            price: price,
            image: image,
            category: 'Special Edition'
        };
        buyNow(product);
        router.push('/checkout');
    };

    return (
        <div className="w-full relative overflow-hidden bg-[#8B0000] text-white py-0 min-h-[600px] flex items-center shadow-2xl my-20 border-t-4 border-b-4 border-black">
            {/* Deep Red Background with minimal gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#a00000] to-[#400000] z-0"></div>

            {/* Technical/Blueprint Grid Background */}
            <div className="absolute inset-0 z-0 opacity-10"
                style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
            </div>

            <div className="max-w-[1400px] mx-auto w-full flex flex-col lg:flex-row justify-between items-center relative z-10 px-6 md:px-12 h-full">

                {/* LEFT SIDE: Typography & Poster Layout */}
                <div className="w-full lg:w-[55%] flex flex-col justify-center h-full py-16 gap-8 select-none z-20">
                    {/* Product Title */}
                    <div className="relative">
                        <h2 className="text-5xl md:text-7xl font-sans font-black uppercase leading-tight tracking-tighter text-white drop-shadow-lg">
                            {title.split('(')[0]} <br />
                            <span className="text-3xl md:text-5xl font-bold tracking-wide text-gray-300 block mt-2">
                                {subtitle}
                            </span>
                        </h2>
                        {/* Decorative line under title */}
                        <div className="mt-6 w-32 h-2 bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
                    </div>

                    {/* Real Content: Description & Features */}
                    <div className="space-y-6 w-full max-w-lg mt-4 text-gray-100">
                        {/* Description */}
                        <p className="text-lg leading-relaxed font-light opacity-90 border-l-4 border-yellow-500 pl-4">
                            {description || "Experience the pinnacle of helmet technology with this exclusive collector's edition."}
                        </p>

                        {/* Features List */}
                        {features && (
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-mono opacity-80 pt-4">
                                {features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        )}

                        {/* Price Display */}
                        {price && (
                            <div className="pt-4">
                                <span className="text-3xl font-bold text-white tracking-widest">{price}</span>
                                <span className="text-xs text-gray-400 block tracking-widest uppercase">Limited Edition Pricing</span>
                            </div>
                        )}
                    </div>

                    {/* Technical Specs / Decorative text */}
                    <div className="mt-8 flex gap-8 opacity-60 text-xs font-mono tracking-widest border-t border-white/20 pt-4 w-max">
                        <div>SPEC: MK-85</div>
                        <div>MAT: TITANIUM-GOLD</div>
                        <div>SERIES: 001</div>
                    </div>
                </div>

                {/* RIGHT SIDE: Floating Helmet */}
                <div className="w-full lg:w-[45%] flex justify-center lg:justify-end items-center relative h-full mt-10 lg:mt-0">

                    {/* Floating Effect Wrapper */}
                    <div
                        className="relative z-20 transform hover:-translate-y-4 transition-transform duration-700 ease-in-out group"
                        style={{ transform: `scale(${scale})` }}
                    >
                        {/* Shadow for depth */}
                        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-3/4 h-12 bg-black opacity-50 blur-2xl rounded-[100%] group-hover:w-[85%] group-hover:opacity-40 transition-all duration-700"></div>

                        <Image
                            src={image}
                            alt={`${title} Helmet`}
                            width={600}
                            height={600}
                            className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] relative z-10"
                            priority
                        />
                    </div>

                    {/* Tech Circle / Blueprint Element behind helmet */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/10 rounded-full z-0 animate-pulse"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border-[0.5px] border-white/20 rounded-full z-0"></div>

                </div>

                {/* CTA Button - Bottom Right Absolute */}
                <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-30">
                    <div className="flex gap-4">
                        <button
                            onClick={handleAddToCart}
                            className="bg-black text-white px-8 py-4 rounded-full flex items-center gap-3 font-bold text-sm tracking-widest hover:scale-110 hover:bg-gray-900 transition-all shadow-xl border border-gray-800"
                        >
                            <FaShoppingCart />
                            Add To Cart
                        </button>
                        <button
                            onClick={handleBuyNow}
                            className="bg-red-600 text-white px-8 py-4 rounded-full flex items-center gap-3 font-bold text-sm tracking-widest hover:scale-110 hover:bg-red-700 transition-all shadow-xl border border-red-500"
                        >
                            <FaShoppingCart />
                            Buy Now
                        </button>
                    </div>
                </div>

                {/* Vertical Text - Right Edge */}
                <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-[30%] text-[100px] lg:text-[150px] font-black text-white opacity-5 w-auto whitespace-nowrap -rotate-90 pointer-events-none hidden lg:block select-none">
                    {String(verticalText || "EDITION").toUpperCase()}
                </div>

            </div>
        </div >
    );
};

export default SpecialEdition;
