import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { MenuIcon, SunIcon, MoonIcon, BellIcon, UserCircleIcon, LogoutIcon } from './icons.tsx';
import { supabase } from '../supabaseClient.tsx';

interface SuperAdminHeaderProps {
    onToggleSidebar: () => void;
}

const getTitle = (pathname: string): string => {
    const route = pathname.split('/superadmin/')[1]?.split('/')[0];
    switch (route) {
        case undefined: return 'Dashboard';
        case 'users': return 'User Management';
        case 'settings': return 'System Settings';
        case 'workspaces': return 'Workspaces';
        case 'financials': return 'Financials';
        case 'analytics': return 'Analytics';
        case 'logs': return 'Platform Logs';
        case 'announcements': return 'Announcements';
        default: return 'Super Admin';
    }
};

const SuperAdminHeader: React.FC<SuperAdminHeaderProps> = ({ onToggleSidebar }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isDark, setIsDark] = useState(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            return true;
        }
        document.documentElement.classList.remove('dark');
        return false;
    });
    const [loggingOut, setLoggingOut] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const title = getTitle(location.pathname);

    const toggleTheme = () => {
        setIsDark(!isDark);
        if (!isDark) {
            localStorage.theme = 'dark';
            document.documentElement.classList.add('dark');
        } else {
            localStorage.theme = 'light';
            document.documentElement.classList.remove('dark');
        }
    };

    const handleLogout = async () => {
        setLoggingOut(true);
        setIsProfileOpen(false);
        await supabase.auth.signOut();
        navigate('/login');
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="flex-shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between p-4 h-16">
                 <div className="flex items-center">
                    <button onClick={onToggleSidebar} className="md:hidden mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <MenuIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                    </button>
                    <h1 className="text-xl font-semibold text-dark dark:text-white">{title}</h1>
                </div>

                <div className="flex items-center space-x-4">
                    <button onClick={toggleTheme} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                        {isDark ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
                    </button>
                    <button className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <BellIcon className="h-6 w-6" />
                    </button>
                    
                    <div className="relative" ref={profileRef}>
                        <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                           <UserCircleIcon className="h-8 w-8 rounded-full text-gray-500" />
                           <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-200">Super Admin</span>
                        </button>

                        {isProfileOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                                <Link to="/superadmin/settings" onClick={() => setIsProfileOpen(false)} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    System Settings
                                </Link>
                                <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>
                                <button onClick={handleLogout} disabled={loggingOut} className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50">
                                     <LogoutIcon className="w-5 h-5 mr-2" /> {loggingOut ? 'Signing out...' : 'Sign out'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default SuperAdminHeader;