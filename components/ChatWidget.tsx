import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { ChatBubbleIcon, CloseIcon, SendIcon, RobotIcon, UserCircleIcon } from './icons.tsx';

// Define the message structure
interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
}

const ChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Hello! How can I help you today?",
            sender: 'bot',
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatSessionRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initialize Gemini Chat lazily
    const initializeChat = () => {
        if (!chatSessionRef.current) {
            try {
                // According to guidelines, API key is in process.env.API_KEY
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
                chatSessionRef.current = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: {
                         systemInstruction: 'You are a friendly and helpful sales assistant for a company called TreshTalk. You answer questions about the product and help users get started.',
                    },
                });
            } catch (error) {
                console.error("Failed to initialize Gemini Chat:", error);
                setMessages(prev => [...prev, {id: Date.now(), text: "Sorry, I'm having trouble connecting right now. Please try again later.", sender: 'bot'}]);
            }
        }
    }
    
    // Scroll to the bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleSendMessage = async () => {
        const trimmedInput = inputValue.trim();
        if (!trimmedInput || isLoading) return;
        
        // Initialize chat on first message
        initializeChat();
        if (!chatSessionRef.current) return;


        const userMessage: Message = {
            id: Date.now(),
            text: trimmedInput,
            sender: 'user',
        };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const stream = await chatSessionRef.current.sendMessageStream({ message: trimmedInput });
            
            let botResponse = '';
            // Add a placeholder for the bot's response
            setMessages(prev => [...prev, { id: Date.now() + 1, text: '', sender: 'bot' }]);

            for await (const chunk of stream) {
                botResponse += chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    const lastMessage = newMessages[newMessages.length - 1];
                    if (lastMessage && lastMessage.sender === 'bot') {
                         lastMessage.text = botResponse;
                    }
                    return newMessages;
                });
            }
        } catch (error) {
            console.error("Error sending message to Gemini:", error);
            // Replace the placeholder with an error message
            setMessages(prev => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                 if (lastMessage && lastMessage.sender === 'bot' && lastMessage.text === '') {
                    lastMessage.text = "Oops! Something went wrong. Please try again.";
                } else {
                    newMessages.push({id: Date.now() + 1, text: "Oops! Something went wrong. Please try again.", sender: 'bot'});
                }
                return newMessages;
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleToggle = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            // Pre-initialize chat when widget is opened for faster first response
            initializeChat();
        }
    }

    return (
        <div className="fixed bottom-5 right-5 z-40">
            {/* Chat Window */}
            {isOpen && (
                <div className="w-80 sm:w-96 h-[28rem] sm:h-[32rem] bg-white dark:bg-gray-800 rounded-lg shadow-2xl flex flex-col transition-all duration-300 ease-in-out transform origin-bottom-right">
                    {/* Header */}
                    <div className="flex justify-between items-center p-4 bg-primary text-white rounded-t-lg">
                        <h3 className="font-bold text-lg">Chat with TreshTalk</h3>
                        <button onClick={handleToggle} className="hover:bg-primary-hover p-1 rounded-full">
                            <CloseIcon className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto">
                        <div className="space-y-4">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    {msg.sender === 'bot' && <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0"><RobotIcon className="h-5 w-5 text-white" /></div>}
                                    <div className={`px-4 py-2 rounded-2xl max-w-[80%] break-words ${msg.sender === 'user' ? 'bg-gray-200 dark:bg-gray-600 text-dark dark:text-white rounded-br-none' : 'bg-primary-light text-dark dark:text-white dark:bg-gray-700 rounded-bl-none'}`}>
                                        <p className="text-sm">{msg.text}</p>
                                    </div>
                                    {msg.sender === 'user' && <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0"><UserCircleIcon className="h-6 w-6 text-white"/></div>}
                                </div>
                            ))}
                             {isLoading && (
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0"><RobotIcon className="h-5 w-5 text-white" /></div>
                                    <div className="px-4 py-3 rounded-2xl bg-primary-light dark:bg-gray-700 rounded-bl-none">
                                        <div className="flex items-center gap-1.5">
                                            <span className="h-1.5 w-1.5 bg-primary dark:bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                            <span className="h-1.5 w-1.5 bg-primary dark:bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                            <span className="h-1.5 w-1.5 bg-primary dark:bg-white rounded-full animate-bounce"></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder="Type a message..."
                                className="flex-1 bg-transparent focus:ring-0 border-0 text-dark dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                disabled={isLoading}
                            />
                            <button onClick={handleSendMessage} disabled={!inputValue.trim() || isLoading} className="bg-primary text-white h-9 w-9 flex items-center justify-center rounded-lg flex-shrink-0 hover:bg-primary-hover disabled:opacity-50 transition-colors">
                                <SendIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Toggle Button */}
            {!isOpen && (
                <button
                    onClick={handleToggle}
                    className="bg-primary text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-primary-hover transition-transform duration-200 hover:scale-110"
                    aria-label="Open chat"
                >
                    <ChatBubbleIcon className="h-8 w-8" />
                </button>
            )}
        </div>
    );
};

export default ChatWidget;
