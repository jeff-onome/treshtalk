import React, { useEffect } from 'react';
import PageHeader from '../components/PageHeader';

const ContactPage: React.FC = () => {
  useEffect(() => {
    const originalTitle = document.title;
    const originalDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');

    document.title = 'Contact Us - TreshTalk';
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', "Get in touch with the TreshTalk team. We're here to answer your questions about features, pricing, and getting started.");

    let metaKeywords = document.createElement('meta');
    metaKeywords.setAttribute('name', 'keywords');
    metaKeywords.setAttribute('content', 'contact TreshTalk, TreshTalk support, sales inquiry, customer service');
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
        title="Get in Touch"
        subtitle="We'd love to hear from you! Whether you have a question about features, pricing, or anything else, our team is ready to answer all your questions."
        imageUrl="https://picsum.photos/seed/contact/1920/1080"
      />
      <div className="bg-light py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-16 max-w-lg mx-auto">
              <div className="bg-white p-8 shadow-lg rounded-lg">
                   <form className="space-y-6">
                      <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                          <input type="text" name="name" id="name" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
                      </div>
                      <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                          <input type="email" name="email" id="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
                      </div>
                       <div>
                          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                          <textarea name="message" id="message" rows={4} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"></textarea>
                      </div>
                      <div>
                          <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                              Send Message
                          </button>
                      </div>
                  </form>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;