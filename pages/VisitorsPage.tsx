import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.tsx';
import { supabase } from '../supabaseClient.tsx';
import { MapIcon } from '../components/icons.tsx';

interface Visitor {
    visitor_id: string;
    visitor_email: string;
    last_seen: string;
}

const VisitorsPage: React.FC = () => {
    const { workspaceId } = useAuth();
    const [visitors, setVisitors] = useState<Visitor[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVisitors = async () => {
            if (!workspaceId) return;
            setLoading(true);
            
            // This query gets the latest interaction for each unique visitor
            const { data, error } = await supabase.rpc('get_visitors_by_workspace', { p_workspace_id: workspaceId });

            if (error) {
                console.error("Error fetching visitors:", error);
            } else if (data) {
                setVisitors(data);
            }
            setLoading(false);
        };
        fetchVisitors();
    }, [workspaceId]);

     const timeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
        let interval = seconds / 60;
        if (interval < 60) return `${Math.floor(interval)}m ago`;
        interval = seconds / 3600;
        if (interval < 24) return `${Math.floor(interval)}h ago`;
        interval = seconds / 86400;
        return `${Math.floor(interval)}d ago`;
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-dark dark:text-white">Visitors</h1>
                <button className="flex items-center gap-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-md font-medium text-sm hover:bg-gray-50 dark:hover:bg-gray-600">
                    <MapIcon className="h-5 w-5" />
                    View Map
                </button>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                 <div className="p-4 flex justify-between items-center border-b dark:border-gray-700">
                    <input type="text" placeholder="Search visitors..." className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white" />
                </div>
                <div className="overflow-x-auto">
                    {loading ? (
                        <p className="p-4 text-center text-gray-500">Loading visitors...</p>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Visitor</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Status</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Last Seen</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {visitors.length === 0 && (
                                    <tr><td colSpan={3} className="text-center p-4 text-gray-500">No visitors found.</td></tr>
                                )}
                                {visitors.map((visitor) => (
                                    <tr key={visitor.visitor_id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">{visitor.visitor_email || `Visitor #${visitor.visitor_id.substring(0, 8)}`}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                             <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Online</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{timeAgo(visitor.last_seen)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VisitorsPage;