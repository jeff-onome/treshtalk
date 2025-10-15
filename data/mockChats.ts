export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'agent';
  timestamp: string;
  agentName?: string;
  agentAvatarUrl?: string;
  type?: 'text' | 'payment_request';
}

export interface Chat {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  avatarUrl: string;
  lastMessage: string;
  timestamp: string;
  status: 'open' | 'closed' | 'pending';
  messages: Message[];
}

export const mockChats: Chat[] = [
  {
    id: '1',
    customerName: 'Elena Rodriguez',
    customerEmail: 'elena.r@example.com',
    customerPhone: '+1 (555) 123-4567',
    avatarUrl: 'https://picsum.photos/seed/elena/100/100',
    lastMessage: 'Great, thank you for your help!',
    timestamp: '10:42 AM',
    status: 'open',
    messages: [
      { id: 1, text: 'Hi, I have a question about my recent order.', sender: 'user', timestamp: '10:35 AM', type: 'text' },
      { id: 2, text: 'Hello Elena, I can certainly help with that. What is your order number?', sender: 'agent', agentName: 'Alex', agentAvatarUrl: 'https://picsum.photos/seed/alex/100/100', timestamp: '10:36 AM', type: 'text' },
      { id: 3, text: 'It\'s #10582. I haven\'t received a shipping confirmation yet.', sender: 'user', timestamp: '10:37 AM', type: 'text' },
      { id: 4, text: 'Let me check on that for you. One moment...', sender: 'agent', agentName: 'Alex', agentAvatarUrl: 'https://picsum.photos/seed/alex/100/100', timestamp: '10:38 AM', type: 'text' },
      { id: 5, text: 'It looks like your order has just been shipped! You should receive an email with tracking information within the next 15 minutes.', sender: 'agent', agentName: 'Alex', agentAvatarUrl: 'https://picsum.photos/seed/alex/100/100', timestamp: '10:41 AM', type: 'text' },
      { id: 6, text: 'Great, thank you for your help!', sender: 'user', timestamp: '10:42 AM', type: 'text' },
    ],
  },
  {
    id: '2',
    customerName: 'Ben Carter',
    customerEmail: 'ben.carter@example.com',
    customerPhone: '+1 (555) 987-6543',
    avatarUrl: 'https://picsum.photos/seed/ben/100/100',
    lastMessage: 'The payment was successful!',
    timestamp: '9:20 AM',
    status: 'pending',
    messages: [
        { id: 1, text: 'Hi, I\'d like to pay my invoice.', sender: 'user', timestamp: '9:14 AM', type: 'text' },
        { id: 2, text: 'Of course. I can help with that.', sender: 'agent', agentName: 'Alex', agentAvatarUrl: 'https://picsum.photos/seed/alex/100/100', timestamp: '9:15 AM', type: 'text' },
        { id: 3, text: 'Please complete your payment for Invoice #INV-045 for $29.99.', sender: 'agent', agentName: 'Alex', agentAvatarUrl: 'https://picsum.photos/seed/alex/100/100', timestamp: '9:16 AM', type: 'payment_request' },
    ],
  },
  {
    id: '3',
    customerName: 'Sophie Chen',
    customerEmail: 'sophie.c@example.com',
    customerPhone: '+1 (555) 234-5678',
    avatarUrl: 'https://picsum.photos/seed/sophie/100/100',
    lastMessage: 'The issue is resolved. Thanks!',
    timestamp: 'Yesterday',
    status: 'closed',
    messages: [
        { id: 1, text: 'My widget isn\'t showing up on my website.', sender: 'user', timestamp: 'Yesterday', type: 'text' },
        { id: 2, text: 'Hi Sophie, did you remember to add the installation script to your HTML file?', sender: 'agent', agentName: 'Alex', agentAvatarUrl: 'https://picsum.photos/seed/alex/100/100', timestamp: 'Yesterday', type: 'text' },
        { id: 3, text: 'Oh, I think I forgot that step. Let me try now.', sender: 'user', timestamp: 'Yesterday', type: 'text' },
        { id: 4, text: 'It works! The issue is resolved. Thanks!', sender: 'user', timestamp: 'Yesterday', type: 'text' },
    ],
  },
  {
    id: '4',
    customerName: 'Marcus Wright',
    customerEmail: 'marcus.w@example.com',
    customerPhone: '+1 (555) 876-5432',
    avatarUrl: 'https://picsum.photos/seed/marcus/100/100',
    lastMessage: 'Is there an integration with HubSpot?',
    timestamp: 'Yesterday',
    status: 'closed',
    messages: [
        { id: 1, text: 'Is there an integration with HubSpot?', sender: 'user', timestamp: 'Yesterday', type: 'text' },
        { id: 2, text: 'Yes, there is! You can find it under the Integrations tab in your dashboard.', sender: 'agent', agentName: 'Alex', agentAvatarUrl: 'https://picsum.photos/seed/alex/100/100', timestamp: 'Yesterday', type: 'text' },
    ],
  },
];