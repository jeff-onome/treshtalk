import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabaseClient.tsx';
import { ChatBubbleIcon, CloseIcon, SendIcon, PaperclipIcon, RobotIcon, UserCircleIcon } from './icons.tsx';

interface Message {
    id: number;
    content: string | null;
    image_url: string | null;
    sender_type: 'user' | 'bot' | 'agent' | 'visitor';
}

const WIDGET_ID = 'demo-widget-id';

const ChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, content: "Hello! How can I help you today?", sender_type: 'bot', image_url: null },
    ]);
    const [conversationId, setConversationId] = useState<string | null>(localStorage.getItem('treshtalk_conversation_id'));
    const [visitorId, setVisitorId] = useState<string | null>(localStorage.getItem('treshtalk_visitor_id'));
    const [workspaceId, setWorkspaceId] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(localStorage.getItem('treshtalk_visitor_email'));
    const [emailSubmitted, setEmailSubmitted] = useState(!!localStorage.getItem('treshtalk_visitor_email'));
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    
    // Fetch workspace ID on mount
    useEffect(() => {
        const fetchWorkspace = async () => {
            const { data, error } = await supabase.from('workspaces').select('id').eq('widget_id', WIDGET_ID).single();
            if (error) {
                console.error("Widget ID not found:", error);
            } else if (data) {
                setWorkspaceId(data.id);
            }
        };
        fetchWorkspace();
    }, []);
    
    // Generate visitor ID if it doesn't exist
    useEffect(() => {
        if (!visitorId) {
            const newVisitorId = crypto.randomUUID();
            localStorage.setItem('treshtalk_visitor_id', newVisitorId);
            setVisitorId(newVisitorId);
        }
    }, [visitorId]);
    
    // Subscribe to messages
    useEffect(() => {
        if (!conversationId) return;

        const fetchMessages = async () => {
             const { data } = await supabase.from('messages').select('*').eq('conversation_id', conversationId).order('created_at');
             if(data && data.length > 0) setMessages(data);
        }
        fetchMessages();

        const channel = supabase
            .channel(`public:messages:conversation_id=eq.${conversationId}`)
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'messages', filter: `conversation_id=eq.${conversationId}` },
                (payload) => {
                    if (payload.new.sender_type === 'agent') {
                        setMessages(current => [...current, payload.new as Message]);
                    }
                }
            )
            .subscribe();

        return () => { supabase.removeChannel(channel); };
    }, [conversationId]);
    
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(scrollToBottom, [messages, emailSubmitted]);

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && email.trim() !== '') {
            localStorage.setItem('treshtalk_visitor_email', email);
            setEmailSubmitted(true);
        }
    };
    
    const createConversation = async () => {
        if (!workspaceId || !visitorId) return null;

        const { data, error } = await supabase
            .from('conversations')
            .insert({ workspace_id: workspaceId, visitor_id: visitorId, visitor_email: email })
            .select()
            .single();

        if (error) {
            console.error("Error creating conversation:", error);
            return null;
        }

        localStorage.setItem('treshtalk_conversation_id', data.id);
        setConversationId(data.id);
        return data.id;
    };

    const handleSendMessage = async (content?: string, imageUrl?: string) => {
        const text = content || input;
        if ((!text.trim() && !imageUrl) || !workspaceId || !visitorId) return;

        let currentConvId = conversationId;
        if (!currentConvId) {
            currentConvId = await createConversation();
        }
        if (!currentConvId) return;

        const payload: any = {
            conversation_id: currentConvId,
            workspace_id: workspaceId,
            sender_id: visitorId,
            sender_type: 'visitor',
            content: text.trim() ? text.trim() : null,
            image_url: imageUrl || null
        };

        const { data, error } = await supabase.from('messages').insert(payload).select().single();
        if (error) {
            console.error("Error sending message:", error);
        } else if (data) {
            setMessages(prev => [...prev, data]);
            setInput('');
        }
    };
    
    const handleImageUpload = async (file: File) => {
        if (!visitorId) return;
        setUploading(true);
        const filePath = `public/${visitorId}/${Date.now()}_${file.name}`;
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
        <div className="fixed bottom-5 right-5 z-40">
            {/* Chat Window */}
            <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                <div className="w-80 h-[28rem] bg-white rounded-lg shadow-2xl flex flex-col">
                    <div className="bg-primary text-white p-4 rounded-t-lg flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-lg">TreshTalk Support</h3>
                            <p className="text-sm opacity-80">We typically reply in a few minutes</p>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-white/20">
                            <CloseIcon className="h-5 w-5" />
                        </button>
                    </div>

                    {!emailSubmitted ? (
                        <div className="flex-1 p-6 flex flex-col justify-center text-center">
                             <h4 className="font-bold text-dark">Welcome!</h4>
                             <p className="text-sm text-gray-600 mt-2">Please enter your email to start the chat.</p>
                             <form onSubmit={handleEmailSubmit} className="mt-4 space-y-3">
                                <input
                                    type="email"
                                    value={email || ''}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    required
                                    className="w-full bg-gray-100 rounded-md px-4 py-2 focus:ring-2 focus:ring-primary-light border-gray-200"
                                />
                                <button type="submit" className="w-full bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary-hover">
                                    Start Chat
                                </button>
                             </form>
                             <div ref={messagesEndRef} />
                        </div>
                    ) : (
                        <>
                            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                                {messages.map((msg, i) => (
                                    <div key={i} className={`flex items-start gap-3 ${msg.sender_type === 'visitor' ? 'justify-end' : ''}`}>
                                        {msg.sender_type !== 'visitor' && (
                                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                                                {msg.sender_type === 'bot' ? <RobotIcon className="h-5 w-5 text-gray-600"/> : <UserCircleIcon className="h-5 w-5 text-gray-600"/>}
                                            </div>
                                        )}
                                        <div className={`px-4 py-2 rounded-2xl max-w-[75%] ${msg.sender_type === 'visitor' ? 'bg-primary text-white rounded-br-none' : 'bg-gray-100 text-dark rounded-bl-none'}`}>
                                            {msg.image_url && <img src={msg.image_url} alt="Uploaded content" className="rounded-lg max-w-xs mb-2 cursor-pointer" onClick={()=> window.open(msg.image_url, '_blank')}/>}
                                            {msg.content && <p className="text-sm">{msg.content}</p>}
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>

                            <div className="p-4 border-t border-gray-200">
                                <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={e => setInput(e.target.value)}
                                        placeholder="Type a message..."
                                        className="flex-1 bg-gray-100 rounded-full px-4 py-2 focus:ring-2 focus:ring-primary-light focus:border-transparent border-transparent"
                                    />
                                    <input type="file" ref={fileInputRef} onChange={(e) => { if(e.target.files?.[0]) handleImageUpload(e.target.files[0]) }} className="hidden" accept="image/*" />
                                    <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading} className="p-2 text-gray-500 hover:text-primary rounded-full hover:bg-gray-200 disabled:opacity-50">
                                        {uploading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div> : <PaperclipIcon className="h-5 w-5" />}
                                    </button>
                                    <button type="submit" className="bg-primary text-white h-10 w-10 flex items-center justify-center rounded-full flex-shrink-0 hover:bg-primary-hover">
                                        <SendIcon className="h-5 w-5" />
                                    </button>
                                </form>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`bg-primary text-white h-16 w-16 rounded-full shadow-lg flex items-center justify-center transition-transform duration-300 ease-in-out hover:scale-110 ${isOpen ? 'scale-0' : 'scale-100'}`}
                aria-label="Open chat"
            >
                <ChatBubbleIcon className="h-8 w-8" />
            </button>
        </div>
    );
};

export default ChatWidget;