import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { 
    LogoIcon, 
    ChatBubbleIcon,
    UsersIcon,
    ChartBarIcon,
    WrenchScrewdriverIcon,
    BookOpenIcon,
    UserGroupIcon,
    PuzzlePieceIcon,
    CogIcon,
    CodeIcon,
} from './icons.tsx';
import { useAuth } from '../contexts/AuthContext.tsx';

interface DashboardSidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const navItems = [
    { to: '/dashboard/chats', label: 'Chats', icon: <ChatBubbleIcon className="h-6 w-6" /> },
    { to: '/dashboard/visitors', label: 'Visitors', icon: <UsersIcon className="h-6 w-6" /> },
    { to: '/dashboard/reports', label: 'Reports', icon: <ChartBarIcon className="h-6 w-6" /> },
    { to: '/dashboard/automations', label: 'Automations', icon: <WrenchScrewdriverIcon className="h-6 w-6" /> },
    { to: '/dashboard/kb', label: 'Knowledge Base', icon: <BookOpenIcon className="h-6 w-6" /> },
    { to: '/dashboard/team', label: 'Team', icon: <UserGroupIcon className="h-6 w-6" /> },
    { to: '/dashboard/integrations', label: 'Integrations', icon: <PuzzlePieceIcon className="h-6 w-6" /> },
];

const bottomNavItems = [
    { to: '/dashboard/installation', label: 'Installation', icon: <CodeIcon className="h-6 w-6" /> },
    { to: '/dashboard/settings', label: 'Settings', icon: <CogIcon className="h-6 w-6" /> },
]

const SidebarContent: React.FC<{onLinkClick?: () => void}> = ({ onLinkClick }) => {
    const { workspaceId } = useAuth();
    
    const getNavLinkClass = ({ isActive }: { isActive: boolean }) => 
        `flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors duration-200 ${
            isActive 
                ? 'bg-primary text-white' 
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`;

    if (!workspaceId) {
        return (
            <div className="p-4 text-center text-gray-400">
                Loading workspace...
            </div>
        )
    }

    return (
        <>
            <div className="flex items-center justify-center h-16 border-b border-gray-700 flex-shrink-0 px-4">
                <Link to="/dashboard" className="flex items-center gap-2 w-full">
                    <LogoIcon className="h-8 w-auto text-primary" />
                    <span className="text-white text-xl font-bold">TreshTalk</span>
                </Link>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
                <nav className="flex-1 px-4 py-4 space-y-2">
                    {navItems.map(item => (
                        <NavLink key={item.to} to={item.to} className={getNavLinkClass} onClick={onLinkClick}>
                            {item.icon}
                            <span className="ml-3">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>
                <nav className="px-4 py-4 space-y-2 border-t border-gray-700">
                     {bottomNavItems.map(item => (
                        <NavLink key={item.to} to={item.to} className={getNavLinkClass} onClick={onLinkClick}>
                            {item.icon}
                            <span className="ml-3">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>
        </>
    )
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ isOpen, setIsOpen }) => {
    return (
        <>
            {/* Mobile Sidebar */}
            <div className={`fixed inset-0 z-40 flex md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="fixed inset-0 bg-black bg-opacity-60" aria-hidden="true" onClick={() => setIsOpen(false)}></div>
                <div className={`relative flex-1 flex flex-col max-w-xs w-full bg-dark text-white transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                     <div className="absolute top-0 right-0 -mr-12 pt-2">
                        <button
                            type="button"
                            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            onClick={() => setIsOpen(false)}
                        >
                            <span className="sr-only">Close sidebar</span>
                            {/* Assuming you have a CloseIcon */}
                        </button>
                    </div>
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

export default DashboardSidebar;
