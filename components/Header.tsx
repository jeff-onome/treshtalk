import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LogoIcon, MenuIcon, CloseIcon } from './icons';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/features', label: 'Features' },
  { to: '/about', label: 'About' },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) => 
    `text-gray-600 hover:text-primary transition-colors duration-300 ${isActive ? 'text-primary font-semibold' : ''}`;
  
  const getMobileNavLinkClass = ({ isActive }: { isActive: boolean }) => 
    `block w-full text-center px-4 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
      isActive 
        ? 'bg-primary-light text-primary' 
        : 'text-gray-600 hover:bg-gray-100 hover:text-primary'
    }`;


  return (
    <header className="bg-white/80 sticky top-0 z-50 backdrop-blur-lg shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <LogoIcon className="h-8 w-auto text-primary" />
              <span className="text-xl font-bold text-dark">TreshTalk</span>
            </Link>
          </div>
          <nav className="hidden md:flex md:space-x-8">
            {navItems.map(item => (
              <NavLink key={item.to} to={item.to} className={getNavLinkClass}>
                {item.label}
              </NavLink>
            ))}
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
          <div className="px-2 pt-2 pb-3 sm:px-3">
            <div className="flex flex-col space-y-2">
              {navItems.map(item => (
                <NavLink key={item.to} to={item.to} className={getMobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>
                  {item.label}
                </NavLink>
              ))}
            </div>
            <div className="pt-4 mt-4 border-t border-gray-200 flex flex-col items-center space-y-3">
               <Link to="/login" className="text-gray-600 hover:text-primary transition-colors duration-300 w-full text-center py-2" onClick={() => setIsMenuOpen(false)}>
                Log in
              </Link>
              <Link to="/register" className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-hover transition-colors duration-300 shadow-sm w-full text-center" onClick={() => setIsMenuOpen(false)}>
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