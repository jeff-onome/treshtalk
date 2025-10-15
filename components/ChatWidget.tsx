import React, { useState, useEffect, useRef } from 'react';
import { ChatBubbleIcon, CloseIcon, SendIcon, CogIcon, PaperclipIcon, CreditCardIcon, AccessibilityIcon } from './icons.tsx';

// --- TYPE DEFINITIONS ---
type Message = { 
  id: number; 
  text: string; 
  sender: 'bot' | 'user'; 
  type?: 'text' | 'payment_request' | 'error';
  imageUrl?: string;
};
type Persona = { name: string; avatar: string; description: string; };

// --- CONSTANTS ---
const personas: Persona[] = [
    { name: 'Sparky', avatar: 'https://picsum.photos/seed/sparky/100/100', description: 'Friendly & Enthusiastic' },
    { name: 'Professor', avatar: 'https://picsum.photos/seed/professor/100/100', description: 'Knowledgeable & Precise' },
    { name: 'Echo', avatar: 'https://picsum.photos/seed/echo/100/100', description: 'Calm & Supportive' },
];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];


// --- SUB-COMPONENTS ---

const TypingIndicator: React.FC = () => (
    <div className="flex items-center space-x-1.5 p-3">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
    </div>
);

const OfflineForm: React.FC = () => (
    <div className="p-6 text-center">
        <h3 className="font-bold text-dark dark:text-white">We're currently offline</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 mb-4">Please leave a message and we'll get back to you as soon as possible.</p>
        <form className="space-y-4">
            <input type="text" placeholder="Your Name" className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white" />
            <input type="email" placeholder="Your Email" className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white" />
            <textarea placeholder="Your Message" rows={3} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white"></textarea>
            <button type="submit" className="w-full px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-hover">Send Message</button>
        </form>
    </div>
);


// --- MAIN CHAT WIDGET COMPONENT ---

const ChatWidget: React.FC = () => {
    // Core State
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    
    // Feature State
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isBotTyping, setIsBotTyping] = useState(false);
    const [hasUnread, setHasUnread] = useState(false);
    const [isOffline, setIsOffline] = useState(false);
    const [isAccessibilityMode, setIsAccessibilityMode] = useState(false);

    // Persona & Payment State
    const [currentPersona, setCurrentPersona] = useState<Persona>(personas[0]);
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);

    // Refs
    const fileInputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // --- EFFECTS ---

    // Dark Mode Detection
    useEffect(() => {
        const darkModeMatcher = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(darkModeMatcher.matches);
        const listener = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
        darkModeMatcher.addEventListener('change', listener);
        return () => darkModeMatcher.removeEventListener('change', listener);
    }, []);
    
    // Chat Persistence (Load from localStorage)
    useEffect(() => {
        try {
            const persistedMessages = localStorage.getItem('treshtalk-messages');
            if (persistedMessages) {
                setMessages(JSON.parse(persistedMessages));
            } else {
                setMessages([{ id: 1, text: "Hello! How can I help you today?", sender: 'bot' }]);
            }
        } catch (error) {
            console.error("Failed to load messages from localStorage:", error);
            setMessages([{ id: 1, text: "Hello! How can I help you today?", sender: 'bot' }]);
        }
    }, []);

    // Chat Persistence (Save to localStorage)
    useEffect(() => {
        try {
            localStorage.setItem('treshtalk-messages', JSON.stringify(messages));
        } catch (error) {
            console.error("Failed to save messages to localStorage:", error);
        }
    }, [messages]);
    
    // Auto-scroll to latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isBotTyping]);
    
    // Check for Offline Hours (Simulation)
    useEffect(() => {
        const currentHour = new Date().getHours();
        if (currentHour >= 18 || currentHour < 9) { // Offline between 6 PM and 9 AM
            setIsOffline(true);
        }
    }, []);

    // --- HANDLERS ---
    
    const handleOpenWidget = () => {
        setIsOpen(true);
        setHasUnread(false);
    };

    const handleSend = () => {
        if (input.trim() === '') return;
        
        const userMessage: Message = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsBotTyping(true);

        setTimeout(() => {
            setIsBotTyping(false);
            const botReply: Message = { id: Date.now() + 1, text: "Thanks for your message! An agent is reviewing it now.", sender: 'bot' };
            setMessages(prev => [...prev, botReply]);
            if (!isOpen) {
                setHasUnread(true);
            }
        }, 1500);
    };
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > MAX_FILE_SIZE) {
                const errorMsg: Message = { id: Date.now(), text: `File is too large. Max size is ${MAX_FILE_SIZE / 1024 / 1024}MB.`, sender: 'bot', type: 'error' };
                setMessages(prev => [...prev, errorMsg]);
                return;
            }
            if (!ALLOWED_FILE_TYPES.includes(file.type)) {
                const errorMsg: Message = { id: Date.now(), text: `Invalid file type. Please upload a JPEG, PNG, or GIF.`, sender: 'bot', type: 'error' };
                setMessages(prev => [...prev, errorMsg]);
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageUrl = e.target?.result as string;
                const newMessage: Message = { id: Date.now(), text: '', sender: 'user', imageUrl };
                setMessages(prev => [...prev, newMessage]);
            };
            reader.readAsDataURL(file);
        }
    };

    // --- RENDER LOGIC ---

    if (!isOpen) {
        return (
            <button
                onClick={handleOpenWidget}
                className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary-hover transition-transform transform hover:scale-110 z-50"
                aria-label="Open chat"
            >
                <ChatBubbleIcon className="h-8 w-8" />
                {hasUnread && <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-red-500 ring-2 ring-white" />}
            </button>
        );
    }
    
    const highContrastClasses = {
      bg: 'bg-black',
      text: 'text-white',
      border: 'border-white',
      bubbleUser: 'bg-blue-800 text-white',
      bubbleBot: 'bg-gray-700 text-white',
      input: 'bg-gray-800 border-white text-white',
    };

    const standardClasses = {
      bg: 'bg-white dark:bg-gray-900',
      text: 'text-dark dark:text-white',
      border: 'border-gray-200 dark:border-gray-700',
      bubbleUser: 'bg-primary text-white',
      bubbleBot: 'bg-gray-200 dark:bg-gray-700 text-dark dark:text-white',
      input: 'bg-gray-100 dark:bg-gray-800 border-none',
    };
    
    const theme = isAccessibilityMode ? highContrastClasses : standardClasses;

    return (
        <div 
            className={`fixed bottom-6 right-6 w-[calc(100%-3rem)] sm:w-96 h-[calc(100%-4.5rem)] sm:h-[32rem] rounded-2xl shadow-2xl flex flex-col transition-all duration-300 z-50 ${isDarkMode && !isAccessibilityMode ? 'dark' : ''} ${theme.bg}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="chat-heading"
        >
            <div className={`flex flex-col h-full rounded-2xl overflow-hidden`}>
                {/* Header */}
                <div id="chat-heading" className="bg-gradient-to-br from-primary to-indigo-600 text-white p-4 rounded-t-2xl flex justify-between items-center flex-shrink-0 z-10 shadow-md">
                     <div className="flex items-center gap-3">
                        <img src={currentPersona.avatar} alt="" className="h-10 w-10 rounded-full border-2 border-white/50" />
                        <div>
                            <h3 className="font-bold">{currentPersona.name}</h3>
                            <p className="text-xs opacity-80">Online</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <button onClick={() => setIsSettingsOpen(!isSettingsOpen)} className="p-2 rounded-full hover:bg-white/20" aria-label="Chat settings">
                            <CogIcon className="h-5 w-5" />
                        </button>
                        <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-white/20" aria-label="Close chat">
                            <CloseIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Settings Panel */}
                {isSettingsOpen && (
                    <div className="absolute top-[70px] right-4 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 z-20 border border-gray-200 dark:border-gray-700">
                        <div 
                            onClick={() => setIsAccessibilityMode(!isAccessibilityMode)} 
                            className="flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <div className="flex items-center">
                               <AccessibilityIcon className="h-5 w-5 text-gray-600 dark:text-gray-300 mr-3" />
                               <p className="text-sm font-semibold text-dark dark:text-white">Accessibility Mode</p>
                            </div>
                            <div className={`w-10 h-5 flex items-center rounded-full p-1 duration-300 ${isAccessibilityMode ? 'bg-primary' : 'bg-gray-300'}`}>
                                <div className={`bg-white w-3.5 h-3.5 rounded-full shadow-md transform duration-300 ${isAccessibilityMode ? 'translate-x-5' : ''}`} />
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Body: Messages or Offline Form */}
                <div role="log" aria-live="polite" className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    { isOffline ? <OfflineForm /> : (
                        <div className="space-y-4">
                            {messages.map(msg => (
                                <div key={msg.id} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    {msg.sender === 'bot' && <img src={currentPersona.avatar} alt="" className="h-8 w-8 rounded-full flex-shrink-0" />}
                                    <div className={`max-w-[80%] p-3 rounded-2xl ${msg.type === 'error' ? 'bg-red-500 text-white rounded-br-lg rounded-bl-lg' : msg.sender === 'user' ? `${theme.bubbleUser} rounded-br-none` : `${theme.bubbleBot} rounded-bl-none`}`}>
                                       {msg.imageUrl ? (
                                            <img src={msg.imageUrl} alt="User upload" className="rounded-lg max-w-full h-auto" />
                                       ) : (
                                           <p className="text-sm">{msg.text}</p>
                                       )}
                                    </div>
                                </div>
                            ))}
                            {isBotTyping && <TypingIndicator />}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>

                {/* Input */}
                {!isOffline && (
                    <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} role="form" aria-label="Chat input form" className={`p-3 border-t ${theme.border} flex items-center gap-2 flex-shrink-0 ${theme.bg}`}>
                        <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept={ALLOWED_FILE_TYPES.join(',')} className="hidden" />
                        <button type="button" onClick={() => fileInputRef.current?.click()} className="text-gray-500 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex-shrink-0" aria-label="Attach file">
                            <PaperclipIcon className="w-6 h-6" />
                        </button>
                        <textarea 
                            value={input}
                            onKeyDown={handleKeyDown}
                            onChange={e => setInput(e.target.value)}
                            placeholder="Type a message..."
                            aria-label="Message input"
                            rows={1}
                            className={`flex-grow resize-none rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-sm ${theme.input} ${theme.text}`}
                        />
                        <button type="submit" className="bg-primary text-white p-2 rounded-full hover:bg-primary-hover transition-colors flex-shrink-0" aria-label="Send message">
                            <SendIcon className="w-6 h-6" />
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ChatWidget;