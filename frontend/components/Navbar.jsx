import Link from 'next/link';
import { FaShoppingBag, FaHome, FaInfoCircle, FaPhone, FaSignInAlt, FaUser } from 'react-icons/fa';
import { GiFullMotorcycleHelmet } from 'react-icons/gi';
import { useState, useEffect } from 'react';

import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { user, logout } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
            window.location.href = '/login';
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        // 'Home' and 'Products' handled separately with dropdowns/icons
        { name: 'About us', href: '#about' },
        { name: 'Contact us', href: '#contact' },
    ];

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-red shadow-lg py-2' : 'bg-brand-red py-4'}`}>
            <div className="max-w-screen-2xl mx-auto px-4 md:px-12 flex items-center justify-between text-white">

                {/* Logo */}
                <Link href="/">
                    <div className="flex items-center gap-2 cursor-pointer">
                        <span className="text-4xl font-bold bg-black text-brand-red px-2 transform -skew-x-12">X</span>
                        <span className="text-2xl font-bold tracking-widest">AXION</span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {/* Home Link */}
                    <Link href="/">
                        <span className="flex items-center gap-2 text-sm font-medium uppercase tracking-wider hover:text-black transition-colors cursor-pointer">
                            <span>🏠</span> Home
                        </span>
                    </Link>

                    {/* Products Dropdown */}
                    <div
                        className="relative"
                        onMouseEnter={() => setIsDropdownOpen(true)}
                        onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                        <span className="flex items-center gap-2 text-sm font-medium uppercase tracking-wider hover:text-black transition-colors cursor-pointer py-4">
                            <GiFullMotorcycleHelmet className="text-black text-2xl" /> Products ▾
                        </span>

                        {/* Dropdown Menu */}
                        <div className={`absolute top-full left-0 bg-white text-black shadow-xl rounded-b-md w-48 py-2 transition-all duration-300 transform origin-top ${isDropdownOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}>
                            <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm font-bold border-b border-gray-100">
                                Product Line
                            </div>
                            <Link href="#products">
                                <div className="px-6 py-2 hover:bg-brand-red hover:text-white cursor-pointer text-sm transition-colors">
                                    AXION Max
                                </div>
                            </Link>
                            <Link href="#products">
                                <div className="px-6 py-2 hover:bg-brand-red hover:text-white cursor-pointer text-sm transition-colors">
                                    AXION Max (SE)
                                </div>
                            </Link>

                            <div className="px-4 py-2 mt-2 hover:bg-gray-100 cursor-pointer text-sm font-bold border-b border-gray-100">
                                Special Editions
                            </div>
                            <Link href="#products">
                                <div className="px-6 py-2 hover:bg-brand-red hover:text-white cursor-pointer text-sm transition-colors">
                                    Spiderman Edition
                                </div>
                            </Link>
                            <Link href="#products">
                                <div className="px-6 py-2 hover:bg-brand-red hover:text-white cursor-pointer text-sm transition-colors">
                                    Iron Man Edition
                                </div>
                            </Link>
                        </div>
                    </div>

                    {navLinks.map((link) => (
                        <Link key={link.name} href={link.href}>
                            <span className="flex items-center gap-2 text-sm font-medium uppercase tracking-wider hover:text-black transition-colors cursor-pointer">
                                {link.name === 'About us' && <FaInfoCircle className="text-black text-lg" />}
                                {link.name === 'Contact us' && <FaPhone className="text-black text-lg" />}
                                {link.name}
                            </span>
                        </Link>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-6">
                    <Link href="/cart">
                        <div className="flex flex-col items-center cursor-pointer group">
                            <FaShoppingBag className="text-black text-2xl mb-1 group-hover:text-white transition-colors" />
                            <span className="text-[10px] uppercase font-bold">Cart</span>
                        </div>
                    </Link>

                    <div className="hidden md:flex items-center gap-4 text-sm font-medium">
                        {user ? (
                            <div className="flex items-center gap-4 group relative">
                                <div className="flex items-center gap-2 cursor-pointer">
                                    {user.photoURL ? (
                                        <img
                                            src={user.photoURL}
                                            alt={user.name}
                                            className="w-8 h-8 rounded-full border-2 border-white object-cover"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center border-2 border-white">
                                            <span className="text-white text-xs font-bold">{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</span>
                                        </div>
                                    )}
                                    <span className="font-bold hover:text-black transition-colors max-w-[150px] truncate">
                                        Hello, {user.name?.split(' ')[0]}
                                    </span>
                                </div>

                                {/* User Dropdown */}
                                <div className="absolute top-full right-0 mt-2 w-48 bg-white text-black shadow-xl rounded-md py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <p className="text-xs text-gray-500">Signed in as</p>
                                        <p className="text-sm font-bold truncate">{user.email}</p>
                                    </div>
                                    <Link href="/account">
                                        <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">
                                            My Account
                                        </div>
                                    </Link>
                                    <Link href="/orders">
                                        <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">
                                            My Orders
                                        </div>
                                    </Link>
                                    <div
                                        onClick={handleLogout}
                                        className="px-4 py-2 hover:bg-red-50 text-red-600 hover:text-red-700 cursor-pointer text-sm border-t border-gray-100"
                                    >
                                        Logout
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <Link href="/login">
                                    <span className="cursor-pointer hover:text-black transition-colors">Sign in</span>
                                </Link>
                                <Link href="/login">
                                    <button className="bg-black text-white px-5 py-2 rounded-sm hover:bg-gray-800 transition-colors uppercase font-bold text-xs">
                                        Login
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
