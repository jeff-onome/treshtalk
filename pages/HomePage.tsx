import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircleIcon,
  SmartInvitationsIcon,
  LiveTypingIcon,
  QuickRepliesIcon,
  CustomerInsightsIcon,
  TeamCollaborationIcon,
  PaperclipIcon,
  CustomizableWidgetIcon,
  MultilingualSupportIcon,
  PerformanceReportsIcon
} from '../components/icons';

// Feature Grid Item Component
const FeatureGridItem: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="flex flex-col items-start text-left">
    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary-light text-primary mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-dark mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);


// Testimonial Card Component
const TestimonialCard: React.FC<{ quote: string; author: string; role: string; avatarUrl: string }> = ({ quote, author, role, avatarUrl }) => (
  <div className="bg-white p-8 rounded-lg shadow-md text-center">
    <p className="text-gray-600 italic">"{quote}"</p>
    <div className="mt-6 flex justify-center items-center">
      <img className="h-12 w-12 rounded-full object-cover" src={avatarUrl} alt={author} />
      <div className="ml-4 text-left">
        <p className="font-semibold text-dark">{author}</p>
        <p className="text-gray-500 text-sm">{role}</p>
      </div>
    </div>
  </div>
);

const HomePage: React.FC = () => {
    useEffect(() => {
    const originalTitle = document.title;
    const originalDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');

    document.title = 'TreshTalk - AI Chatbot for Sales & Support';
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'TreshTalk is the AI-powered chatbot that engages your website visitors in real-time, boosts sales, and delivers exceptional customer support.');

    let metaKeywords = document.createElement('meta');
    metaKeywords.setAttribute('name', 'keywords');
    metaKeywords.setAttribute('content', 'AI chatbot, live chat, customer support, lead generation, sales bot, TreshTalk');
    document.head.appendChild(metaKeywords);
    
    return () => {
        document.title = originalTitle;
        if (originalDescription && metaDescription) {
            metaDescription.setAttribute('content', originalDescription);
        }
        document.head.removeChild(metaKeywords);
    };
  }, []);
  
  const powerfulFeatures = [
    {
      icon: <SmartInvitationsIcon className="h-6 w-6" />,
      title: 'Smart Invitations',
      description: 'Automatically invite visitors to chat based on behavior, page activity, or custom rules.',
    },
    {
      icon: <LiveTypingIcon className="h-6 w-6" />,
      title: 'Live Typing Preview',
      description: 'See messages as your customers type — respond even faster and improve satisfaction.',
    },
    {
      icon: <QuickRepliesIcon className="h-6 w-6" />,
      title: 'Quick Replies',
      description: 'Save and reuse templates for common questions to reply in seconds.',
    },
    {
      icon: <CustomerInsightsIcon className="h-6 w-6" />,
      title: 'Customer Insights',
      description: 'Access detailed user profiles including contact info, location, and site activity.',
    },
    {
      icon: <TeamCollaborationIcon className="h-6 w-6" />,
      title: 'Team Collaboration',
      description: 'Invite teammates to assist in chats or join ongoing conversations seamlessly.',
    },
    {
      icon: <PaperclipIcon className="h-6 w-6" />,
      title: 'File Sharing',
      description: 'Exchange images, videos, audio, and other files directly in the chat.',
    },
    {
      icon: <CustomizableWidgetIcon className="h-6 w-6" />,
      title: 'Customizable Widget',
      description: 'Personalize your chat widget — choose colors, background, text, and agent photos to match your brand.',
    },
    {
      icon: <MultilingualSupportIcon className="h-6 w-6" />,
      title: 'Multilingual Support',
      description: 'Automatically display your chat widget in each customer’s preferred language.',
    },
    {
      icon: <PerformanceReportsIcon className="h-6 w-6" />,
      title: 'Performance Reports',
      description: 'Track chats, team activity, and missed conversations in real time with built-in analytics.',
    },
  ];


  return (
    <div>
      {/* Hero Section */}
      <section className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-extrabold text-dark tracking-tight">
                Convert More Visitors with <span className="text-primary">Smarter Conversations</span>
              </h1>
              <p className="mt-6 max-w-xl mx-auto md:mx-0 text-lg md:text-xl text-gray-600">
                TreshTalk is the AI-powered chatbot that engages your website visitors in real-time, boosts sales, and delivers exceptional customer support.
              </p>
              <div className="mt-8 flex justify-center md:justify-start gap-4">
                <Link to="/register" className="inline-block bg-primary text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-primary-hover transition-colors duration-300 shadow-lg">
                  Get Started for Free
                </Link>
                <Link to="/pricing" className="inline-block bg-gray-200 text-gray-800 px-8 py-3 rounded-md text-lg font-medium hover:bg-gray-300 transition-colors duration-300">
                  View Pricing
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img src="https://picsum.photos/seed/chatbot-ui/1200/900" className="rounded-lg shadow-xl" alt="AI Chatbot illustration" />
            </div>
          </div>
        </div>
      </section>

      {/* Knowledge Base Section */}
      <section className="py-20 bg-light">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="text-center md:text-left">
                      <h2 className="text-3xl font-extrabold text-dark">🧠 Knowledge Base</h2>
                      <p className="mt-4 text-lg text-gray-600">
                          Empower Your Customers with Self-Service. Build an intelligent knowledge base that helps your users find answers instantly. Enable the smart FAQ bot to automatically suggest the most relevant articles right inside the chat window.
                      </p>
                      <div className="mt-6">
                          <Link to="/features" className="font-semibold text-primary hover:text-primary-hover">
                              Learn More &rarr;
                          </Link>
                      </div>
                  </div>
                  <div className="order-first md:order-last">
                      <img src="https://picsum.photos/seed/knowledge/1200/900" className="rounded-lg shadow-xl" alt="Knowledge base illustration" />
                  </div>
              </div>
          </div>
      </section>

      {/* Powerful Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-dark">⚡ Powerful Features</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
              Everything You Need for Fast, Effective Support
            </p>
          </div>
          <div className="mt-16 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {powerfulFeatures.map((feature) => (
              <FeatureGridItem key={feature.title} {...feature} />
            ))}
          </div>
          <div className="text-center mt-16">
            <Link to="/features" className="font-semibold text-primary hover:text-primary-hover text-lg">
              View All Features &rarr;
            </Link>
          </div>
        </div>
      </section>
      
      {/* Multi-Channel Section */}
      <section className="py-20 bg-light">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                   <div>
                      <img src="https://picsum.photos/seed/multichannel/1200/900" className="rounded-lg shadow-xl" alt="Multi-channel communication" />
                  </div>
                  <div className="text-center md:text-left">
                      <h2 className="text-3xl font-extrabold text-dark">🌐 Multi-Channel</h2>
                      <p className="mt-4 text-lg text-gray-600">
                          Connect and Manage All Conversations in One Place. Bring every message together — from live chat, email, Facebook, Telegram, or Viber — and respond to them all directly from TreshTalk.
                      </p>
                      <div className="mt-6">
                          <Link to="/features" className="font-semibold text-primary hover:text-primary-hover">
                              Discover More &rarr;
                          </Link>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center">
            <h2 className="text-3xl font-extrabold text-dark">Loved by businesses worldwide</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
              Don't just take our word for it. Here's what our customers are saying.
            </p>
          </div>
          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            <TestimonialCard 
              quote="TreshTalk transformed our customer support. We've seen a 40% reduction in support tickets and our customers are happier than ever."
              author="Sarah Johnson"
              role="CEO, Innovate Co."
              avatarUrl="https://picsum.photos/id/1011/100/100"
            />
            <TestimonialCard 
              quote="The setup was incredibly simple, and the AI is surprisingly powerful. It's been a game-changer for our sales team, helping us qualify leads 24/7."
              author="Michael Chen"
              role="Head of Sales, Growthify"
              avatarUrl="https://picsum.photos/id/1005/100/100"
            />
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section className="py-20 bg-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-dark">Simple, Transparent Pricing</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Choose the plan that's right for your business. No hidden fees.
          </p>
          <div className="mt-12 max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-dark">Pro Plan</h3>
            <p className="mt-2 text-gray-500">For growing businesses</p>
            <p className="mt-6 text-5xl font-extrabold text-dark">
              $49<span className="text-xl font-medium text-gray-500">/mo</span>
            </p>
            <ul className="mt-6 space-y-3 text-left">
              <li className="flex items-center"><CheckCircleIcon className="h-6 w-6 text-secondary mr-3" />Unlimited Conversations</li>
              <li className="flex items-center"><CheckCircleIcon className="h-6 w-6 text-secondary mr-3" />Advanced AI Features</li>
              <li className="flex items-center"><CheckCircleIcon className="h-6 w-6 text-secondary mr-3" />Integration with CRM</li>
            </ul>
             <Link to="/pricing" className="mt-8 block w-full bg-primary text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-primary-hover transition-colors duration-300">
              See All Plans
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
           <h2 className="text-3xl font-extrabold text-white">
            Ready to Revolutionize Your Customer Service?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-light">
            Join thousands of businesses already using TreshTalk to drive growth.
          </p>
          <div className="mt-8">
             <Link to="/register" className="inline-block bg-white text-primary px-8 py-3 rounded-md text-lg font-medium hover:bg-gray-100 transition-colors duration-300 shadow-lg">
              Start Your 14-Day Free Trial
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;