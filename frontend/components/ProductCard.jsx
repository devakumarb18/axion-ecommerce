import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { FaHeart } from 'react-icons/fa';

export default function ProductCard({ product }) {
    const { addToCart } = useCart();

    return (
        <div className="group relative bg-white p-4 transition-all duration-300 hover:shadow-xl border border-transparent hover:border-gray-100">
            {/* Wishlist Icon */}
            <div className="absolute top-4 right-4 z-10 text-gray-300 hover:text-axion-red cursor-pointer">
                <FaHeart />
            </div>

            {/* Image Area */}
            <div className="relative h-64 w-full bg-gray-50 mb-4 rounded-lg overflow-hidden flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                {/* Placeholder for image */}
                <div className="text-gray-400 font-bold text-xl">
                    {product.image ? (
                        <img src={product.image} alt={product.name} className="object-contain h-full w-full p-4 transform group-hover:scale-110 transition-transform duration-500" />
                    ) : "NO IMAGE"}
                </div>
            </div>

            {/* Details */}
            <div className="text-center">
                <h3 className="text-lg font-bold text-black uppercase mb-1">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-3">{product.description}</p>
                <div className="text-axion-red font-bold text-xl mb-4">${product.price}</div>

                <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-black text-white py-2 font-medium uppercase text-sm tracking-wider hover:bg-axion-red transition-colors"
                >
                    Add To Cart
                </button>
            </div>
        </div>
    );
}
