import React from 'react';
import { UsersIcon, BuildingOfficeIcon, CurrencyDollarIcon, ServerIcon } from '../components/icons.tsx';

const StatCard: React.FC<{ title: string; value: string; change: string; icon: React.ReactNode }> = ({ title, value, change, icon }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="flex items-start justify-between">
            <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
                <p className="text-3xl font-bold text-dark dark:text-white mt-1">{value}</p>
                <p className={`text-sm mt-1 ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{change} vs last month</p>
            </div>
            <div className="bg-primary-light text-primary p-3 rounded-full flex-shrink-0">
                {icon}
            </div>
        </div>
    </div>
);

const GrowthChart: React.FC = () => {
    // Dummy data for the chart
    const data = [45, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 90];
    const maxVal = Math.max(...data);
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-dark dark:text-white mb-4">New User Growth</h2>
            <div className="h-64 flex items-end justify-between space-x-2">
                {data.map((val, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center">
                        <div 
                            className="w-full bg-primary-light rounded-t-md hover:bg-primary transition-colors" 
                            style={{ height: `${(val / maxVal) * 90}%` }}
                            title={`${val} new users`}
                        ></div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{new Date(0, i).toLocaleString('default', { month: 'short' })}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const SuperAdminDashboardPage: React.FC = () => {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Users" value="12,456" change="+5.4%" icon={<UsersIcon className="h-6 w-6" />} />
                <StatCard title="Active Workspaces" value="1,280" change="+2.1%" icon={<BuildingOfficeIcon className="h-6 w-6" />} />
                <StatCard title="MRR" value="$85,320" change="+8.2%" icon={<CurrencyDollarIcon className="h-6 w-6" />} />
                <StatCard title="Platform Health" value="Operational" change="99.9% Uptime" icon={<ServerIcon className="h-6 w-6" />} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <GrowthChart />
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-dark dark:text-white mb-4">System Health</h2>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm mb-1"><span className="text-gray-600 dark:text-gray-300">CPU Load</span><span className="font-semibold text-dark dark:text-white">34%</span></div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5"><div className="bg-green-500 h-2.5 rounded-full" style={{width: '34%'}}></div></div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1"><span className="text-gray-600 dark:text-gray-300">Memory Usage</span><span className="font-semibold text-dark dark:text-white">68%</span></div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5"><div className="bg-yellow-500 h-2.5 rounded-full" style={{width: '68%'}}></div></div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1"><span className="text-gray-600 dark:text-gray-300">Database Connections</span><span className="font-semibold text-dark dark:text-white">128 / 500</span></div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5"><div className="bg-blue-500 h-2.5 rounded-full" style={{width: `${(128/500)*100}%`}}></div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminDashboardPage;