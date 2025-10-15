import React, { useState } from 'react';
import { ChatBubbleIcon, CheckCircleIcon, UserCircleIcon, SmartInvitationsIcon, ThumbsUpIcon, CursorArrowRaysIcon, ExclamationCircleIcon } from '../components/icons.tsx';

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode; children?: React.ReactNode }> = ({ title, value, icon, children }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col justify-between">
        <div className="flex items-center">
            <div className="bg-primary-light text-primary p-3 rounded-full flex-shrink-0">
                {icon}
            </div>
            <div className="ml-4">
                <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
                <p className="text-2xl font-bold text-dark dark:text-white">{value}</p>
            </div>
        </div>
        {children && <div className="mt-4">{children}</div>}
    </div>
);

const BusiestTimesChart: React.FC = () => {
    const data = [
        { time: '12am', volume: 15 },
        { time: '3am', volume: 25 },
        { time: '6am', volume: 40 },
        { time: '9am', volume: 75 },
        { time: '12pm', volume: 95 },
        { time: '3pm', volume: 80 },
        { time: '6pm', volume: 60 },
        { time: '9pm', volume: 30 },
    ];
    const maxVolume = Math.max(...data.map(d => d.volume));

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-dark dark:text-white mb-4">Busiest Times</h2>
            <div className="h-64 flex items-end justify-between space-x-2">
                {data.map(item => (
                    <div key={item.time} className="flex-1 flex flex-col items-center">
                        <div 
                            className="w-full bg-primary-light rounded-t-md hover:bg-primary transition-colors" 
                            style={{ height: `${(item.volume / maxVolume) * 100}%` }}
                            title={`${item.volume} chats`}
                        ></div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{item.time}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const mockAgentData = [
    { name: 'Alex', avatar: 'https://picsum.photos/seed/alex/100/100', chatsHandled: 158, avgResponseTime: '22s' },
    { name: 'Maria', avatar: 'https://picsum.photos/seed/maria/100/100', chatsHandled: 121, avgResponseTime: '31s' },
    { name: 'David', avatar: 'https://picsum.photos/seed/david/100/100', chatsHandled: 142, avgResponseTime: '25s' },
];

const AgentActivityTable: React.FC = () => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-dark dark:text-white mb-4">Agent Activity</h2>
        <div className="overflow-x-auto">
            <table className="min-w-full">
                <thead>
                    <tr>
                        <th className="py-2 px-4 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Agent</th>
                        <th className="py-2 px-4 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Chats Handled</th>
                        <th className="py-2 px-4 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Avg. Response Time</th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {mockAgentData.map(agent => (
                        <tr key={agent.name}>
                            <td className="py-3 px-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <img className="h-8 w-8 rounded-full" src={agent.avatar} alt={agent.name} />
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-dark dark:text-white">{agent.name}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{agent.chatsHandled}</td>
                            <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{agent.avgResponseTime}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);


const ReportsPage: React.FC = () => {
    const [timeFilter, setTimeFilter] = useState<'Week' | 'Month' | 'Year'>('Month');

    const totalChatsData = {
        Week: '98',
        Month: '421',
        Year: '5,189'
    };

    const filterButtons = (
        <div className="flex items-center space-x-2">
            {(['Week', 'Month', 'Year'] as const).map(period => (
                <button
                    key={period}
                    onClick={() => setTimeFilter(period)}
                    className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                        timeFilter === period 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500'
                    }`}
                >
                    {period}
                </button>
            ))}
        </div>
    );

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-dark dark:text-white">Reports & Analytics</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <StatCard 
                    title="Total Chats" 
                    value={totalChatsData[timeFilter]} 
                    icon={<ChatBubbleIcon className="h-6 w-6" />} 
                >
                    {filterButtons}
                </StatCard>
                 <StatCard 
                    title="Avg. Response Time" 
                    value="28s" 
                    icon={<UserCircleIcon className="h-6 w-6" />} 
                />
                 <StatCard 
                    title="Resolved Chats" 
                    value="94%" 
                    icon={<CheckCircleIcon className="h-6 w-6" />} 
                />
                 <StatCard 
                    title="Proactive Chats" 
                    value="183" 
                    icon={<SmartInvitationsIcon className="h-6 w-6" />} 
                />
                <StatCard 
                    title="Chat Ratings" 
                    value="93% 👍" 
                    icon={<ThumbsUpIcon className="h-6 w-6" />} 
                />
                <StatCard 
                    title="Engagement Rate" 
                    value="7.8%" 
                    icon={<CursorArrowRaysIcon className="h-6 w-6" />} 
                />
                 <StatCard 
                    title="Missed Chats" 
                    value="14" 
                    icon={<ExclamationCircleIcon className="h-6 w-6" />} 
                />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <BusiestTimesChart />
                 <AgentActivityTable />
            </div>
        </div>
    );
};

export default ReportsPage;