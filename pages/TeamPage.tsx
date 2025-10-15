import React, { useState } from 'react';
import { CloseIcon } from '../components/icons';

const mockTeamData = [
    { id: 1, name: 'Alex', email: 'alex@example.com', role: 'Admin', status: 'Online', avatar: 'https://picsum.photos/seed/alex/100/100' },
    { id: 2, name: 'Maria', email: 'maria@example.com', role: 'Agent', status: 'Online', avatar: 'https://picsum.photos/seed/maria/100/100' },
    { id: 3, name: 'David', email: 'david@example.com', role: 'Agent', status: 'Offline', avatar: 'https://picsum.photos/seed/david/100/100' },
];

type TeamMember = typeof mockTeamData[0];

const EditTeamMemberModal: React.FC<{ member: TeamMember; onClose: () => void; onSave: (updatedMember: TeamMember) => void }> = ({ member, onClose, onSave }) => {
    const [role, setRole] = useState(member.role);

    const handleSave = () => {
        onSave({ ...member, role });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-md">
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="font-bold text-dark">Edit Team Member</h3>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" disabled value={member.name} className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" disabled value={member.email} className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500" />
                    </div>
                     <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                        <select id="role" value={role} onChange={(e) => setRole(e.target.value)} className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-primary focus:border-primary">
                            <option>Admin</option>
                            <option>Agent</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-end gap-3 p-4 bg-gray-50 border-t">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
                    <button onClick={handleSave} className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-hover">Save Changes</button>
                </div>
            </div>
        </div>
    );
};

const TeamPage: React.FC = () => {
    const [team, setTeam] = useState(mockTeamData);
    const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

    const handleSaveMember = (updatedMember: TeamMember) => {
        setTeam(team.map(m => m.id === updatedMember.id ? updatedMember : m));
    };

    return (
        <>
            {editingMember && (
                <EditTeamMemberModal 
                    member={editingMember} 
                    onClose={() => setEditingMember(null)}
                    onSave={handleSaveMember}
                />
            )}
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-dark">Team Management</h1>
                    <button className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary-hover transition-colors">
                        Invite Member
                    </button>
                </div>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">Edit</span></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {team.map((member) => (
                                    <tr key={member.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <img className="h-10 w-10 rounded-full" src={member.avatar} alt={member.name} />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{member.name}</div>
                                                    <div className="text-sm text-gray-500">{member.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.role}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${member.status === 'Online' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                {member.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button onClick={() => setEditingMember(member)} className="text-primary hover:text-primary-hover">Edit</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TeamPage;