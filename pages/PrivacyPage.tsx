import React, { useEffect } from 'react';
import PageHeader from '../components/PageHeader.tsx';

const PrivacyPage: React.FC = () => {
  useEffect(() => {
    const originalTitle = document.title;
    const originalDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');

    document.title = 'Privacy Policy - TreshTalk';
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Read the official TreshTalk Privacy Policy to understand how we collect, use, and protect your personal information.');

    let metaKeywords = document.createElement('meta');
    metaKeywords.setAttribute('name', 'keywords');
    metaKeywords.setAttribute('content', 'privacy policy, data protection, user privacy, TreshTalk legal');
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
        title="Privacy Policy"
        subtitle="Your privacy is important to us. Learn how we collect and use your information."
        imageUrl="https://picsum.photos/seed/privacy/1920/1080"
      />
      <div className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-gray-500 -mt-8 mb-12">Last updated: August 5, 2024</p>
            <div className="prose lg:prose-lg max-w-none text-gray-700">
              <h2>1. Introduction</h2>
              <p>Welcome to TreshTalk. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.</p>
              
              <h2>2. Information We Collect</h2>
              <p>We may collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website or otherwise when you contact us.</p>

              <h2>3. How We Use Your Information</h2>
              <p>We use personal information collected via our website for a variety of business purposes, including to provide and manage your account, to send you marketing and promotional communications, and to respond to your inquiries and solve any potential issues you might have with the use of our Services.</p>

              <h2>4. Will Your Information Be Shared With Anyone?</h2>
              <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.</p>

              {/* Add more placeholder sections as needed */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPage;