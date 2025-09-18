import React, { useState } from 'react';
import { SparklesIcon } from './Icons.jsx';

const Header = ({ navigateTo, isLoggedIn, onLogout }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-white/70 backdrop-blur-lg shadow-sm sticky top-0 z-50 border-b border-white/20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div onClick={() => navigateTo('home')} className="flex items-center space-x-3 cursor-pointer">
                         <SparklesIcon className="h-8 w-8 text-teal-600" />
                        <span className="text-2xl font-bold text-slate-800">Jeevan Jyothi</span>
                    </div>
                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {!isLoggedIn ? (
                          <>
                            <a href="#simplifier" className="text-slate-600 hover:text-teal-600 transition-colors font-medium">Simplifier</a>
                            <a href="#how-it-works" className="text-slate-600 hover:text-teal-600 transition-colors font-medium">How It Works</a>
                            <a href="#features" className="text-slate-600 hover:text-teal-600 transition-colors font-medium">Features</a>
                            <button onClick={() => navigateTo('login')} className="bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-teal-700 transition-all duration-300 transform hover:scale-105">
                                Login / Sign Up
                            </button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => navigateTo('dashboard')} className="text-slate-600 hover:text-teal-600 transition-colors font-medium">Dashboard</button>
                            <button onClick={onLogout} className="bg-rose-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-rose-600 transition-all duration-300 transform hover:scale-105">
                                Logout
                            </button>
                          </>
                        )}
                    </nav>
                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-800 focus:outline-none">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white/80 backdrop-blur-lg pb-4">
                     <nav className="flex flex-col items-center space-y-4 pt-2">
                        {!isLoggedIn ? (
                          <>
                            <a href="#simplifier" onClick={() => setIsMenuOpen(false)} className="text-slate-600 hover:text-teal-600 transition-colors font-medium">Simplifier</a>
                            <a href="#how-it-works" onClick={() => setIsMenuOpen(false)} className="text-slate-600 hover:text-teal-600 transition-colors font-medium">How It Works</a>
                            <a href="#features" onClick={() => setIsMenuOpen(false)} className="text-slate-600 hover:text-teal-600 transition-colors font-medium">Features</a>
                            <button onClick={() => { navigateTo('login'); setIsMenuOpen(false); }} className="bg-teal-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-teal-700 transition-colors w-1/2">
                                Login / Sign Up
                            </button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => { navigateTo('dashboard'); setIsMenuOpen(false); }} className="text-slate-600 hover:text-teal-600 transition-colors font-medium">Dashboard</button>
                            <button onClick={() => { onLogout(); setIsMenuOpen(false); }} className="bg-rose-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-rose-600 transition-colors w-1/2">
                                Logout
                            </button>
                          </>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;