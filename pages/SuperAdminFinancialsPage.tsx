import React, { useState } from 'react';

const TabButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${active ? 'bg-primary text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
    >
        {children}
    </button>
);

const SuperAdminFinancialsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Overview');

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-dark dark:text-white">Financials</h1>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="p-4 border-b dark:border-gray-700 flex items-center space-x-2 overflow-x-auto">
                    <TabButton active={activeTab === 'Overview'} onClick={() => setActiveTab('Overview')}>Overview</TabButton>
                    <TabButton active={activeTab === 'Invoices'} onClick={() => setActiveTab('Invoices')}>Invoices</TabButton>
                    <TabButton active={activeTab === 'Transactions'} onClick={() => setActiveTab('Transactions')}>Transactions</TabButton>
                    <TabButton active={activeTab === 'Promo'} onClick={() => setActiveTab('Promo')}>Promo Codes</TabButton>
                </div>

                <div className="p-6">
                    {activeTab === 'Overview' && (
                        <div>
                           <h2 className="text-xl font-bold text-dark dark:text-white mb-4">Revenue Overview</h2>
                           <p className="text-gray-600 dark:text-gray-400">Placeholder for MRR, Churn, and LTV charts and metrics.</p>
                        </div>
                    )}
                    {activeTab === 'Invoices' && (
                         <div>
                           <h2 className="text-xl font-bold text-dark dark:text-white mb-4">Invoice Management</h2>
                           <p className="text-gray-600 dark:text-gray-400">Table of all generated invoices, with options to view, download, or resend.</p>
                        </div>
                    )}
                    {activeTab === 'Transactions' && (
                         <div>
                           <h2 className="text-xl font-bold text-dark dark:text-white mb-4">Transaction History</h2>
                            <p className="text-gray-600 dark:text-gray-400">A detailed log of all payments, refunds, and disputes across the platform.</p>
                        </div>
                    )}
                     {activeTab === 'Promo' && (
                         <div>
                           <h2 className="text-xl font-bold text-dark dark:text-white mb-4">Promo Codes & Discounts</h2>
                           <p className="text-gray-600 dark:text-gray-400">Interface to create and manage promotional codes for marketing campaigns.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SuperAdminFinancialsPage;