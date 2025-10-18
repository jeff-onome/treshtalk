import React from 'react';

const SuperAdminSystemSettingsPage: React.FC = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-dark dark:text-white">System Settings</h1>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 max-w-2xl">
                <form className="space-y-6">
                    <div>
                        <label htmlFor="maintenance-mode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Maintenance Mode</label>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Put the platform into maintenance mode. Only super admins will be able to log in.</p>
                        <select id="maintenance-mode" className="mt-2 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm">
                            <option>Disabled</option>
                            <option>Enabled</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="new-registrations" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Allow New Registrations</label>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Enable or disable new user sign-ups.</p>
                        <select id="new-registrations" className="mt-2 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm">
                            <option>Enabled</option>
                            <option>Disabled</option>
                        </select>
                    </div>
                    <div className="pt-4">
                         <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary-hover">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SuperAdminSystemSettingsPage;
