import React from 'react';

const mockAnnouncements = [
    { id: 1, title: 'New Feature: Dark Mode!', content: 'You can now enable dark mode in your dashboard header.', date: '2023-08-01', sentBy: 'Admin' },
    { id: 2, title: 'Scheduled Maintenance', content: 'We will be performing scheduled maintenance on Sunday at 2 AM UTC.', date: '2023-07-25', sentBy: 'Admin' },
];

const SuperAdminAnnouncementsPage: React.FC = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-dark dark:text-white mb-4">New Announcement</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                            <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 dark:text-white" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content</label>
                            <textarea rows={5} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 dark:text-white"></textarea>
                        </div>
                        <button type="submit" className="w-full bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary-hover">Send Announcement</button>
                    </form>
                </div>
            </div>
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-dark dark:text-white mb-4">Past Announcements</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                             <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Date</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {mockAnnouncements.map(ann => (
                                    <tr key={ann.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-dark dark:text-white">{ann.title}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{ann.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminAnnouncementsPage;