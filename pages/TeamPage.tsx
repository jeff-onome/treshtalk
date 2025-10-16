import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.tsx';
import { supabase } from '../supabaseClient.tsx';

interface Member {
    user_id: string;
    role: string;
    profile: {
        full_name: string;
        avatar_url: string;
        email: string; // We need to fetch email from auth.users, this is a simplified join
    }
}

const TeamPage: React.FC = () => {
    const { workspaceId } = useAuth();
    const [members, setMembers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMembers = async () => {
            if (!workspaceId) return;
            setLoading(true);
            const { data, error } = await supabase
                .from('workspace_users')
                .select(`
                    user_id,
                    role,
                    profiles ( full_name, avatar_url )
                `)
                .eq('workspace_id', workspaceId);
            
            if (error) {
                console.error("Error fetching team members:", error);
            } else if (data) {
                // This is a simplified fetch. A production app would need a function to get emails
                // as profiles table doesn't have it by default for security.
                setMembers(data);
            }
            setLoading(false);
        };
        fetchMembers();
    }, [workspaceId]);

    const handleInvite = async () => {
        const email = prompt("Enter the email of the team member to invite:");
        if (email && workspaceId) {
            // Supabase handles the email sending.
            // This is an admin-level function, so you'd typically call a Supabase Edge Function
            // that has the service_role key to perform this action.
            // const { data, error } = await supabase.auth.admin.inviteUserByEmail(email, { data: { workspace_id: workspaceId } });
            alert(`In a real app, an invitation would be sent to ${email}. This requires admin privileges.`);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-dark dark:text-white">Team Management</h1>
                <button onClick={handleInvite} className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary-hover">
                    Invite Member
                </button>
            </div>
             <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="overflow-x-auto">
                     {loading ? (
                         <p className="p-4 text-center text-gray-500">Loading team members...</p>
                     ) : (
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Member</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Role</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {members.length === 0 && (
                                     <tr><td colSpan={3} className="text-center p-4 text-gray-500">No team members found.</td></tr>
                                )}
                                {members.map((member) => (
                                    <tr key={member.user_id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <img className="h-10 w-10 rounded-full object-cover" src={member.profiles.avatar_url || `https://ui-avatars.com/api/?name=${member.profiles.full_name}`} alt={member.profiles.full_name} />
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">{member.profiles.full_name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 capitalize">{member.role}</td>
                                        <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span></td>
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

export default TeamPage;