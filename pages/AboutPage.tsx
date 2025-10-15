import React, { useEffect } from 'react';
import PageHeader from '../components/PageHeader';

const AboutPage: React.FC = () => {
  useEffect(() => {
    const originalTitle = document.title;
    const originalDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');

    document.title = 'About Us - TreshTalk | Our Mission';
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', "Learn about TreshTalk's mission to revolutionize customer communication with accessible, AI-driven solutions for businesses of all sizes.");

    let metaKeywords = document.createElement('meta');
    metaKeywords.setAttribute('name', 'keywords');
    metaKeywords.setAttribute('content', 'about TreshTalk, AI customer service, company mission, chatbot technology');
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
        title="About TreshTalk"
        subtitle="We are on a mission to revolutionize the way businesses communicate with their customers."
        imageUrl="https://picsum.photos/seed/about/1920/1080"
      />
      <div className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-gray-700 space-y-6">
              <p>
                  TreshTalk was founded in 2023 with a simple goal: to make sophisticated, AI-driven customer service accessible to businesses of all sizes. We saw that while customers' expectations for instant, 24/7 support were rising, the tools available were often too complex, expensive, or robotic.
              </p>
              <p>
                  We believe that technology should enhance human connection, not replace it. That's why our platform is built around a powerful AI core that handles the routine inquiries, freeing up human agents to focus on the conversations that matter most. Our chatbots are designed to be helpful, friendly, and seamlessly integrated into your brand's voice.
              </p>
              <p>
                  Today, thousands of businesses around the world trust TreshTalk to power their customer conversations, improve satisfaction, and drive growth. We're a passionate team of developers, designers, and customer support enthusiasts dedicated to building the future of online communication.
              </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;