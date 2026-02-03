import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import SpecialEdition from '../components/SpecialEdition';
import { FaShoppingBag } from 'react-icons/fa';
import { BsHeart } from 'react-icons/bs';
import { useCart } from '../context/CartContext';
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
    const router = useRouter();
    const [selectedColor, setSelectedColor] = useState('black');
    const { addToCart, buyNow } = useCart();

    const products = [
        {
            id: 'black',
            color: 'Black',
            image: '/helmet-black.png',
            price: '₹4,999',
            title: 'Axion Stealth Black',
            description: 'Matte finish polycarbonate shell designed for the urban rider. Features UV-resistant clear visor and hypoallergenic liner.',
            specs: ['DOT Certified', '1450g Light Weight', 'Quick-Release Buckle']
        },
        {
            id: 'grey',
            color: 'Grey',
            image: '/helmet-white.png',
            price: '₹4,999',
            title: 'Axion Ghost White',
            description: 'High-visibility gloss coating for maximum safety. Aerodynamic vents ensure optimal airflow during high-speed commutes.',
            specs: ['ECE 22.06 Approved', 'Anti-Fog Visor', 'Bluetooth Ready Pockets']
        },
        {
            id: 'green',
            color: 'Green',
            image: '/helmet-green.png',
            price: '₹4,999',
            title: 'Axion Venom Green',
            description: 'Stand out with this limited run neon green finish. Reinforced chin guard and multi-density EPS for superior impact absorption.',
            specs: ['Impact-Resistant Shield', 'Washable Liner', 'Micrometric Lock']
        },
        {
            id: 'yellow',
            color: 'Yellow',
            image: '/helmet-yellow.png',
            price: '₹4,999',
            title: 'Axion Solar Yellow',
            description: 'Designed for the bold. The Solar Yellow edition combines high-contrast aesthetics with our signature comfort-fit system.',
            specs: ['Dual-Visor System', 'Noise Reduction', '5-Year Warranty']
        },
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

    const handleAddToCart = () => {
        addToCart({
            ...currentProduct,
            category: 'Standard Series'
        });
        toast.success(
            <div className="flex items-center gap-2">
                <span>Added to cart!</span>
                <span className="font-bold underline cursor-pointer" onClick={() => window.location.href = '/cart'}>Go to Cart</span>
            </div>
        );
    };

    const handleBuyNow = () => {
        buyNow({
            ...currentProduct,
            category: 'Standard Series'
        });
        router.push('/checkout');
    };

    return (
        <div className="min-h-screen bg-white font-pin-sans overflow-x-hidden relative">
            <Toaster position="top-center" />
            <Head>
                <title>AXION Helmets | Premium Safety Meets Innovation</title>
                <meta name="description" content="Experience the future of helmet technology with AXION." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />

            {/* --- HERO SECTION (IMAGES 1 & 2) --- */}
            <main id="home" className="relative pt-28 pb-12 px-4 md:px-12 max-w-[1600px] mx-auto min-h-screen flex flex-col gap-10">

                {/* TOP ROW: Title (Left) & Static Hero (Right) */}
                <div className="flex flex-col lg:flex-row justify-between items-start w-full relative z-10">

                    {/* LEFT: Title & Lines */}
                    <div className="w-full lg:w-[30%] pt-8">
                        <h1 className="text-5xl md:text-6xl font-extrabold text-black mb-6 leading-tight">
                            AXION Helmets
                        </h1>
                        <div className="space-y-4 max-w-[300px] text-gray-600 font-medium">
                            <p className="leading-relaxed">
                                Pioneering the future of rider safety with <span className="text-brand-red font-bold">Advanced Composite Technology</span>.
                            </p>
                            <p className="text-sm opacity-80 border-l-4 border-black pl-3">
                                Precision engineered for stability, silence, and speed.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT: Static Red Helmet & AXION Text */}
                    <div className="w-full lg:w-[40%] relative h-[300px] flex justify-end">
                        <div className="absolute top-10 right-0 transform translate-x-10 z-0 select-none pointer-events-none">
                            <span className="text-[7rem] lg:text-[9rem] font-bold text-transparent tracking-widest"
                                style={{ WebkitTextStroke: '2px #9ca3af' }}>
                                AXION
                            </span>
                        </div>

                        {/* Static Red Helmet */}
                        <div className="relative z-10 transform rotate-[-15deg] translate-y-4 right-10">
                            <Image
                                src="/helmet-red.png"
                                alt="Axion Red Helmet"
                                width={350}
                                height={350}
                                className="object-contain drop-shadow-2xl"
                            />
                        </div>

                        {/* Decorative Square/Dots */}
                        <div className="absolute top-10 right-0 w-[150px] h-[150px] border-t-2 border-r-2 border-brand-red opacity-80 z-20 pointer-events-none">
                            <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-brand-red rounded-full"></div>
                            <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-brand-red rounded-full"></div>
                        </div>
                    </div>
                </div>


                {/* BOTTOM ROW: Swiper (Center) & Details (Right) */}
                <div className="flex flex-col lg:flex-row justify-between items-center w-full relative z-20 mt-4">

                    {/* CENTER: Interactive Swiper - BALANCED SIZE */}
                    <div className="w-full lg:w-[60%] flex items-center justify-center lg:justify-start lg:pl-12">
                        <div className="flex items-center justify-center w-full relative">
                            <button onClick={handlePrev} className="text-gray-400 hover:text-brand-red transition-colors text-6xl z-30 transform -translate-x-4">◀</button>

                            <div className="relative transform transition-all duration-500 ease-in-out hover:scale-105 drop-shadow-2xl z-10 w-full max-w-[600px]">
                                <Image
                                    src={currentProduct.image}
                                    alt={`Axion Helmet ${currentProduct.color}`}
                                    width={600}
                                    height={600}
                                    className="object-contain"
                                    priority
                                />
                                <div className="absolute top-0 right-0 text-gray-400 hover:text-brand-red text-3xl cursor-pointer">
                                    <BsHeart />
                                </div>
                            </div>

                            <button onClick={handleNext} className="text-gray-400 hover:text-brand-red transition-colors text-6xl z-30 transform translate-x-4">▶</button>
                        </div>
                    </div>

                    {/* RIGHT: Details Box (Lines + Button) */}
                    <div className="w-full lg:w-[35%] flex flex-col items-start lg:pl-0 mt-10 lg:mt-0 self-center">
                        <div className="space-y-6 w-full max-w-[400px] mb-8">
                            <div>
                                <h2 className="text-4xl font-bold text-black uppercase leading-none">{currentProduct.title}</h2>
                                <p className="text-2xl text-brand-red font-bold mt-2">{currentProduct.price}</p>
                            </div>

                            <p className="text-gray-600 leading-relaxed">
                                {currentProduct.description}
                            </p>

                            <div className="pt-2">
                                <h4 className="text-sm font-bold uppercase tracking-widest mb-3 border-b pb-2">Key Specs</h4>
                                <ul className="space-y-2">
                                    {currentProduct.specs.map((spec, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                                            <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                                            {spec}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 mt-6">
                            <button
                                onClick={handleAddToCart}
                                className="bg-black border border-black text-white py-3 px-8 flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all duration-300 uppercase font-bold tracking-widest text-sm rounded-full text-center min-w-[180px]"
                            >
                                <FaShoppingBag />
                                Add To Cart
                            </button>

                            <button
                                onClick={handleBuyNow}
                                className="bg-brand-red border border-brand-red text-white py-3 px-8 flex items-center justify-center gap-3 hover:bg-black hover:border-black transition-all duration-300 uppercase font-bold tracking-widest text-sm rounded-full text-center shadow-lg min-w-[180px]"
                            >
                                <FaShoppingBag />
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* THUMBNAILS (Bottom) */}
                <div className="w-full flex justify-center items-end gap-16 mt-16 pb-8 border-b-4 border-gray-200">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => setSelectedColor(product.id)}
                            className={`cursor-pointer transition-all duration-300 group flex flex-col items-center gap-4`}
                        >
                            <div className={`transition-all duration-300 ${selectedColor === product.id ? 'scale-125 opacity-100' : 'scale-100 opacity-60 hover:opacity-100'}`}>
                                <Image
                                    src={product.image}
                                    alt={product.color}
                                    width={200}
                                    height={200}
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* --- SPECIAL EDITIONS SECTION (IMAGES 3 & 4) --- */}
            <section id="products" className="py-20 px-4 bg-white">
                <div className="max-w-7xl mx-auto space-y-24">
                    <SpecialEdition
                        title="Axion Max (Special Edition)"
                        subtitle="IRON MAN EDITION"
                        image="/helmet-ironman.png"
                        backgroundText="IRON MAN"
                        description="Engineered with Nano-Tech plating and a Heads-Up Display (HUD) interface style. The Iron Man Edition combines superior impact resistance with a color scheme inspired by the legendary MK-85 armor."
                        features={[
                            "Titanium-Gold Finish",
                            "Jarvis UI Inspired Visor",
                            "Arc Reactor Core Vent",
                            "Voice Command Ready"
                        ]}
                        price="₹12,499"
                    />

                    <SpecialEdition
                        title="Axion Max (Special Edition)"
                        subtitle="SPIDERMAN EDITION"
                        image="/helmet-spiderman.png"
                        backgroundText="SPIDERMAN"
                        scale={1.3} // Increased size to match Iron Man
                        description="Agility meets protection. The Spiderman Edition features a specialized web-pattern aerodynamic shell designed for speed and flexibility. Lightweight composite materials ensure you stay fast on the track."
                        features={[
                            "Web-Pattern Carbon Fiber",
                            "Spider-Sense Alert System",
                            "Dynamic Air-Flow Vents",
                            "Ultra-Lightweight Build"
                        ]}
                        price="₹11,999"
                    />
                </div>
            </section>



            {/* --- ABOUT US SECTION (IMAGE 5) --- */}
            <section id="about" className="py-20 bg-white">
                <div className="max-w-5xl mx-auto px-4">
                    <h2 className="text-5xl font-extrabold text-black mb-10 text-left">About US</h2>

                    <div className="bg-gray-100 p-12 rounded-2xl space-y-6 border-l-8 border-brand-red">
                        <p className="text-xl font-medium leading-relaxed text-gray-800">
                            At <span className="font-bold text-brand-red">AXION</span>, we don't just build helmets; we engineer safety.
                            Born from a passion for speed and a commitment to protection, every Axion helmet is a masterpiece of
                            <span className="font-bold"> innovation</span> and <span className="font-bold">craftsmanship</span>.
                        </p>
                        <p className="text-lg leading-relaxed text-gray-600">
                            Using aerospace-grade <span className="text-black font-semibold">carbon fiber composites</span> and
                            multi-density EPS liners, our helmets exceed international safety standards (DOT, ECE 22.06).
                            Whether you're tearing up the track or cruising the highway, Axion ensures you ride with confidence.
                        </p>
                        <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <div>
                                <h3 className="text-4xl font-extrabold text-black mb-2">5+</h3>
                                <p className="text-sm uppercase tracking-widest text-gray-500">Years of R&D</p>
                            </div>
                            <div>
                                <h3 className="text-4xl font-extrabold text-black mb-2">100%</h3>
                                <p className="text-sm uppercase tracking-widest text-gray-500">Carbon Fiber</p>
                            </div>
                            <div>
                                <h3 className="text-4xl font-extrabold text-black mb-2">MAX</h3>
                                <p className="text-sm uppercase tracking-widest text-gray-500">Protection Rating</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Simple Footer */}
            <footer className="bg-black text-white py-8 text-center text-sm">
                <p>&copy; 2024 Axion Helmets. All Rights Reserved.</p>
            </footer>

        </div>
    );
}
