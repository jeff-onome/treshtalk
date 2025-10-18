import React from 'react';
import { Link } from 'react-router-dom';
import { 
    MegaphoneIcon, 
    PencilSquareIcon,
    BoltIcon,
    UserCircleIcon,
    UserGroupIcon,
    PaperclipIcon,
    CogIcon,
    GlobeAltIcon,
    ChartBarIcon,
} from '../components/icons.tsx';

const FeatureDetail: React.FC<{
    title: string;
    description: string;
    imageUrl: string;
    link: string;
    linkText: string;
    imageLeft?: boolean;
}> = ({ title, description, imageUrl, link, linkText, imageLeft = false }) => (
    <div className={`flex flex-col md:flex-row items-center gap-12 ${imageLeft ? 'md:flex-row-reverse' : ''}`}>
        <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-dark dark:text-white mb-4">{title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>
            <Link to={link} className="font-semibold text-primary hover:text-primary-hover">
                {linkText} &rarr;
            </Link>
        </div>
        <div className="md:w-1/2">
            <img src={imageUrl} alt={title} className="rounded-lg shadow-xl" />
        </div>
    </div>
);

const PowerfulFeature: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({icon, title, description}) => (
    <div className="flex items-start gap-4">
        <div className="flex-shrink-0 text-primary bg-primary-light p-2 rounded-full">
            {icon}
        </div>
        <div>
            <h4 className="font-bold text-dark dark:text-white">{title}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        </div>
    </div>
);

const HomePage: React.FC = () => {
    return (
        <div className="bg-white dark:bg-dark">
            {/* Hero Section */}
            <section className="py-20 md:py-32">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-dark dark:text-white leading-tight">
                        TreshTalk – A Better Way to Talk to Your Customers
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Connect. Automate. Grow. Add a beautiful chat widget to your website, connect all your messaging channels, and support customers instantly — all from one place.
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                        <Link
                            to="/register"
                            className="inline-block bg-primary text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-primary-hover transition-colors duration-300 shadow-lg"
                        >
                            👉 Try TreshTalk for Free
                        </Link>
                    </div>
                     <div className="mt-12 text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">⭐ Trusted by Teams Everywhere</p>
                        <p className="text-gray-600 dark:text-gray-300">Rated 4.9/5 by businesses who made customer communication fast, personal, and effortless.</p>
                    </div>
                </div>
            </section>
            
            {/* All-in-One Section */}
            <section className="py-20 bg-light dark:bg-gray-800">
                <div className="container mx-auto px-4 text-center max-w-4xl">
                    <h2 className="text-3xl font-bold text-dark dark:text-white">💬 All-in-One Customer Chat Platform</h2>
                    <p className="text-xl font-semibold text-gray-700 dark:text-gray-200 mt-2">Simple. Fast. Powerful.</p>
                    <p className="mt-4 text-gray-600 dark:text-gray-300">
                        TreshTalk brings all your conversations — from live chat, email, and social channels — into one clean dashboard. Whether it’s support, sales, or feedback, your team can handle everything without switching tools.
                    </p>
                </div>
            </section>
            
            {/* Detailed Features */}
            <section className="py-20 space-y-20 container mx-auto px-4">
                 <FeatureDetail
                    title="⚡ Live Chat"
                    description="Start conversations in real time, solve problems faster, and close more deals right from your website."
                    imageUrl="https://picsum.photos/seed/livechat/800/600"
                    link="/features"
                    linkText="👉 Learn more"
                />
                 <FeatureDetail
                    title="🤖 Chatbots"
                    description="Let smart bots handle FAQs, qualify leads, and collect customer info while your team focuses on the big stuff. Even when you're offline, your bots keep working."
                    imageUrl="https://picsum.photos/seed/chatbots/800/600"
                    link="/features"
                    linkText="👉 Learn more"
                    imageLeft={true}
                />
                 <FeatureDetail
                    title="🔗 Multi-Channel Messaging"
                    description="Manage chats from your website, email, Facebook, Telegram, or Viber — all inside TreshTalk. No more switching tabs or missing messages."
                    imageUrl="https://picsum.photos/seed/multichannel/800/600"
                    link="/features"
                    linkText="👉 Learn more"
                />
                 <FeatureDetail
                    title="📚 Knowledge Base"
                    description="Create a self-service help center and link it to your chat widget. When customers ask a question, the FAQ bot automatically suggests the right article."
                    imageUrl="https://picsum.photos/seed/kb/800/600"
                    link="/features"
                    linkText="👉 Learn more"
                    imageLeft={true}
                />
            </section>

             {/* Cross-Platform & Integrations */}
            <section className="py-20 bg-light dark:bg-gray-800">
                <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-dark dark:text-white mb-4">📱 Talk Anywhere</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">Stay Connected on Any Device. Use TreshTalk on iOS, Android, Web, Windows, and Mac. Chats sync instantly across devices — reply from your phone or desktop anytime.</p>
                        <Link to="#" className="font-semibold text-primary hover:text-primary-hover">👉 Download the App &rarr;</Link>
                    </div>
                     <div>
                        <h2 className="text-3xl font-bold text-dark dark:text-white mb-4">🧩 Integrations & API</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">Connect TreshTalk with Your Favorite Tools. Integrate with your CRM, email tools, and over 4,000+ apps via Zapier. Or use our API to connect TreshTalk with your own systems.</p>
                        <Link to="/integrations" className="font-semibold text-primary hover:text-primary-hover">👉 Explore Integrations &rarr;</Link>
                    </div>
                </div>
            </section>
            
            {/* Powerful Features Grid */}
            <section className="py-20 container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl font-bold text-dark dark:text-white">🚀 Powerful Features to Work Smarter</h2>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">Everything you need for fast, personal support:</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <PowerfulFeature icon={<MegaphoneIcon className="h-6 w-6"/>} title="Auto Invitations" description="Greet visitors automatically based on their behavior." />
                    <PowerfulFeature icon={<PencilSquareIcon className="h-6 w-6"/>} title="Typing Insights" description="See what users are typing before they send messages." />
                    <PowerfulFeature icon={<BoltIcon className="h-6 w-6"/>} title="Saved Replies" description="Respond faster using pre-written templates." />
                    <PowerfulFeature icon={<UserCircleIcon className="h-6 w-6"/>} title="Customer Details" description="Instantly view name, contact, location, and site history." />
                    <PowerfulFeature icon={<UserGroupIcon className="h-6 w-6"/>} title="Group Chats" description="Add teammates into ongoing chats to collaborate." />
                    <PowerfulFeature icon={<PaperclipIcon className="h-6 w-6"/>} title="File Sharing" description="Send images, videos, or documents right in chat." />
                    <PowerfulFeature icon={<CogIcon className="h-6 w-6"/>} title="Widget Customization" description="Change colors, texts, position, and agent photos." />
                    <PowerfulFeature icon={<GlobeAltIcon className="h-6 w-6"/>} title="Multi-Language Support" description="Display chat in your customer’s language." />
                    <PowerfulFeature icon={<ChartBarIcon className="h-6 w-6"/>} title="Reports & Analytics" description="Track chats, response time, and agent performance." />
                </div>
                <div className="text-center mt-12">
                    <Link to="/features" className="font-semibold text-primary hover:text-primary-hover">👉 See All Features &rarr;</Link>
                </div>
            </section>

             {/* Testimonials */}
            <section className="py-20 bg-light dark:bg-gray-800">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h2 className="text-3xl font-bold text-dark dark:text-white mb-10">❤️ What Our Users Say</h2>
                    <div className="space-y-8">
                        <blockquote className="text-xl text-gray-700 dark:text-gray-200">
                            <p>“The easiest chat software I’ve ever used. Setup took 5 minutes — and it just works.”</p>
                            <footer className="mt-4 text-base text-gray-500 dark:text-gray-400 font-semibold">— Evelyn K., Marketing Manager</footer>
                        </blockquote>
                         <blockquote className="text-xl text-gray-700 dark:text-gray-200">
                            <p>“TreshTalk helped us close more sales by answering customers instantly.”</p>
                            <footer className="mt-4 text-base text-gray-500 dark:text-gray-400 font-semibold">— Victor O., Store Owner</footer>
                        </blockquote>
                         <blockquote className="text-xl text-gray-700 dark:text-gray-200">
                            <p>“We connected it to Telegram and Facebook in minutes. Perfect for our remote team.”</p>
                            <footer className="mt-4 text-base text-gray-500 dark:text-gray-400 font-semibold">— Daniel P., Tech Support Lead</footer>
                        </blockquote>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 bg-white dark:bg-dark">
                <div className="container mx-auto px-4 text-center">
                     <h2 className="text-3xl font-bold text-dark dark:text-white">🌎 Join Thousands of Teams Using TreshTalk</h2>
                     <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">Fast, modern, and built for connection. Start chatting with your customers today — no code needed.</p>
                     <div className="mt-8">
                         <Link to="/register" className="inline-block bg-primary text-white px-8 py-4 rounded-md text-lg font-medium hover:bg-primary-hover transition-colors duration-300 shadow-lg">
                            👉 Try TreshTalk for Free
                        </Link>
                     </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;