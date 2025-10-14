

import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockChats, Message } from '../data/mockChats';
import { SendIcon, PaperclipIcon, UserCircleIcon } from '../components/icons';

const ChatDetailPage: React.FC = () => {
    const { chatId } = useParams<{ chatId: string }>();
    const chat = mockChats.find(c => c.id === chatId);

    const [messages, setMessages] = useState<Message[]>(chat?.messages || []);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;
        const message: Message = {
            id: `m${Date.now()}`,
            text: newMessage,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            sender: 'agent',
            agentName: 'Alex',
        };
        setMessages(prev => [...prev, message]);
        setNewMessage('');
    };

    if (!chat) {
        return (
            <div className="text-center p-8">
                <h2 className="text-2xl font-bold">Chat not found</h2>
                <Link to="/dashboard/chats" className="text-primary mt-4 inline-block">
                    &larr; Back to all chats
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-[calc(100vh-100px)] bg-white rounded-lg shadow">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
                <div>
                    <h2 className="text-lg font-bold">{chat.customerName}</h2>
                    <span className="text-sm text-green-500">Online</span>
                </div>
                 <Link to="/dashboard/chats" className="text-primary hover:text-primary-hover font-semibold">
                    &larr; Back to chats
                </Link>
            </div>

            {/* Messages */}
            <div className="flex-grow p-4 overflow-y-auto">
                <div className="space-y-4">
                    {messages.map((msg) => (
                         <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'agent' ? 'justify-end' : 'justify-start'}`}>
                            {msg.sender === 'user' && (
                                <img src={chat.avatarUrl} alt={chat.customerName} className="w-8 h-8 rounded-full flex-shrink-0" />
                            )}
                            
                            <div className={`group flex items-end gap-2 ${msg.sender === 'agent' ? 'flex-row-reverse' : 'flex-row'}`}>
                                <div className={`max-w-[70%] rounded-xl p-3 shadow-sm ${
                                    msg.sender === 'agent' 
                                    ? 'bg-primary-light text-dark rounded-br-none' 
                                    : 'bg-gray-200 text-dark rounded-bl-none'
                                }`}>
                                    <p className="text-sm break-words">{msg.text}</p>
                                </div>
                                <p className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0 pb-1">
                                    {msg.timestamp}
                                </p>
                            </div>

                            {msg.sender === 'agent' && (
                                <UserCircleIcon className="w-8 h-8 text-gray-400 flex-shrink-0" />
                            )}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Input */}
             <div className="p-4 border-t border-gray-200 flex-shrink-0 bg-gray-50">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                    <button type="button" className="text-gray-500 p-2 rounded-full hover:bg-gray-200 transition-colors">
                        <PaperclipIcon className="w-6 h-6" />
                    </button>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
                    />
                    <button type="submit" className="bg-primary text-white p-2.5 rounded-full hover:bg-primary-hover transition-colors flex-shrink-0 disabled:bg-primary-light" disabled={!newMessage.trim()}>
                        <SendIcon className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatDetailPage;