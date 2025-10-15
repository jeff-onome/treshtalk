import React, { useState } from 'react';

const SettingsSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6">
            <h2 className="text-xl font-bold text-dark dark:text-white mb-4">{title}</h2>
            <div className="space-y-4">{children}</div>
        </div>
    </div>
);

const Toggle: React.FC<{ label: string; enabled: boolean; setEnabled: (enabled: boolean) => void }> = ({ label, enabled, setEnabled }) => (
    <div className="flex items-center justify-between">
        <span className="text-gray-700 dark:text-gray-300">{label}</span>
        <label htmlFor={label.replace(/\s+/g, '-')} className="flex items-center cursor-pointer">
            <div className="relative">
                <input type="checkbox" id={label.replace(/\s+/g, '-')} className="sr-only" checked={enabled} onChange={() => setEnabled(!enabled)} />
                <div className={`block w-12 h-6 rounded-full ${enabled ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${enabled ? 'transform translate-x-6' : ''}`}></div>
            </div>
        </label>
    </div>
);

const SettingsPage: React.FC = () => {
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(false);
    const [widgetColor, setWidgetColor] = useState('#3B82F6');

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-dark dark:text-white">Settings</h1>

            <SettingsSection title="Notifications">
                <Toggle label="Email Notifications" enabled={emailNotifications} setEnabled={setEmailNotifications} />
                <Toggle label="Push Notifications" enabled={pushNotifications} setEnabled={setPushNotifications} />
            </SettingsSection>

            <SettingsSection title="Widget Customization">
                <div>
                    <label htmlFor="widgetColor" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Primary Color</label>
                    <div className="flex items-center gap-4">
                        <input
                            type="color"
                            id="widgetColor"
                            value={widgetColor}
                            onChange={(e) => setWidgetColor(e.target.value)}
                            className="p-1 h-10 w-14 block bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 cursor-pointer rounded-lg"
                        />
                         <input
                            type="text"
                            value={widgetColor}
                            onChange={(e) => setWidgetColor(e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-white dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                </div>
            </SettingsSection>

            <div className="flex justify-end">
                <button
                    type="button"
                    className="w-full sm:w-auto flex justify-center py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                    Save Settings
                </button>
            </div>
        </div>
    );
};

export default SettingsPage;
