import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient.tsx';

interface Profile {
    id: string;
    full_name: string;
    email: string; // This would come from auth.users joined
    role: string;
    created_at: string;
}

const SuperAdminUserManagementPage: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            // In a real app, this would be a more complex query joining auth.users with profiles
            // For simplicity, we fetch profiles and assume email is available.
            const { data, error } = await supabase.from('profiles').select(`
                id,
                full_name,
                role
            `);
            if (error) {
                console.error("Error fetching users:", error);
            } else if (data) {
                setUsers(data);
            }
            setLoading(false);
        };
        fetchUsers();
    }, []);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-dark dark:text-white">User Management</h1>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                 <div className="p-4 flex justify-between items-center border-b dark:border-gray-700">
                    <input type="text" placeholder="Search users..." className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white" />
                </div>
                <div className="overflow-x-auto">
                    {loading ? (
                        <p className="p-4 text-center text-gray-500">Loading users...</p>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">User</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Role</th>
                                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">{user.full_name || 'N/A'}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 capitalize">{user.role}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button className="text-primary hover:text-primary-hover">Edit</button>
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

export default SuperAdminUserManagementPage;