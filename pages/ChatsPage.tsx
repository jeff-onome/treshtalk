import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient.tsx';
import { useAuth } from '../contexts/AuthContext.tsx';
// FIX: Imported ChatBubbleIcon to resolve 'Cannot find name' error.
import { UserCircleIcon, ClockIcon, ArrowPathIcon, ChatBubbleIcon } from '../components/icons.tsx';

interface Conversation {
    id: string;
    visitor_id: string;
    visitor_email: string;
    created_at: string;
    lastMessage?: {
        content: string | null;
        image_url: string | null;
        created_at: string;
    };
    // From Supabase real-time payload
    new?: any; 
}

const ChatsPage: React.FC = () => {
    const { workspaceId } = useAuth();
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchConversations = useCallback(async () => {
        if (!workspaceId) {
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(null);

        try {
            const { data: convs, error: convError } = await supabase
                .from('conversations')
                .select('*')
                .eq('workspace_id', workspaceId)
                .order('created_at', { ascending: false });

            if (convError) throw convError;

            if (convs) {
                const conversationsWithDetails = await Promise.all(
                    convs.map(async (conv) => {
                        const { data: lastMessage } = await supabase
                            .from('messages')
                            .select('content, image_url, created_at')
                            .eq('conversation_id', conv.id)
                            .order('created_at', { ascending: false })
                            .limit(1)
                            .single();
                        
                        return { ...conv, lastMessage: lastMessage || undefined };
                    })
                );
                setConversations(conversationsWithDetails);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to fetch conversations.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [workspaceId]);

    useEffect(() => {
        fetchConversations();
    }, [fetchConversations]);

    useEffect(() => {
        if (!workspaceId) return;

        const channel = supabase
            .channel(`public:conversations:workspace_id=eq.${workspaceId}`)
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'conversations', filter: `workspace_id=eq.${workspaceId}` },
                (payload) => {
                    // Refetch all conversations to get the latest state and last message
                    fetchConversations();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [workspaceId, fetchConversations]);
    
    // Simple time ago function
    const timeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
        if (seconds < 60) return "just now";
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " years ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " months ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " days ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " hours ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " minutes ago";
        return Math.floor(seconds) + " seconds ago";
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow h-full flex flex-col">
            <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
                <input 
                    type="text"
                    placeholder="Search conversations..."
                    className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary bg-white dark:bg-gray-700 dark:text-white"
                />
                <button onClick={fetchConversations} disabled={loading} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ml-4 disabled:opacity-50">
                    <ArrowPathIcon className={`h-6 w-6 text-gray-600 dark:text-gray-300 ${loading ? 'animate-spin' : ''}`} />
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
                {loading && <div className="p-8 text-center text-gray-500 dark:text-gray-300">Loading conversations...</div>}
                {error && <div className="p-8 text-center text-red-500">{error}</div>}
                {!loading && !error && conversations.length === 0 && (
                     <div className="flex flex-col items-center justify-center h-full text-center p-8">
                        <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-4">
                            <ChatBubbleIcon className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                        </div>
                        <h2 className="mt-6 text-xl font-semibold text-dark dark:text-white">Your inbox is empty</h2>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            When a visitor starts a chat on your website, it will appear here.
                        </p>
                        <Link to="/dashboard/installation" className="mt-6 bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary-hover transition-colors">
                            Install Widget
                        </Link>
                    </div>
                )}
                {!loading && !error && conversations.length > 0 && (
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        {conversations.map((conv) => (
                            <li key={conv.id}>
                                <Link to={`/dashboard/chats/${conv.id}`} className="block hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                                    <div className="p-4 flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                                            <UserCircleIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                                        </div>
                                        <div className="ml-4 flex-1 min-w-0">
                                            <div className="flex justify-between items-baseline">
                                                <p className="text-sm font-medium text-dark dark:text-white truncate">
                                                    {conv.visitor_email || `Visitor #${conv.visitor_id.substring(0, 8)}`}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center flex-shrink-0 ml-2">
                                                    <ClockIcon className="h-3 w-3 mr-1" />
                                                    {timeAgo(conv.lastMessage?.created_at || conv.created_at)}
                                                </p>
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                                                {conv.lastMessage?.content || (conv.lastMessage?.image_url ? 'Image sent' : 'Conversation started...')}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ChatsPage;