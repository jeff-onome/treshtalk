import React, { useState, useEffect } from 'react';
import { ChatBubbleIcon, CloseIcon, SendIcon, CogIcon, SparklesIcon, CreditCardIcon } from './icons';

type Message = { id: number; text: string; sender: 'bot' | 'user'; type?: 'text' | 'payment_request' };
type Persona = { name: string; avatar: string; description: string; };

const personas: Persona[] = [
    { name: 'Sparky', avatar: 'https://picsum.photos/seed/sparky/100/100', description: 'Friendly & Enthusiastic' },
    { name: 'Professor', avatar: 'https://picsum.photos/seed/professor/100/100', description: 'Knowledgeable & Precise' },
    { name: 'Echo', avatar: 'https://picsum.photos/seed/echo/100/100', description: 'Calm & Supportive' },
];

const PaymentModal: React.FC<{ onPay: () => void; onClose: () => void }> = ({ onPay, onClose }) => (
    <div className="absolute inset-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm flex items-center justify-center p-4 z-20">
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold text-dark dark:text-white mb-4">Complete Your Payment</h3>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onPay(); }}>
                <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Card Number</label>
                    <input type="text" placeholder="•••• •••• •••• 4242" className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white" />
                </div>
                <div className="flex gap-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Expiry</label>
                        <input type="text" placeholder="MM / YY" className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white" />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">CVC</label>
                        <input type="text" placeholder="123" className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white" />
                    </div>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-500">Cancel</button>
                    <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-hover">Pay $29.99</button>
                </div>
            </form>
        </div>
    </div>
);

const ChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Hello! How can I help you today?", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
    const [currentPersona, setCurrentPersona] = useState<Persona>(personas[0]);

    useEffect(() => {
        const darkModeMatcher = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(darkModeMatcher.matches);
        const listener = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
        darkModeMatcher.addEventListener('change', listener);
        return () => darkModeMatcher.removeEventListener('change', listener);
    }, []);
    
    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() === '') return;
        setMessages([...messages, { id: Date.now(), text: input, sender: 'user' }]);
        setInput('');
        setTimeout(() => {
            setMessages(prev => [...prev, { id: Date.now() + 1, text: "Thanks for your message. An agent will be with you shortly.", sender: 'bot' }]);
        }, 1000);
    };

    const handlePaymentSuccess = () => {
        setIsPaymentOpen(false);
        setMessages(prev => [...prev, {id: Date.now(), text: 'Payment successful! Thank you.', sender: 'bot' }]);
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary-hover transition-transform transform hover:scale-110 z-50"
                aria-label="Open chat"
            >
                <ChatBubbleIcon className="h-8 w-8" />
            </button>
        );
    }

    return (
        <div className={`fixed bottom-6 right-6 w-80 sm:w-96 h-[28rem] sm:h-[32rem] bg-white rounded-2xl shadow-2xl flex flex-col transition-all duration-300 z-50 ${isDarkMode ? 'dark' : ''}`}>
            <div className="dark:bg-gray-900 flex flex-col h-full rounded-2xl overflow-hidden relative">
                {isPaymentOpen && <PaymentModal onPay={handlePaymentSuccess} onClose={() => setIsPaymentOpen(false)} />}
                {/* Header */}
                <div className="bg-primary text-white p-4 rounded-t-2xl flex justify-between items-center flex-shrink-0 z-10">
                    <h3 className="font-bold">Chat with {currentPersona.name}</h3>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setIsSettingsOpen(!isSettingsOpen)} className="p-1 rounded-full hover:bg-white/20">
                            <CogIcon className="h-6 w-6" />
                        </button>
                        <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-white/20">
                            <CloseIcon className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                {isSettingsOpen && (
                    <div className="absolute top-16 right-4 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 z-20 border border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-bold text-dark dark:text-white mb-3">Choose a Persona</p>
                        <div className="space-y-3">
                            {personas.map(p => (
                                <div key={p.name} onClick={() => { setCurrentPersona(p); setIsSettingsOpen(false); }} className={`flex items-center p-2 rounded-md cursor-pointer ${currentPersona.name === p.name ? 'bg-primary-light dark:bg-primary/30' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                                    <img src={p.avatar} alt={p.name} className="h-8 w-8 rounded-full" />
                                    <div className="ml-3">
                                        <p className="text-sm font-semibold text-dark dark:text-white">{p.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{p.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <div className="space-y-3">
                        {messages.map(msg => (
                            <div key={msg.id} className={`flex items-start gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.sender === 'bot' && <img src={currentPersona.avatar} className="h-8 w-8 rounded-full" />}
                                <div className={`max-w-[80%] p-3 rounded-xl ${msg.sender === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-gray-200 dark:bg-gray-700 text-dark dark:text-white rounded-bl-none'}`}>
                                   {msg.type === 'payment_request' ? (
                                        <div>
                                            <p className="text-sm mb-3">{msg.text}</p>
                                            <button onClick={() => setIsPaymentOpen(true)} className="w-full flex items-center justify-center gap-2 bg-secondary text-white font-bold py-2 px-4 rounded-lg hover:opacity-90">
                                                <CreditCardIcon className="h-5 w-5"/>
                                                Pay Now
                                            </button>
                                        </div>
                                   ) : (
                                       <p className="text-sm">{msg.text}</p>
                                   )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Input */}
                <form onSubmit={handleSend} className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2 flex-shrink-0 bg-white dark:bg-gray-900">
                    <input 
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-grow bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-sm text-dark dark:text-white"
                    />
                    <button type="submit" className="bg-primary text-white p-2 rounded-full hover:bg-primary-hover transition-colors flex-shrink-0">
                        <SendIcon className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatWidget;