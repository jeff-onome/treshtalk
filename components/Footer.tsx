import React from 'react';
import { Link } from 'react-router-dom';
import { LogoIcon, TwitterIcon, GitHubIcon, LinkedInIcon } from './icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <LogoIcon className="h-8 w-auto text-primary" />
              <span className="text-xl font-bold">TreshTalk</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Engage customers with our AI-powered chatbot solution.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><TwitterIcon className="h-6 w-6" /></a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><GitHubIcon className="h-6 w-6" /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><LinkedInIcon className="h-6 w-6" /></a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Product</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/pricing" className="text-base text-gray-400 hover:text-white">Pricing</Link></li>
              <li><Link to="/features" className="text-base text-gray-400 hover:text-white">Features</Link></li>
              <li><Link to="/integrations" className="text-base text-gray-400 hover:text-white">Integrations</Link></li>
              <li><Link to="/updates" className="text-base text-gray-400 hover:text-white">Updates</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/about" className="text-base text-gray-400 hover:text-white">About</Link></li>
              <li><Link to="/blog" className="text-base text-gray-400 hover:text-white">Blog</Link></li>
              <li><Link to="/careers" className="text-base text-gray-400 hover:text-white">Careers</Link></li>
              <li><Link to="/contact" className="text-base text-gray-400 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/privacy" className="text-base text-gray-400 hover:text-white">Privacy</Link></li>
              <li><Link to="/terms" className="text-base text-gray-400 hover:text-white">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 xl:text-center">&copy; 2024 TreshTalk. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;