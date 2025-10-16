import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient.tsx';

const SuperAdminLogsPage: React.FC = () => {
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLogs = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('audit_log') // using our custom log table
                .select(`
                    *,
                    profiles ( full_name )
                `)
                .order('created_at', { ascending: false })
                .limit(100);

            if(error) console.error(error);
            else if (data) setLogs(data);
            setLoading(false);
        };
        fetchLogs();
    }, []);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-dark dark:text-white">Platform Logs</h1>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                 <div className="p-4 border-b dark:border-gray-700">
                     <h2 className="text-xl font-bold">Audit Trail</h2>
                 </div>
                <div className="overflow-x-auto">
                    {loading ? <p className="p-4">Loading logs...</p> : (
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">User</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Action</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Timestamp</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                 {logs.length === 0 && (
                                     <tr><td colSpan={3} className="text-center p-4 text-gray-500">No audit logs found.</td></tr>
                                 )}
                                {logs.map(log => (
                                    <tr key={log.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{log.profiles?.full_name || 'System'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{log.action}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(log.created_at).toLocaleString()}</td>
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

export default SuperAdminLogsPage;