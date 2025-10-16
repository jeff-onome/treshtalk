import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LogoIcon, MenuIcon, CloseIcon } from './icons.tsx';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Pricing', href: '/pricing' },
        { name: 'Features', href: '/features' },
        { name: 'Integrations', href: '/integrations' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact', href: '/contact' },
    ];

    const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
        `text-base font-medium transition-colors duration-200 ${
            isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'
        }`;
    
    const getMobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
        `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
            isActive ? 'bg-primary-light text-primary' : 'text-gray-700 hover:bg-gray-100'
        }`;


    return (
        <header className={`sticky top-0 z-30 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-sm shadow-md' : 'bg-white'}`}>
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center gap-2">
                            <LogoIcon className="h-8 w-auto text-primary" />
                            <span className="text-xl font-bold text-dark">TreshTalk</span>
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-6">
                            {navLinks.map(link => (
                                <NavLink key={link.name} to={link.href} className={getNavLinkClass}>
                                    {link.name}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                         <Link to="/login" className="text-base font-medium text-gray-600 hover:text-primary">
                            Sign In
                        </Link>
                        <Link to="/register" className="inline-block bg-primary text-white px-5 py-2.5 rounded-md text-base font-medium hover:bg-primary-hover transition-colors duration-300 shadow">
                            Get Started Free
                        </Link>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary" aria-controls="mobile-menu" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? <CloseIcon className="block h-6 w-6" /> : <MenuIcon className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </nav>

            {isMenuOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                         {navLinks.map(link => (
                            <NavLink key={link.name} to={link.href} className={getMobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>
                                {link.name}
                            </NavLink>
                        ))}
                    </div>
                    <div className="pt-4 pb-3 border-t border-gray-200">
                        <div className="flex flex-col items-center px-5 space-y-3">
                            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="w-full text-center block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
                                Sign In
                            </Link>
                             <Link to="/register" onClick={() => setIsMenuOpen(false)} className="w-full text-center block bg-primary text-white px-5 py-2.5 rounded-md text-base font-medium hover:bg-primary-hover transition-colors duration-300 shadow">
                                Get Started Free
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
