
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
    LogoIcon,
    ChatBubbleIcon,
    ChartBarIcon,
    CogIcon,
    CodeBracketIcon,
    UserCircleIcon,
    ArrowRightOnRectangleIcon,
    CloseIcon
} from './icons';

interface DashboardSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ isOpen, onClose }) => {
    const navLinkClasses = "flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors";
    const activeNavLinkClasses = "bg-primary text-white";

    const getNavLinkClass = ({ isActive }: { isActive: boolean }) => isActive ? `${navLinkClasses} ${activeNavLinkClasses}` : navLinkClasses;
    
    const SidebarContent = () => (
        <div className="flex flex-col flex-grow p-4 space-y-2">
            <NavLink to="/dashboard/chats" className={getNavLinkClass} onClick={onClose}>
                <ChatBubbleIcon className="h-6 w-6 mr-3" />
                <span>Chats</span>
            </NavLink>
            <NavLink to="/dashboard/reports" className={getNavLinkClass} onClick={onClose}>
                <ChartBarIcon className="h-6 w-6 mr-3" />
                <span>Reports</span>
            </NavLink>
            <NavLink to="/dashboard/installation" className={getNavLinkClass} onClick={onClose}>
                <CodeBracketIcon className="h-6 w-6 mr-3" />
                <span>Installation</span>
            </NavLink>
            <NavLink to="/dashboard/settings" className={getNavLinkClass} onClick={onClose}>
                <CogIcon className="h-6 w-6 mr-3" />
                <span>Settings</span>
            </NavLink>

            <div className="flex-grow"></div>
            
            <NavLink to="/dashboard/account" className={getNavLinkClass} onClick={onClose}>
                <UserCircleIcon className="h-6 w-6 mr-3" />
                <span>Account</span>
            </NavLink>
            <Link to="/login" className={navLinkClasses} onClick={onClose}>
                <ArrowRightOnRectangleIcon className="h-6 w-6 mr-3" />
                <span>Logout</span>
            </Link>
        </div>
    );
    
    return (
        <>
            {/* Desktop Sidebar */}
            <div className="hidden md:flex md:flex-col md:w-64 bg-dark">
                <div className="flex items-center justify-center h-16 border-b border-gray-700">
                    <Link to="/" className="flex items-center gap-2 text-white">
                        <LogoIcon className="h-8 w-auto text-primary" />
                        <span className="text-xl font-bold">Treshchat</span>
                    </Link>
                </div>
                <SidebarContent />
            </div>

            {/* Mobile Sidebar */}
            <div
                className={`fixed inset-0 z-30 transition-opacity bg-black bg-opacity-50 md:hidden ${
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={onClose}
                aria-hidden="true"
            ></div>
            <div
                className={`fixed inset-y-0 left-0 z-40 w-64 bg-dark transform transition-transform ease-in-out duration-300 md:hidden ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                 <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
                    <Link to="/" className="flex items-center gap-2 text-white" onClick={onClose}>
                        <LogoIcon className="h-8 w-auto text-primary" />
                        <span className="text-xl font-bold">Treshchat</span>
                    </Link>
                    <button onClick={onClose} className="text-gray-400 hover:text-white p-2">
                        <CloseIcon className="h-6 w-6" />
                    </button>
                </div>
                <SidebarContent />
            </div>
        </>
    );
};

export default DashboardSidebar;
