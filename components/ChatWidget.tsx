import React, { useState, useEffect, useRef } from 'react';
import { CloseIcon, ChatBubbleIcon, SendIcon, PaperclipIcon, LogoIcon } from './icons';

interface Message {
    id: number;
    text?: string;
    imageUrl?: string;
    sender: 'user' | 'bot';
}

const ChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Hello! How can we help you today?", sender: 'bot' }
    ]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<null | HTMLDivElement>(null);
    const fileInputRef = useRef<null | HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
      if (isOpen) {
        scrollToBottom();
      }
    }, [messages, isOpen]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;

        const userMessage: Message = { id: Date.now(), text: newMessage, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setNewMessage('');

        setTimeout(() => {
            const botResponse: Message = { id: Date.now() + 1, text: "Thanks for your message! An agent will be with you shortly.", sender: 'bot' };
            setMessages(prev => [...prev, botResponse]);
        }, 1000);
    };

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            const userMessage: Message = { id: Date.now(), imageUrl, sender: 'user' };
            setMessages(prev => [...prev, userMessage]);

             setTimeout(() => {
                const botResponse: Message = { id: Date.now() + 1, text: "I've received the image. Let me take a look.", sender: 'bot' };
                setMessages(prev => [...prev, botResponse]);
            }, 1000);
        }
    };

    const triggerFileSelect = () => fileInputRef.current?.click();

    return (
        <>
            {/* Chat Window */}
            <div className={`
                fixed bottom-24 z-50
                left-4 right-4
                sm:left-auto sm:right-5 sm:w-96
                h-[70vh] max-h-[600px] bg-white rounded-lg shadow-2xl flex flex-col transition-opacity duration-300 ease-in-out
                ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
            `}>
                {/* Header */}
                <div className="bg-primary text-white p-4 rounded-t-lg flex justify-between items-center flex-shrink-0">
                    <div>
                        <h3 className="font-bold text-lg">Treshchat Support</h3>
                        <p className="text-sm opacity-80">We typically reply in a few minutes</p>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded-full">
                        <CloseIcon className="w-6 h-6" strokeWidth={2.5}/>
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-grow p-4 overflow-y-auto">
                    <div className="space-y-4">
                        {messages.map((msg) => (
                             <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            
                                {/* Bot Avatar */}
                                {msg.sender === 'bot' && (
                                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                                        <LogoIcon className="w-5 h-5 text-primary" />
                                    </div>
                                )}

                                {/* Message Bubble */}
                                <div className={`max-w-[80%] rounded-xl shadow-sm ${msg.sender === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-gray-200 text-dark rounded-bl-none'}`}>
                                    {msg.text && <p className="px-3 py-2 text-sm md:text-base">{msg.text}</p>}
                                    {msg.imageUrl && <img src={msg.imageUrl} alt="User upload" className="rounded-xl max-w-full h-auto p-1" />}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-200 flex-shrink-0">
                    <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                        <input type="file" ref={fileInputRef} onChange={handleImageSelect} accept="image/*" className="hidden" />
                        <button type="button" onClick={triggerFileSelect} className="text-gray-500 p-2 rounded-full hover:bg-gray-100 transition-colors">
                            <PaperclipIcon className="w-6 h-6" />
                        </button>
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-grow border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
                        />
                        <button type="submit" className="bg-primary text-white p-2.5 rounded-full hover:bg-primary-hover transition-colors flex-shrink-0">
                            <SendIcon className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            </div>

            {/* Chat Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    fixed bottom-5 right-5 z-50 bg-primary text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center
                    hover:bg-primary-hover transition-all duration-300 ease-in-out transform hover:scale-110
                    ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}
                `}
                aria-label="Toggle chat"
            >
                <ChatBubbleIcon className="w-8 h-8" />
            </button>
        </>
    );
};

export default ChatWidget;