import React from 'react';
import { ChartBarIcon, ClockIcon, ThumbsUpIcon, CursorArrowRaysIcon } from '../components/icons.tsx';

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-light text-primary dark:bg-gray-700">
                {icon}
            </div>
            <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase">{title}</p>
                <p className="text-2xl font-bold text-dark dark:text-white">{value}</p>
            </div>
        </div>
    </div>
);

const ReportsPage: React.FC = () => {
    // Mock data for demonstration
    const reportData = {
        totalChats: 1420,
        avgResponseTime: '1m 32s',
        satisfaction: '92%',
        resolutionRate: '85%',
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-dark dark:text-white">Reports & Analytics</h1>
                <div>
                    <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white">
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                        <option>Last 90 Days</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Chats" value={reportData.totalChats} icon={<ChartBarIcon className="h-6 w-6" />} />
                <StatCard title="Avg. Response Time" value={reportData.avgResponseTime} icon={<ClockIcon className="h-6 w-6" />} />
                <StatCard title="Satisfaction Score" value={reportData.satisfaction} icon={<ThumbsUpIcon className="h-6 w-6" />} />
                <StatCard title="Resolution Rate" value={reportData.resolutionRate} icon={<CursorArrowRaysIcon className="h-6 w-6" />} />
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                 <h2 className="text-lg font-bold text-dark dark:text-white">Chat Volume Over Time</h2>
                 <p className="text-sm text-gray-500 dark:text-gray-400">A visual representation of chat activity.</p>
                 <div className="h-80 bg-gray-100 dark:bg-gray-700 mt-4 rounded-md flex items-center justify-center">
                    <p className="text-gray-400 dark:text-gray-500">Chart will be displayed here</p>
                </div>
            </div>
             <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                 <h2 className="text-lg font-bold text-dark dark:text-white">Agent Performance</h2>
                 <p className="text-sm text-gray-500 dark:text-gray-400">Metrics for individual team members.</p>
                 <div className="h-64 bg-gray-100 dark:bg-gray-700 mt-4 rounded-md flex items-center justify-center">
                    <p className="text-gray-400 dark:text-gray-500">Agent performance data will be displayed here</p>
                </div>
            </div>
        </div>
    );
};

export default ReportsPage;
