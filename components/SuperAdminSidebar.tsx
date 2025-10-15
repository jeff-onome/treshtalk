import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { 
    LogoIcon, 
    ChartBarIcon,
    UsersIcon,
    CogIcon,
    BuildingOfficeIcon,
    CurrencyDollarIcon,
    DocumentTextIcon,
    BellIcon,
} from './icons.tsx';

interface SuperAdminSidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const navItems = [
    { to: '/superadmin', label: 'Dashboard', icon: <ChartBarIcon className="h-6 w-6" /> },
    { to: '/superadmin/analytics', label: 'Analytics', icon: <ChartBarIcon className="h-6 w-6" /> },
    { to: '/superadmin/financials', label: 'Financials', icon: <CurrencyDollarIcon className="h-6 w-6" /> },
    { to: '/superadmin/users', label: 'Users', icon: <UsersIcon className="h-6 w-6" /> },
    { to: '/superadmin/workspaces', label: 'Workspaces', icon: <BuildingOfficeIcon className="h-6 w-6" /> },
    { to: '/superadmin/settings', label: 'System Settings', icon: <CogIcon className="h-6 w-6" /> },
    { to: '/superadmin/logs', label: 'Platform Logs', icon: <DocumentTextIcon className="h-6 w-6" /> },
    { to: '/superadmin/announcements', label: 'Announcements', icon: <BellIcon className="h-6 w-6" /> },
];

const SidebarContent: React.FC<{onLinkClick?: () => void}> = ({ onLinkClick }) => {
    const getNavLinkClass = ({ isActive }: { isActive: boolean }) => 
        `flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors duration-200 ${
            isActive 
                ? 'bg-primary text-white' 
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`;

    return (
        <>
            <div className="flex items-center justify-center h-16 border-b border-gray-700 flex-shrink-0">
                <Link to="/superadmin" className="flex items-center gap-2">
                    <LogoIcon className="h-8 w-auto text-primary" />
                    <span className="text-white text-xl font-bold">TreshTalk</span>
                </Link>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
                <nav className="px-4 py-4 space-y-2">
                    {navItems.map(item => (
                        <NavLink key={item.to} end={item.to === '/superadmin'} to={item.to} className={getNavLinkClass} onClick={onLinkClick}>
                            {item.icon}
                            <span className="ml-3">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>
        </>
    )
}

const SuperAdminSidebar: React.FC<SuperAdminSidebarProps> = ({ isOpen, setIsOpen }) => {
    return (
        <>
            {/* Mobile Sidebar */}
            <div className={`fixed inset-0 z-40 flex md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="fixed inset-0 bg-black bg-opacity-60" aria-hidden="true" onClick={() => setIsOpen(false)}></div>
                <div className={`relative flex-1 flex flex-col max-w-xs w-full bg-dark text-white transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <SidebarContent onLinkClick={() => setIsOpen(false)} />
                </div>
            </div>

            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-64 bg-dark text-white flex-shrink-0">
                <SidebarContent />
            </aside>
        </>
    );
};

export default SuperAdminSidebar;