import React, { useEffect } from 'react';
import PageHeader from '../components/PageHeader.tsx';

const FeatureItem: React.FC<{ title: string; description: string }> = ({ title, description }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-dark mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const FeaturesPage: React.FC = () => {
  useEffect(() => {
    const originalTitle = document.title;
    const originalDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');

    document.title = 'Features - TreshTalk | Powerful AI Chatbot Tools';
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', "Explore TreshTalk's powerful features like proactive chat, canned responses, advanced customization, and in-depth analytics to grow your business.");

    let metaKeywords = document.createElement('meta');
    metaKeywords.setAttribute('name', 'keywords');
    metaKeywords.setAttribute('content', 'AI chatbot features, live chat, customer support tools, proactive chat, canned responses, analytics');
    document.head.appendChild(metaKeywords);
    
    return () => {
        document.title = originalTitle;
        if (originalDescription && metaDescription) {
            metaDescription.setAttribute('content', originalDescription);
        }
        document.head.removeChild(metaKeywords);
    };
  }, []);

  return (
    <>
      <PageHeader 
        title="Powerful Features to Grow Your Business"
        subtitle="TreshTalk comes packed with industry-leading features designed to enhance customer engagement and drive sales."
        imageUrl="https://picsum.photos/seed/features/1920/1080"
      />
      <div className="bg-light py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <FeatureItem 
                  title="Proactive Chat"
                  description="Engage visitors with targeted messages based on their behavior, location, or referral source to convert more leads."
              />
              <FeatureItem 
                  title="Canned Responses"
                  description="Save time and ensure consistency with pre-made answers to frequently asked questions."
              />
              <FeatureItem 
                  title="Chatbot to Human Handoff"
                  description="Seamlessly transfer complex conversations from the AI chatbot to a live agent without losing context."
              />
              <FeatureItem 
                  title="Advanced Customization"
                  description="Customize the look and feel of your chat widget to perfectly match your brand's identity."
              />
              <FeatureItem 
                  title="Multi-language Support"
                  description="Communicate with customers in their native language with automatic translation and language detection."
              />
              <FeatureItem 
                  title="In-depth Analytics"
                  description="Track chat volume, response times, customer satisfaction, and more to optimize your support strategy."
              />
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturesPage;