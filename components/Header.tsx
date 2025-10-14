import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LogoIcon, MenuIcon, CloseIcon } from './icons';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClasses = "text-gray-600 hover:text-primary transition-colors duration-300";
  const activeNavLinkClasses = "text-primary font-semibold";

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) => isActive ? `${navLinkClasses} ${activeNavLinkClasses}` : navLinkClasses;

  const navLinks = (
    <>
      <NavLink to="/" className={getNavLinkClass}>
        Home
      </NavLink>
      <NavLink to="/pricing" className={getNavLinkClass}>
        Pricing
      </NavLink>
      <NavLink to="/features" className={getNavLinkClass}>
        Features
      </NavLink>
      <NavLink to="/about" className={getNavLinkClass}>
        About
      </NavLink>
    </>
  );

  return (
    <header className="bg-white/80 sticky top-0 z-50 backdrop-blur-lg shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <LogoIcon className="h-8 w-auto text-primary" />
              <span className="text-xl font-bold text-dark">Treshchat</span>
            </Link>
          </div>
          <nav className="hidden md:flex md:space-x-8">
            {navLinks}
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="text-gray-600 hover:text-primary transition-colors duration-300">
              Log in
            </Link>
            <Link to="/register" className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-hover transition-colors duration-300 shadow-sm">
              Try for free
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary">
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <CloseIcon className="block h-6 w-6" /> : <MenuIcon className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
            {navLinks}
            <div className="pt-4 mt-4 border-t border-gray-200 w-full flex flex-col items-center space-y-3">
               <Link to="/login" className="text-gray-600 hover:text-primary transition-colors duration-300 w-full text-center py-2">
                Log in
              </Link>
              <Link to="/register" className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-hover transition-colors duration-300 shadow-sm w-full text-center">
                Try for free
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;