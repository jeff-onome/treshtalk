import React from 'react';
import PageHeader from '../components/PageHeader';

const AboutPage: React.FC = () => {
  return (
    <>
      <PageHeader
        title="About Treshchat"
        subtitle="We are on a mission to revolutionize the way businesses communicate with their customers."
        imageUrl="https://picsum.photos/seed/about/1920/1080"
      />
      <div className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-gray-700 space-y-6">
              <p>
                  Treshchat was founded in 2023 with a simple goal: to make sophisticated, AI-driven customer service accessible to businesses of all sizes. We saw that while customers' expectations for instant, 24/7 support were rising, the tools available were often too complex, expensive, or robotic.
              </p>
              <p>
                  We believe that technology should enhance human connection, not replace it. That's why our platform is built around a powerful AI core that handles the routine inquiries, freeing up human agents to focus on the conversations that matter most. Our chatbots are designed to be helpful, friendly, and seamlessly integrated into your brand's voice.
              </p>
              <p>
                  Today, thousands of businesses around the world trust Treshchat to power their customer conversations, improve satisfaction, and drive growth. We're a passionate team of developers, designers, and customer support enthusiasts dedicated to building the future of online communication.
              </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;