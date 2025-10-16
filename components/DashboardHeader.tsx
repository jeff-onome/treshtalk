

import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { MenuIcon, SunIcon, MoonIcon, UserCircleIcon, LogoutIcon } from './icons.tsx';
import { useAuth } from '../contexts/AuthContext.tsx';
import { supabase } from '../supabaseClient.tsx';

interface DashboardHeaderProps {
    onToggleSidebar: () => void;
}

const getTitle = (pathname: string): string => {
    const route = pathname.split('/dashboard/')[1]?.split('/')[0] || 'chats';
    switch (route) {
        case 'chats': return 'Chats';
        case 'visitors': return 'Visitors';
        case 'reports': return 'Reports';
        case 'automations': return 'Automations';
        case 'kb': return 'Knowledge Base';
        case 'team': return 'Team';
        case 'integrations': return 'Integrations';
        case 'settings': return 'Settings';
        case 'installation': return 'Installation';
        case 'account': return 'My Account';
        default: return 'Dashboard';
    }
};

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onToggleSidebar }) => {
    const { user, profile } = useAuth();
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
        try {
          await supabase.auth.signOut();
          navigate('/login');
        } catch (error) {
          console.error("Error logging out:", error);
        } finally {
          setLoggingOut(false);
        }
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

    const avatarUrl = profile?.avatar_url || `https://ui-avatars.com/api/?name=${profile?.full_name || user?.email}&background=random`;

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
                    
                    <div className="relative" ref={profileRef}>
                        <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                           <img className="h-8 w-8 rounded-full object-cover" src={avatarUrl} alt="User" />
                           <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-200">{profile?.full_name || user?.email?.split('@')[0]}</span>
                        </button>

                        {isProfileOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                                <Link to="/dashboard/account" onClick={() => setIsProfileOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <UserCircleIcon className="w-5 h-5 mr-2" /> Your Profile
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

export default DashboardHeader;