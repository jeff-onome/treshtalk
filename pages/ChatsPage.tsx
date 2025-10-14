
import React from 'react';
import { Link } from 'react-router-dom';
import { mockChats, Chat } from '../data/mockChats';

const ChatListItem: React.FC<{ chat: Chat }> = ({ chat }) => {
    return (
        <Link 
            to={`/dashboard/chats/${chat.id}`} 
            className="flex items-center p-4 bg-white border-b border-gray-200 hover:bg-gray-50"
        >
            <img className="h-12 w-12 rounded-full object-cover" src={chat.avatarUrl} alt={chat.customerName} />
            <div className="ml-4 flex-grow">
                <div className="flex justify-between items-center">
                    <h3 className="text-md font-semibold text-dark">{chat.customerName}</h3>
                    <p className="text-xs text-gray-500">{chat.timestamp}</p>
                </div>
                <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
            </div>
        </Link>
    );
};

const ChatsPage: React.FC = () => {
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="flex flex-col">
                {mockChats.map(chat => (
                    <ChatListItem key={chat.id} chat={chat} />
                ))}
            </div>
        </div>
    );
};

export default ChatsPage;
