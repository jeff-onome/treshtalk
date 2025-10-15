import React, { useState } from 'react';

const TabButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${active ? 'bg-primary text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
    >
        {children}
    </button>
);

const SuperAdminLogsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Access');
    
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-dark dark:text-white">Platform Logs</h1>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="p-4 border-b dark:border-gray-700 flex items-center space-x-2 overflow-x-auto">
                    <TabButton active={activeTab === 'Access'} onClick={() => setActiveTab('Access')}>Access Logs</TabButton>
                    <TabButton active={activeTab === 'Errors'} onClick={() => setActiveTab('Errors')}>Error Logs</TabButton>
                    <TabButton active={activeTab === 'Audit'} onClick={() => setActiveTab('Audit')}>Audit Trail</TabButton>
                </div>
                <div className="p-6">
                    {activeTab === 'Access' && (
                        <div>
                           <h2 className="text-xl font-bold text-dark dark:text-white mb-4">User Access Logs</h2>
                           <p className="text-gray-600 dark:text-gray-400">A real-time feed of user login attempts (successful and failed), IP addresses, and device information.</p>
                        </div>
                    )}
                    {activeTab === 'Errors' && (
                         <div>
                           <h2 className="text-xl font-bold text-dark dark:text-white mb-4">System Error Logs</h2>
                           <p className="text-gray-600 dark:text-gray-400">A centralized log viewer for system or API errors, with stack traces and timestamps.</p>
                        </div>
                    )}
                    {activeTab === 'Audit' && (
                         <div>
                           <h2 className="text-xl font-bold text-dark dark:text-white mb-4">Admin Audit Trail</h2>
                           <p className="text-gray-600 dark:text-gray-400">An immutable log of every action taken by any Super Admin in this dashboard.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SuperAdminLogsPage;