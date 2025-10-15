import React, { useEffect } from 'react';
import PageHeader from '../components/PageHeader.tsx';

const UpdateItem: React.FC<{ version: string; date: string; title: string; description: string }> = ({ version, date, title, description }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-4 mb-3">
            <span className="bg-primary text-white font-bold text-sm px-3 py-1 rounded-full">{version}</span>
            <p className="text-gray-500">{date}</p>
        </div>
        <h3 className="text-xl font-bold text-dark mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const UpdatesPage: React.FC = () => {
  useEffect(() => {
    const originalTitle = document.title;
    const originalDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');

    document.title = "Product Updates - TreshTalk | What's New";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Check out the latest product updates, improvements, and feature releases from the TreshTalk team.');

    let metaKeywords = document.createElement('meta');
    metaKeywords.setAttribute('name', 'keywords');
    metaKeywords.setAttribute('content', 'product updates, changelog, new features, TreshTalk updates');
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
        title="What's New at TreshTalk"
        subtitle="Check out our latest product updates, improvements, and feature releases."
        imageUrl="https://picsum.photos/seed/updates/1920/1080"
      />
      <div className="bg-light py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-8">
              <UpdateItem 
                  version="v2.5"
                  date="August 1, 2024"
                  title="New Dashboard Analytics"
                  description="We've completely revamped our analytics dashboard to give you deeper insights into chatbot performance and customer satisfaction."
              />
              <UpdateItem 
                  version="v2.4"
                  date="July 18, 2024"
                  title="HubSpot Integration"
                  description="You can now seamlessly sync your TreshTalk leads and conversations with your HubSpot CRM."
              />
              <UpdateItem 
                  version="v2.3"
                  date="June 25, 2024"
                  title="Improved Chatbot AI"
                  description="Our AI model has been updated for better intent recognition and more natural-sounding conversations."
              />
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatesPage;