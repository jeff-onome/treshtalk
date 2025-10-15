import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { mockChats, Message, Chat } from '../data/mockChats';
import { SendIcon, PaperclipIcon, ArrowLeftIcon, PhoneIcon, MailIcon, DesktopComputerIcon, CloseIcon } from '../components/icons';

const CoBrowseModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl h-full max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
                <h3 className="font-bold text-dark">Co-browsing Session</h3>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200">
                    <CloseIcon className="w-6 h-6" />
                </button>
            </div>
            <div className="flex-1 p-2 bg-gray-200">
                 <iframe src="https://treshtalk-demo.web.app" className="w-full h-full border-2 border-gray-400 rounded-md" title="Co-browse screen"></iframe>
            </div>
             <div className="p-4 border-t bg-gray-50 text-sm text-gray-600">
                This is a simulated view of the customer's screen.
            </div>
        </div>
    </div>
);


const ChatDetailPage: React.FC = () => {
    const { chatId } = useParams<{ chatId: string }>();
    const navigate = useNavigate();
    const [chat, setChat] = useState<Chat | undefined>(undefined);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [isCoBrowsing, setIsCoBrowsing] = useState(false);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        const foundChat = mockChats.find(c => c.id === chatId);
        if (foundChat) {
            setChat(foundChat);
            setMessages(foundChat.messages);
        }
    }, [chatId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;

        const userMessage: Message = {
            id: Date.now(),
            text: newMessage,
            sender: 'agent',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            agentName: 'Alex',
            agentAvatarUrl: 'https://picsum.photos/seed/alex/100/100'
        };
        setMessages(prev => [...prev, userMessage]);
        setNewMessage('');
    };

    if (!chat) {
        return (
            <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                    <p className="text-xl">Chat not found</p>
                    <Link to="/dashboard/chats" className="text-primary hover:underline mt-2">
                        Back to all chats
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            {isCoBrowsing && <CoBrowseModal onClose={() => setIsCoBrowsing(false)} />}
            <div className="flex h-full bg-white rounded-lg shadow overflow-hidden">
                {/* Main Chat Area */}
                <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <div className="flex items-center p-4 border-b border-gray-200">
                        <button onClick={() => navigate('/dashboard/chats')} className="md:hidden mr-4 p-2 rounded-full hover:bg-gray-100">
                            <ArrowLeftIcon className="w-6 h-6 text-gray-600" />
                        </button>
                        <img className="h-10 w-10 rounded-full object-cover" src={chat.avatarUrl} alt={chat.customerName} />
                        <div className="ml-3">
                            <h2 className="font-semibold text-dark">{chat.customerName}</h2>
                            <p className="text-sm text-gray-500">Online</p>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                        <div className="space-y-4">
                            {messages.map(msg => (
                                <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'agent' ? 'justify-end' : 'justify-start'}`}>
                                    {msg.sender === 'user' && (
                                        <img className="h-8 w-8 rounded-full object-cover self-start" src={chat.avatarUrl} alt={chat.customerName} />
                                    )}
                                    <div className="max-w-[70%]">
                                        {msg.sender === 'agent' && msg.agentName && (
                                            <p className="text-xs text-gray-500 text-right mb-1 mr-2">{msg.agentName}</p>
                                        )}
                                        <div className={`p-3 rounded-xl shadow-sm ${msg.sender === 'agent' ? 'bg-primary text-white rounded-br-none' : 'bg-white text-dark rounded-bl-none'}`}>
                                            <p className="text-sm">{msg.text}</p>
                                            <p className={`text-xs mt-1 ${msg.sender === 'agent' ? 'text-blue-100' : 'text-gray-400'}`}>{msg.timestamp}</p>
                                        </div>
                                    </div>
                                    {msg.sender === 'agent' && msg.agentAvatarUrl && (
                                        <img className="h-8 w-8 rounded-full object-cover self-start" src={msg.agentAvatarUrl} alt={msg.agentName} />
                                    )}
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-gray-200 bg-white">
                        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                            <button type="button" className="text-gray-500 p-2 rounded-full hover:bg-gray-100 transition-colors">
                                <PaperclipIcon className="w-6 h-6" />
                            </button>
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-grow border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                            />
                            <button type="submit" className="bg-primary text-white p-2 rounded-full hover:bg-primary-hover transition-colors">
                                <SendIcon className="w-6 h-6" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Customer Details Sidebar */}
                <div className="hidden lg:block w-80 border-l border-gray-200 p-6 flex-shrink-0">
                    <div className="text-center">
                        <img className="h-24 w-24 rounded-full object-cover mx-auto" src={chat.avatarUrl} alt={chat.customerName} />
                        <h3 className="mt-4 text-xl font-bold text-dark">{chat.customerName}</h3>
                        <p className="text-sm text-gray-500">Customer</p>
                    </div>
                    <div className="mt-8">
                         <button onClick={() => setIsCoBrowsing(true)} className="w-full flex items-center justify-center gap-2 bg-gray-100 text-dark font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                            <DesktopComputerIcon className="h-5 w-5" />
                            Start Co-browsing
                        </button>
                    </div>
                    <div className="mt-6 border-t border-gray-200 pt-6 space-y-4">
                        <h4 className="font-semibold text-dark">Contact Information</h4>
                         <div className="flex items-center text-sm">
                            <MailIcon className="w-5 h-5 text-gray-400 mr-3"/>
                            <span className="text-gray-700 break-all">{chat.customerEmail}</span>
                        </div>
                         <div className="flex items-center text-sm">
                            <PhoneIcon className="w-5 h-5 text-gray-400 mr-3"/>
                            <span className="text-gray-700">{chat.customerPhone}</span>
                        </div>
                    </div>
                     <div className="mt-8 border-t border-gray-200 pt-6">
                        <h4 className="font-semibold text-dark mb-4">Chat Details</h4>
                        <div className="text-sm space-y-2">
                             <div className="flex justify-between">
                                <span className="text-gray-500">Status</span>
                                <span className="font-medium text-dark capitalize">{chat.status}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Chat ID</span>
                                <span className="font-medium text-gray-500">#{chat.id}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatDetailPage;