import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient.tsx';

const SuperAdminUserManagementPage: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            // This requires admin privileges to call
            // In a real app, this should be behind a Supabase Edge Function with a service_role key
            try {
                const { data: { users }, error } = await supabase.auth.admin.listUsers();
                if (error) throw error;
                
                // For simplicity, we'll just display auth users. A real app would join with profiles.
                setUsers(users);
            } catch (error) {
                console.error("Error fetching users (requires admin privileges):", error);
                alert("Could not fetch users. This action requires admin privileges and is likely blocked by RLS in a client-side environment for security.");
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
                    <input type="text" placeholder="Search users by email..." className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary bg-white dark:bg-gray-700 dark:text-white" />
                </div>
                <div className="overflow-x-auto">
                    {loading ? (
                        <p className="p-4 text-center">Loading users...</p>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Signed Up</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Last Sign In</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{user.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{new Date(user.created_at).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : 'Never'}</td>
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
