import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient.tsx';
import { UsersIcon, CurrencyDollarIcon, BuildingOfficeIcon, ChartBarIcon } from '../components/icons.tsx';

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

const SuperAdminDashboardPage: React.FC = () => {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            try {
                 const { data, error } = await supabase.rpc('get_platform_stats');
                 if (error) throw error;
                 setStats(data);
            } catch (err) {
                 console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) {
        return <div className="text-center">Loading platform stats...</div>;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-dark dark:text-white">Super Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Users" value={stats?.total_users ?? 0} icon={<UsersIcon className="h-6 w-6" />} />
                <StatCard title="Total Workspaces" value={stats?.total_workspaces ?? 0} icon={<BuildingOfficeIcon className="h-6 w-6" />} />
                <StatCard title="Monthly Recurring Revenue" value={`$${stats?.mrr ?? 0}`} icon={<CurrencyDollarIcon className="h-6 w-6" />} />
                <StatCard title="Active Subscriptions" value={stats?.active_subscriptions ?? 0} icon={<ChartBarIcon className="h-6 w-6" />} />
            </div>
        </div>
    );
};

export default SuperAdminDashboardPage;