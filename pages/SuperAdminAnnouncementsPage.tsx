import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient.tsx';

const SuperAdminAnnouncementsPage: React.FC = () => {
    const [announcements, setAnnouncements] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const fetchAnnouncements = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('announcements').select('*').order('created_at', { ascending: false });
        if (error) console.error(error);
        else if (data) setAnnouncements(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await supabase.from('announcements').insert({ title, content });
        if (error) {
            alert('Error creating announcement');
            console.error(error);
        } else {
            alert('Announcement published!');
            setTitle('');
            setContent('');
            fetchAnnouncements();
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-dark dark:text-white">Platform Announcements</h1>
             <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-dark dark:text-white mb-4">Create New Announcement</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                        <textarea rows={4} value={content} onChange={e => setContent(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 dark:text-white"></textarea>
                    </div>
                    <div>
                        <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary-hover">
                            Publish Announcement
                        </button>
                    </div>
                </form>
            </div>
             <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                 <div className="p-4 border-b dark:border-gray-700"><h2 className="text-xl font-bold">History</h2></div>
                 <div className="p-4 space-y-4">
                     {loading ? <p>Loading history...</p> : announcements.map(ann => (
                        <div key={ann.id} className="border-b dark:border-gray-700 pb-2">
                             <h3 className="font-bold">{ann.title}</h3>
                             <p className="text-sm text-gray-600 dark:text-gray-300">{ann.content}</p>
                             <p className="text-xs text-gray-400 mt-1">{new Date(ann.created_at).toLocaleString()}</p>
                        </div>
                     ))}
                 </div>
             </div>
        </div>
    );
};

export default SuperAdminAnnouncementsPage;