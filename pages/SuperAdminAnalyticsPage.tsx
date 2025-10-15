import React, { useState } from 'react';
import { ChartBarIcon, UsersIcon, GlobeAltIcon } from '../components/icons.tsx';

const TabButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${active ? 'bg-primary text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
    >
        {children}
    </button>
);

const SuperAdminAnalyticsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Users');

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-dark dark:text-white">Platform Analytics</h1>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="p-4 border-b dark:border-gray-700 flex items-center space-x-2 overflow-x-auto">
                    <TabButton active={activeTab === 'Users'} onClick={() => setActiveTab('Users')}>User Insights</TabButton>
                    <TabButton active={activeTab === 'Usage'} onClick={() => setActiveTab('Usage')}>Platform Usage</TabButton>
                    <TabButton active={activeTab === 'Geo'} onClick={() => setActiveTab('Geo')}>Geolocation</TabButton>
                </div>

                <div className="p-6">
                    {activeTab === 'Users' && (
                        <div>
                           <h2 className="text-xl font-bold text-dark dark:text-white mb-4">User Insights</h2>
                           <p className="text-gray-600 dark:text-gray-400">Charts showing DAU/MAU, user growth, retention, and churn rates.</p>
                        </div>
                    )}
                    {activeTab === 'Usage' && (
                         <div>
                           <h2 className="text-xl font-bold text-dark dark:text-white mb-4">Platform Usage</h2>
                           <p className="text-gray-600 dark:text-gray-400">Analytics on chat volume, feature adoption, and AI response rates.</p>
                        </div>
                    )}
                    {activeTab === 'Geo' && (
                         <div>
                           <h2 className="text-xl font-bold text-dark dark:text-white mb-4">Geolocation Heatmap</h2>
                           <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-96 flex items-center justify-center">
                                <p className="text-gray-500">Simulated heatmap of user activity will be displayed here.</p>
                           </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SuperAdminAnalyticsPage;