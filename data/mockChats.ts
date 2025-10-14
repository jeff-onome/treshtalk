
export interface Message {
  id: string;
  text: string;
  timestamp: string;
  sender: 'user' | 'agent';
  agentName?: string;
  agentAvatar?: string;
}

export interface Chat {
  id: string;
  customerName: string;
  lastMessage: string;
  timestamp: string;
  avatarUrl: string;
  status: 'open' | 'closed' | 'pending';
  messages: Message[];
}

export const mockChats: Chat[] = [
  {
    id: '1',
    customerName: 'Alice Johnson',
    lastMessage: 'Thank you so much, that solved it!',
    timestamp: '2m ago',
    avatarUrl: 'https://picsum.photos/id/1011/100/100',
    status: 'open',
    messages: [
      { id: 'm1', text: 'Hi, I\'m having trouble with my recent order.', timestamp: '10:30 AM', sender: 'user' },
      { id: 'm2', text: 'Hello Alice, I can help with that. What is your order number?', timestamp: '10:31 AM', sender: 'agent', agentName: 'Alex' },
      { id: 'm3', text: 'It\'s #12345.', timestamp: '10:32 AM', sender: 'user' },
      { id: 'm4', text: 'Thanks. It looks like it was just shipped. Here is the tracking number: XYZ123.', timestamp: '10:34 AM', sender: 'agent', agentName: 'Alex' },
      { id: 'm5', text: 'Thank you so much, that solved it!', timestamp: '10:35 AM', sender: 'user' },
    ],
  },
  {
    id: '2',
    customerName: 'Bob Williams',
    lastMessage: 'Can you tell me more about the Pro plan features?',
    timestamp: '15m ago',
    avatarUrl: 'https://picsum.photos/id/1005/100/100',
    status: 'open',
    messages: [
       { id: 'm1', text: 'Can you tell me more about the Pro plan features?', timestamp: '10:15 AM', sender: 'user' },
    ]
  },
  {
    id: '3',
    customerName: 'Charlie Brown',
    lastMessage: 'What is your refund policy?',
    timestamp: '1h ago',
    avatarUrl: 'https://picsum.photos/id/1025/100/100',
    status: 'pending',
    messages: [
      { id: 'm1', text: 'What is your refund policy?', timestamp: '9:30 AM', sender: 'user' },
    ]
  },
  {
    id: '4',
    customerName: 'Diana Miller',
    lastMessage: 'Great, thanks for your help!',
    timestamp: 'Yesterday',
    avatarUrl: 'https://picsum.photos/id/1027/100/100',
    status: 'closed',
    messages: [
        { id: 'm1', text: 'How do I integrate with Shopify?', timestamp: 'Yesterday', sender: 'user' },
        { id: 'm2', text: 'Here is our guide on Shopify integration: [link]', timestamp: 'Yesterday', sender: 'agent', agentName: 'Alex' },
        { id: 'm3', text: 'Great, thanks for your help!', timestamp: 'Yesterday', sender: 'user' },
    ]
  },
];
