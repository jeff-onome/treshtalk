import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.tsx';
import { supabase } from '../supabaseClient.tsx';
import { ChartBarIcon, CursorArrowRaysIcon, ExclamationCircleIcon, ThumbsUpIcon } from '../components/icons.tsx';

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-light text-primary dark:bg-gray-700">{icon}</div>
            <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase">{title}</p>
                <p className="text-2xl font-bold text-dark dark:text-white">{value}</p>
            </div>
        </div>
    </div>
);

const ReportsPage: React.FC = () => {
    const { workspaceId } = useAuth();
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            if (!workspaceId) return;
            setLoading(true);
            try {
                const { data, error } = await supabase.rpc('get_workspace_chat_stats', { p_workspace_id: workspaceId });
                if (error) throw error;
                setStats(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [workspaceId]);

    if (loading) {
        return <div className="text-center text-gray-500 dark:text-gray-300">Loading reports...</div>
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Chats" value={stats?.total_chats ?? 0} icon={<ChartBarIcon className="h-6 w-6" />} />
                <StatCard title="Avg Response Time" value={stats?.avg_response_time ?? 'N/A'} icon={<ThumbsUpIcon className="h-6 w-6" />} />
                <StatCard title="Missed Chats" value={stats?.missed_chats ?? 0} icon={<ExclamationCircleIcon className="h-6 w-6" />} />
                <StatCard title="Engagement Rate" value={`${stats?.engagement_rate ?? 0}%`} icon={<CursorArrowRaysIcon className="h-6 w-6" />} />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                <h2 className="text-lg font-bold text-dark dark:text-white p-4 border-b dark:border-gray-700">Agent Activity</h2>
                 <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                    Agent activity tracking is coming soon.
                </div>
            </div>
        </div>
    );
};

export default ReportsPage;