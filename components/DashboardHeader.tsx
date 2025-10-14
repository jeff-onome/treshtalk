
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BellIcon, UserCircleIcon, CogIcon, ArrowRightOnRectangleIcon, MenuIcon } from './icons';

interface DashboardHeaderProps {
    onToggleSidebar: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onToggleSidebar }) => {
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const profileMenuRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    // Get page title from path
    const getPageTitle = (pathname: string): string => {
        const path = pathname.split('/').pop() || 'chats';
        if (path === 'chats') return 'Chats';
        if (path.match(/^\d+$/)) return 'Conversation'; // For chat detail view
        return path.charAt(0).toUpperCase() + path.slice(1);
    };
    
    const pageTitle = getPageTitle(location.pathname);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
                setIsProfileMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="flex items-center justify-between h-16 px-4 sm:px-6 bg-white border-b border-gray-200 flex-shrink-0 z-10">
            <div className="flex items-center">
                 <button
                    onClick={onToggleSidebar}
                    className="md:hidden mr-4 text-gray-500 hover:text-gray-700"
                    aria-label="Open sidebar"
                >
                    <MenuIcon className="h-6 w-6" />
                </button>
                 <h1 className="text-lg font-semibold text-dark capitalize">{pageTitle}</h1>
            </div>

            <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100 hover:text-gray-700">
                    <BellIcon className="h-6 w-6" />
                </button>
                <div className="relative" ref={profileMenuRef}>
                    <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100">
                        <UserCircleIcon className="h-8 w-8 text-gray-400" />
                        <span className="hidden sm:inline ml-2 text-sm font-medium text-gray-700">Alex</span>
                    </button>
                    {isProfileMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 ring-1 ring-black ring-opacity-5">
                            <Link
                                to="/dashboard/account"
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsProfileMenuOpen(false)}
                            >
                                <UserCircleIcon className="h-5 w-5 mr-2 text-gray-500" />
                                Account
                            </Link>
                            <Link
                                to="/login"
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsProfileMenuOpen(false)}
                            >
                                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2 text-gray-500" />
                                Logout
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
