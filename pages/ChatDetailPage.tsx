import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient.tsx';
import { useAuth } from '../contexts/AuthContext.tsx';
import { ArrowLeftIcon, PaperclipIcon, SendIcon, UserCircleIcon } from '../components/icons.tsx';

interface Message {
    id: number;
    content: string | null;
    image_url: string | null;
    created_at: string;
    sender_type: 'agent' | 'visitor' | 'bot';
    sender_id: string | null;
}

// Main Component
const ChatDetailPage: React.FC = () => {
    const { chatId } = useParams<{ chatId: string }>();
    const { user, workspaceId, profile } = useAuth();
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [conversation, setConversation] = useState<any>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    
    // Fetch initial data
    useEffect(() => {
        if (!chatId) return;

        const fetchConversation = async () => {
            const { data } = await supabase.from('conversations').select('*').eq('id', chatId).single();
            setConversation(data);
        };

        const fetchMessages = async () => {
            const { data } = await supabase.from('messages').select('*').eq('conversation_id', chatId).order('created_at');
            setMessages(data || []);
        };

        fetchConversation();
        fetchMessages();
    }, [chatId]);

    // Real-time subscription
    useEffect(() => {
        if (!chatId) return;
        const channel = supabase
            .channel(`public:messages:conversation_id=eq.${chatId}`)
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'messages', filter: `conversation_id=eq.${chatId}` },
                (payload) => {
                     // Check if message is not from the current agent to prevent duplicates
                    if (payload.new.sender_id !== user?.id) {
                         setMessages(current => [...current, payload.new as Message]);
                    }
                }
            )
            .subscribe();

        return () => { supabase.removeChannel(channel); };
    }, [chatId, user]);

    const handleSendMessage = async (content?: string, imageUrl?: string) => {
        const text = content || newMessage;
        if ((!text.trim() && !imageUrl) || !chatId || !workspaceId || !user) return;
    
        const payload: any = {
            conversation_id: chatId,
            workspace_id: workspaceId,
            sender_id: user.id,
            sender_type: 'agent',
            content: text.trim() ? text.trim() : null,
            image_url: imageUrl || null
        };
        
        const { data, error } = await supabase.from('messages').insert(payload).select().single();

        if (error) {
            console.error("Error sending message:", error);
        } else if (data) {
            setMessages(current => [...current, data]);
            setNewMessage('');
        }
    };
    
    const handleImageUpload = async (file: File) => {
        if (!chatId || !user) return;
        setUploading(true);
        const filePath = `public/${user.id}/${Date.now()}_${file.name}`;
        const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file);

        if (uploadError) {
            console.error('Error uploading image:', uploadError);
            setUploading(false);
            return;
        }

        const { data: urlData } = supabase.storage.from('images').getPublicUrl(filePath);
        await handleSendMessage(undefined, urlData.publicUrl);
        setUploading(false);
    };

    return (
        <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-lg shadow">
            <Header visitorId={conversation?.visitor_id} />
            <Messages messages={messages} agentAvatar={profile?.avatar_url} />
            <Footer 
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                onSendMessage={() => handleSendMessage()}
                fileInputRef={fileInputRef}
                onImageSelect={(e) => {
                    if (e.target.files?.[0]) handleImageUpload(e.target.files[0]);
                }}
                uploading={uploading}
            />
        </div>
    );
};


const Header: React.FC<{ visitorId: string | undefined }> = ({ visitorId }) => (
    <div className="flex-shrink-0 flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <Link to="/dashboard/chats" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 mr-2">
            <ArrowLeftIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        </Link>
        <div>
            <h2 className="font-bold text-lg text-dark dark:text-white">Conversation</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">with Visitor #{visitorId?.substring(0, 8)}</p>
        </div>
    </div>
);

const Messages: React.FC<{ messages: Message[], agentAvatar: string | undefined | null }> = ({ messages, agentAvatar }) => {
     const messagesEndRef = useRef<null | HTMLDivElement>(null);
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg) => (
                 <div key={msg.id} className={`group flex items-start gap-3 ${msg.sender_type === 'agent' ? 'justify-end' : 'justify-start'}`}>
                     {msg.sender_type !== 'agent' && <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0"><UserCircleIcon className="h-6 w-6 text-white"/></div>}
                     <div className="flex flex-col items-start max-w-lg">
                        <div className={`px-4 py-2 rounded-2xl ${msg.sender_type === 'agent' ? 'bg-primary text-white rounded-br-none self-end' : 'bg-gray-100 dark:bg-gray-700 text-dark dark:text-white rounded-bl-none'}`}>
                            {msg.image_url && <img src={msg.image_url} alt="Shared content" className="rounded-lg max-w-xs mb-2 cursor-pointer" onClick={()=> window.open(msg.image_url, '_blank')} />}
                            {msg.content && <p className="text-sm">{msg.content}</p>}
                        </div>
                        <p className="text-xs text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {new Date(msg.created_at).toLocaleTimeString()}
                        </p>
                    </div>
                     {msg.sender_type === 'agent' && (
                        <img src={agentAvatar || `https://i.pravatar.cc/150?u=${msg.sender_id}`} className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 object-cover" alt="Agent"/>
                     )}
                </div>
            ))}
             <div ref={messagesEndRef} />
        </div>
    );
};

const Footer: React.FC<{
    newMessage: string;
    setNewMessage: (msg: string) => void;
    onSendMessage: () => void;
    fileInputRef: React.RefObject<HTMLInputElement>;
    onImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
    uploading: boolean;
}> = ({ newMessage, setNewMessage, onSendMessage, fileInputRef, onImageSelect, uploading }) => (
    <div className="flex-shrink-0 border-t dark:border-gray-700 p-4">
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), onSendMessage())}
                placeholder="Type your message..."
                className="flex-1 bg-transparent focus:ring-0 border-0 text-dark dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
            <input type="file" ref={fileInputRef} onChange={onImageSelect} className="hidden" accept="image/*" />
            <button onClick={() => fileInputRef.current?.click()} disabled={uploading} className="p-2 text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary-light rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50">
                {uploading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div> : <PaperclipIcon className="h-6 w-6" />}
            </button>
            <button onClick={onSendMessage} className="bg-primary text-white h-10 w-10 flex items-center justify-center rounded-lg flex-shrink-0 hover:bg-primary-hover">
                <SendIcon className="h-5 w-5" />
            </button>
        </div>
    </div>
);

export default ChatDetailPage;