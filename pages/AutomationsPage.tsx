import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.tsx';
import { supabase } from '../supabaseClient.tsx';

interface Automation {
    id: number;
    name: string;
    description: string;
    is_active: boolean;
}

const AutomationsPage: React.FC = () => {
    const { workspaceId } = useAuth();
    const [automations, setAutomations] = useState<Automation[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAutomations = async () => {
            if (!workspaceId) return;
            setLoading(true);
            const { data, error } = await supabase
                .from('automations')
                .select('*')
                .eq('workspace_id', workspaceId);
            
            if (error) {
                console.error("Error fetching automations:", error);
            } else if(data) {
                setAutomations(data);
            }
            setLoading(false);
        };
        fetchAutomations();
    }, [workspaceId]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-dark dark:text-white">Automations</h1>
                <button className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary-hover">
                    New Automation
                </button>
            </div>
             {loading ? (
                <p className="text-center text-gray-500">Loading automations...</p>
             ) : automations.length === 0 ? (
                <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow">
                    <h3 className="text-xl font-semibold">No automations created yet</h3>
                    <p className="text-gray-500 mt-2">Create your first automation to engage visitors proactively.</p>
                </div>
             ) : (
                <div className="grid gap-6 md:grid-cols-2">
                    {automations.map(automation => (
                        <div key={automation.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-bold text-dark dark:text-white">{automation.name}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{automation.description}</p>
                                </div>
                                <div className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 cursor-pointer ${automation.is_active ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}>
                                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${automation.is_active ? 'translate-x-6' : ''}`}></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
             )}
        </div>
    );
};

export default AutomationsPage;