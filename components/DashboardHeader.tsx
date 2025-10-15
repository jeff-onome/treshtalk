import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BellIcon, MenuIcon } from './icons';

interface DashboardHeaderProps {
    onToggleSidebar: () => void;
}

const getTitle = (pathname: string) => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length < 2) return 'Dashboard';
    const lastSegment = segments[segments.length - 1];

    if (lastSegment.match(/^[a-f\d]{1}$/i)) { // Simple check for chat ID
        return 'Chat Details';
    }

    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onToggleSidebar }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const location = useLocation();

    const title = getTitle(location.pathname);

    const handleLogout = () => {
        setIsProfileOpen(false);
        navigate('/login');
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [profileRef]);

    return (
        <header className="flex-shrink-0 bg-white border-b border-gray-200">
            <div className="flex items-center justify-between p-4 h-16">
                 <div className="flex items-center">
                    <button onClick={onToggleSidebar} className="md:hidden mr-4 p-2 rounded-full hover:bg-gray-100">
                        <MenuIcon className="h-6 w-6 text-gray-600" />
                    </button>
                    <h1 className="text-xl font-semibold text-dark">{title}</h1>
                </div>

                <div className="flex items-center space-x-4">
                    <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                        <BellIcon className="h-6 w-6" />
                    </button>
                    
                    <div className="relative" ref={profileRef}>
                        <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100">
                           <img className="h-8 w-8 rounded-full" src="https://picsum.photos/seed/alex/100/100" alt="User" />
                           <span className="hidden sm:inline text-sm font-medium text-gray-700">Alex</span>
                        </button>

                        {isProfileOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                                <Link to="/dashboard/account" onClick={() => setIsProfileOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Your Profile
                                </Link>
                                <Link to="/dashboard/settings" onClick={() => setIsProfileOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Settings
                                </Link>
                                <div className="border-t border-gray-100 my-1"></div>
                                <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Sign out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;