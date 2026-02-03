import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-brand-black text-white py-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <h3 className="text-3xl font-extrabold mb-4">AXION</h3>
                        <p className="text-gray-400 text-sm">
                            Premium helmets engineered for safety and style.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><Link href="/#products" className="hover:text-brand-red transition-colors">Products</Link></li>
                            <li><Link href="/#about" className="hover:text-brand-red transition-colors">About Us</Link></li>
                            <li><Link href="/#contact" className="hover:text-brand-red transition-colors">Contact</Link></li>
                            <li><Link href="/cart" className="hover:text-brand-red transition-colors">Cart</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Customer Service</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-brand-red transition-colors">Shipping Policy</a></li>
                            <li><a href="#" className="hover:text-brand-red transition-colors">Return Policy</a></li>
                            <li><a href="#" className="hover:text-brand-red transition-colors">Warranty</a></li>
                            <li><a href="#" className="hover:text-brand-red transition-colors">FAQs</a></li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Follow Us</h4>
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-400 hover:text-brand-red transition-colors">
                                <FaFacebook size={24} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-brand-red transition-colors">
                                <FaTwitter size={24} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-brand-red transition-colors">
                                <FaInstagram size={24} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-brand-red transition-colors">
                                <FaYoutube size={24} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-800 pt-6 text-center text-gray-400 text-sm">
                    <p>&copy; {new Date().getFullYear()} AXION Helmets. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
