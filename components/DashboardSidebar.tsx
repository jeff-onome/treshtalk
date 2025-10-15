import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { 
    LogoIcon, 
    ChatBubbleIcon,
    UsersIcon,
    ChartBarIcon,
    CogIcon,
    QuestionMarkCircleIcon,
    CodeIcon,
    PuzzleIcon
} from './icons';

interface DashboardSidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const navItems = [
    { to: '/dashboard/chats', label: 'Chats', icon: <ChatBubbleIcon className="h-6 w-6" /> },
    { to: '/dashboard/visitors', label: 'Visitors', icon: <UsersIcon className="h-6 w-6" /> },
    { to: '/dashboard/reports', label: 'Reports', icon: <ChartBarIcon className="h-6 w-6" /> },
    { to: '/dashboard/automations', label: 'Automations', icon: <CogIcon className="h-6 w-6" /> },
    { to: '/dashboard/kb', label: 'Knowledge Base', icon: <QuestionMarkCircleIcon className="h-6 w-6" /> },
];

const settingsItems = [
    { to: '/dashboard/team', label: 'Team', icon: <UsersIcon className="h-6 w-6" /> },
    { to: '/dashboard/integrations', label: 'Integrations', icon: <PuzzleIcon className="h-6 w-6" /> },
    { to: '/dashboard/settings', label: 'Settings', icon: <CogIcon className="h-6 w-6" /> },
    { to: '/dashboard/installation', label: 'Installation', icon: <CodeIcon className="h-6 w-6" /> },
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
                <Link to="/" className="flex items-center gap-2">
                    <LogoIcon className="h-8 w-auto text-primary" />
                    <span className="text-xl font-bold">TreshTalk</span>
                </Link>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
                <nav className="px-4 py-4 space-y-2">
                    {navItems.map(item => (
                        <NavLink key={item.to} to={item.to} className={getNavLinkClass} onClick={onLinkClick}>
                            {item.icon}
                            <span className="ml-3">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>
                <div className="px-4 py-4 border-t border-gray-700">
                    <h3 className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Settings</h3>
                    <nav className="space-y-2">
                         {settingsItems.map(item => (
                            <NavLink key={item.to} to={item.to} className={getNavLinkClass} onClick={onLinkClick}>
                                {item.icon}
                                <span className="ml-3">{item.label}</span>
                            </NavLink>
                        ))}
                    </nav>
                </div>
            </div>
        </>
    )
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ isOpen, setIsOpen }) => {

    return (
        <>
            {/* Mobile Sidebar */}
            <div className={`fixed inset-0 z-40 flex md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="fixed inset-0 bg-black bg-opacity-60" onClick={() => setIsOpen(false)}></div>
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

export default DashboardSidebar;