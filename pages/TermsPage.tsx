import React, { useEffect } from 'react';
import PageHeader from '../components/PageHeader';

const TermsPage: React.FC = () => {
  useEffect(() => {
    const originalTitle = document.title;
    const originalDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');

    document.title = 'Terms of Service - TreshTalk';
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Please review the TreshTalk Terms of Service. By using our services, you agree to be bound by these terms.');

    let metaKeywords = document.createElement('meta');
    metaKeywords.setAttribute('name', 'keywords');
    metaKeywords.setAttribute('content', 'terms of service, terms and conditions, legal, TreshTalk terms');
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
        title="Terms of Service"
        subtitle="Please read these terms carefully before using our service."
        imageUrl="https://picsum.photos/seed/terms/1920/1080"
      />
      <div className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-gray-500 -mt-8 mb-12">Last updated: August 5, 2024</p>
            
            <div className="prose lg:prose-lg max-w-none text-gray-700">
              <h2>1. Agreement to Terms</h2>
              <p>By using our services, you agree to be bound by these Terms. If you do not agree to these Terms, do not use the services. We may modify the Terms at any time, in our sole discretion. If we do so, we’ll let you know either by posting the modified Terms on the Site or through other communications.</p>
              
              <h2>2. Your Account</h2>
              <p>You may need to create an account to use some of our services. You are responsible for safeguarding your account, so use a strong password and limit its use to this account. We cannot and will not be liable for any loss or damage arising from your failure to comply with the above.</p>

              <h2>3. Content</h2>
              <p>Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the Content that you post to the Service, including its legality, reliability, and appropriateness.</p>

              <h2>4. Termination</h2>
              <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>

              {/* Add more placeholder sections as needed */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsPage;