import React from 'react';
import { Link } from 'react-router-dom';
import { SmartInvitationsIcon, LiveTypingIcon, QuickRepliesIcon, CustomerInsightsIcon, TeamCollaborationIcon, PerformanceReportsIcon } from '../components/icons.tsx';

const HomePage: React.FC = () => {
    return (
        <div>
            {/* Hero Section */}
            <section className="bg-white dark:bg-gray-900">
                <div className="container mx-auto px-6 py-16 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl font-extrabold text-dark dark:text-white lg:text-5xl">
                            The Smartest Way to Talk to Your Customers
                        </h1>
                        <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
                            TreshTalk's AI-powered live chat helps you engage visitors, capture leads, and provide instant support, 24/7.
                        </p>
                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <Link
                                to="/register"
                                className="inline-block bg-primary text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-primary-hover transition-colors duration-300 shadow-lg"
                            >
                                Get Started Free
                            </Link>
                            <Link
                                to="/features"
                                className="inline-block bg-gray-100 text-dark px-8 py-3 rounded-md text-lg font-medium hover:bg-gray-200 transition-colors duration-300"
                            >
                                See Features
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-light dark:bg-gray-800 py-20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-dark dark:text-white">Everything you need to succeed</h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">TreshTalk provides a complete suite of tools to supercharge your customer interactions.</p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <FeatureCard
                            icon={<SmartInvitationsIcon className="h-8 w-8 text-primary" />}
                            title="Proactive Chat Invitations"
                            description="Engage visitors with targeted messages based on their behavior to convert more leads."
                        />
                        <FeatureCard
                            icon={<LiveTypingIcon className="h-8 w-8 text-primary" />}
                            title="Live Typing Previews"
                            description="See what your visitors are typing in real-time to prepare your responses faster."
                        />
                         <FeatureCard
                            icon={<QuickRepliesIcon className="h-8 w-8 text-primary" />}
                            title="Canned Responses"
                            description="Save time and ensure consistency with pre-made answers to common questions."
                        />
                        <FeatureCard
                            icon={<CustomerInsightsIcon className="h-8 w-8 text-primary" />}
                            title="Visitor Insights"
                            description="Understand your visitors better with data like location, browsing history, and more."
                        />
                        <FeatureCard
                            icon={<TeamCollaborationIcon className="h-8 w-8 text-primary" />}
                            title="Team Collaboration"
                            description="Assign chats, leave private notes, and work together with your team to solve customer issues."
                        />
                        <FeatureCard
                            icon={<PerformanceReportsIcon className="h-8 w-8 text-primary" />}
                            title="In-depth Analytics"
                            description="Track chat volume, response times, and customer satisfaction to optimize your support."
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({ icon, title, description }) => (
    <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-dark dark:text-white mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
);

export default HomePage;