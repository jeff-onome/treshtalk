import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient.tsx';

interface Workspace {
    id: string;
    company_name: string;
    created_at: string;
    owner_id: string;
}

const SuperAdminWorkspacesPage: React.FC = () => {
    const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWorkspaces = async () => {
            setLoading(true);
            const { data, error } = await supabase.from('workspaces').select('*');
            if (error) {
                console.error("Error fetching workspaces:", error);
            } else if (data) {
                setWorkspaces(data);
            }
            setLoading(false);
        };
        fetchWorkspaces();
    }, []);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-dark dark:text-white">Workspace Management</h1>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                 <div className="p-4 flex justify-between items-center border-b dark:border-gray-700">
                    <input type="text" placeholder="Search workspaces..." className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white" />
                </div>
                <div className="overflow-x-auto">
                    {loading ? (
                         <p className="p-4 text-center text-gray-500">Loading workspaces...</p>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Workspace</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Joined</th>
                                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {workspaces.map((ws) => (
                                    <tr key={ws.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{ws.company_name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{new Date(ws.created_at).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button className="text-primary hover:text-primary-hover">Manage</button>
                                        </td>
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

export default SuperAdminWorkspacesPage;