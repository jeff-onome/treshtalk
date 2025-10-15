import React from 'react';
import { Link } from 'react-router-dom';
import { mockChats, Chat } from '../data/mockChats';
import { ChatBubbleIcon } from '../components/icons';

const StatusBadge: React.FC<{ status: 'open' | 'closed' | 'pending' }> = ({ status }) => {
    const baseClasses = "px-2 py-0.5 text-xs font-semibold rounded-full capitalize leading-normal";
    let colorClasses = "";

    switch (status) {
        case 'open':
            colorClasses = "bg-green-100 text-green-800";
            break;
        case 'pending':
            colorClasses = "bg-yellow-100 text-yellow-800";
            break;
        case 'closed':
            colorClasses = "bg-gray-200 text-gray-700";
            break;
    }

    return (
        <span className={`${baseClasses} ${colorClasses}`}>
            {status}
        </span>
    );
};

const ChatListItem: React.FC<{ chat: Chat }> = ({ chat }) => {
    const isUnread = chat.status === 'open' || chat.status === 'pending';

    return (
        <Link 
            to={`/dashboard/chats/${chat.id}`} 
            className="flex items-center p-4 bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150"
        >
            <img className="h-12 w-12 rounded-full object-cover flex-shrink-0" src={chat.avatarUrl} alt={chat.customerName} />
            <div className="ml-4 flex-grow min-w-0">
                <div className="flex justify-between items-center">
                    <h3 className="text-md font-semibold text-dark truncate">{chat.customerName}</h3>
                    <p className="text-xs text-gray-500 ml-2 flex-shrink-0">{chat.timestamp}</p>
                </div>
                <div className="flex justify-between items-center mt-1">
                    <p className={`text-sm truncate ${isUnread ? 'font-semibold text-dark' : 'text-gray-600'}`}>
                        {chat.lastMessage}
                    </p>
                    <div className="ml-2 flex-shrink-0">
                        <StatusBadge status={chat.status} />
                    </div>
                </div>
            </div>
            {isUnread && (
                <div className="ml-4 flex-shrink-0">
                    <span className="block h-3 w-3 bg-primary rounded-full"></span>
                </div>
            )}
        </Link>
    );
};

const ChatsPage: React.FC = () => {
    if (mockChats.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow h-full flex items-center justify-center text-center p-8">
                <div>
                    <div className="mx-auto h-16 w-16 text-gray-300">
                        <ChatBubbleIcon strokeWidth={1}/>
                    </div>
                    <h2 className="mt-4 text-xl font-semibold text-dark">Your inbox is empty</h2>
                    <p className="mt-2 text-gray-500">
                        New conversations from your website widget will appear here.
                    </p>
                    <Link
                        to="/dashboard/installation"
                        className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                        Get the installation code
                    </Link>
                </div>
            </div>
        );
    }

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