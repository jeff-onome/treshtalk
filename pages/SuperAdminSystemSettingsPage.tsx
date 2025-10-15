import React, { useState } from 'react';
import { KeyIcon, ShieldCheckIcon, CurrencyDollarIcon, BookOpenIcon, CircleStackIcon } from '../components/icons.tsx';

const TabButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${active ? 'bg-primary text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
    >
        {children}
    </button>
);

const SuperAdminSystemSettingsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Plans');

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-dark dark:text-white">System Settings</h1>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="p-4 border-b dark:border-gray-700 flex items-center space-x-2 overflow-x-auto">
                    <TabButton active={activeTab === 'Plans'} onClick={() => setActiveTab('Plans')}>Subscription Plans</TabButton>
                    <TabButton active={activeTab === 'Security'} onClick={() => setActiveTab('Security')}>Security</TabButton>
                    <TabButton active={activeTab === 'Billing'} onClick={() => setActiveTab('Billing')}>Billing & Payments</TabButton>
                    <TabButton active={activeTab === 'Content'} onClick={() => setActiveTab('Content')}>Content</TabButton>
                    <TabButton active={activeTab === 'Data'} onClick={() => setActiveTab('Data')}>Data & Backups</TabButton>
                </div>

                <div className="p-6">
                    {activeTab === 'Plans' && (
                        <div>
                           <h2 className="text-xl font-bold text-dark dark:text-white mb-4">Manage Subscription Plans</h2>
                           <p className="text-gray-600 dark:text-gray-400">Define pricing tiers, feature limits, and toggle features for each plan.</p>
                        </div>
                    )}
                    {activeTab === 'Security' && (
                         <div>
                           <h2 className="text-xl font-bold text-dark dark:text-white mb-4">Security Settings</h2>
                           <div className="space-y-4 max-w-md">
                               <div className="flex items-center justify-between p-4 border dark:border-gray-700 rounded-lg">
                                    <span className="text-gray-700 dark:text-gray-300">Enforce Two-Factor Authentication (2FA)</span>
                                    <div className="w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 duration-300 cursor-pointer"><div className="bg-white w-4 h-4 rounded-full shadow-md transform duration-300"></div></div>
                               </div>
                               <div>
                                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Minimum Password Length</label>
                                   <input type="number" defaultValue="8" className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 dark:text-white" />
                               </div>
                           </div>
                        </div>
                    )}
                    {activeTab === 'Billing' && (
                         <div>
                           <h2 className="text-xl font-bold text-dark dark:text-white mb-4">Billing & Payment Gateway</h2>
                            <div className="space-y-4 max-w-lg">
                                <div>
                                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Stripe API Key</label>
                                   <input type="password" placeholder="sk_live_************************" className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 dark:text-white" />
                               </div>
                               <div>
                                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Paystack API Key</label>
                                   <input type="password" placeholder="pk_live_************************" className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 dark:text-white" />
                               </div>
                           </div>
                        </div>
                    )}
                     {activeTab === 'Content' && (
                         <div>
                           <h2 className="text-xl font-bold text-dark dark:text-white mb-4">Content Management</h2>
                           <p className="text-gray-600 dark:text-gray-400">Manage global chatbot templates and platform-wide language options.</p>
                        </div>
                    )}
                    {activeTab === 'Data' && (
                         <div>
                           <h2 className="text-xl font-bold text-dark dark:text-white mb-4">Data & Backups</h2>
                            <div className="space-y-4 max-w-lg">
                                <div>
                                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Data Retention Policy (in days)</label>
                                   <input type="number" defaultValue="365" className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 dark:text-white" />
                                   <p className="text-xs text-gray-500 mt-1">Chat history older than this will be automatically deleted.</p>
                               </div>
                               <button className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary-hover">Create New Backup</button>
                           </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SuperAdminSystemSettingsPage;