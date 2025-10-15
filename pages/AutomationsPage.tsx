import React from 'react';

const mockAutomations = [
    { id: 1, title: 'Welcome new visitors', description: 'Send a greeting message to first-time visitors after 15 seconds.', active: true, triggered: 152, conversion: '12%' },
    { id: 2, title: 'Offer help on pricing page', description: 'If a visitor spends more than 60 seconds on the pricing page, offer assistance.', active: true, triggered: 89, conversion: '18%' },
    { id: 3, title: 'Abandoned cart reminder', description: 'Engage visitors who have items in their cart but seem inactive.', active: false, triggered: 0, conversion: '0%' },
];

const AutomationsPage: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-dark dark:text-white">Automations</h1>
                <button className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary-hover transition-colors">
                    New Automation
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockAutomations.map(automation => (
                    <div key={automation.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col">
                        <div className="flex justify-between items-start">
                            <h2 className="text-lg font-bold text-dark dark:text-white flex-1 pr-4">{automation.title}</h2>
                            <label htmlFor={`toggle-${automation.id}`} className="flex items-center cursor-pointer">
                                <div className="relative">
                                    <input type="checkbox" id={`toggle-${automation.id}`} className="sr-only" defaultChecked={automation.active} />
                                    <div className={`block w-12 h-6 rounded-full ${automation.active ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                                    <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${automation.active ? 'transform translate-x-6' : ''}`}></div>
                                </div>
                            </label>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 flex-grow">{automation.description}</p>
                        <div className="mt-6 border-t dark:border-gray-700 pt-4 flex justify-between text-sm">
                            <div className="text-center">
                                <p className="font-bold text-dark dark:text-white">{automation.triggered}</p>
                                <p className="text-gray-500 dark:text-gray-400">Triggered</p>
                            </div>
                            <div className="text-center">
                                <p className="font-bold text-dark dark:text-white">{automation.conversion}</p>
                                <p className="text-gray-500 dark:text-gray-400">Conversion</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AutomationsPage;