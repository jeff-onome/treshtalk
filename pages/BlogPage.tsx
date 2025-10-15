import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

const BlogPostCard: React.FC<{ title: string; excerpt: string; date: string; author: string }> = ({ title, excerpt, date, author }) => (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
        <p className="text-sm text-gray-500 mb-2">{date} by {author}</p>
        <h3 className="text-xl font-bold text-dark mb-3">{title}</h3>
        <p className="text-gray-600 mb-4">{excerpt}</p>
        <Link to="/blog/post" className="font-semibold text-primary hover:text-primary-hover">Read More &rarr;</Link>
    </div>
);

const BlogPage: React.FC = () => {
  useEffect(() => {
    const originalTitle = document.title;
    const originalDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');

    document.title = 'Blog - TreshTalk | AI & Customer Support Insights';
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Read the TreshTalk blog for the latest insights, tips, and stories on customer communication, AI technology, and chatbot strategies.');

    let metaKeywords = document.createElement('meta');
    metaKeywords.setAttribute('name', 'keywords');
    metaKeywords.setAttribute('content', 'customer support blog, AI chatbot articles, customer communication tips, tech blog');
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
        title="TreshTalk Blog"
        subtitle="Insights, tips, and stories on customer communication and AI technology."
        imageUrl="https://picsum.photos/seed/blog/1920/1080"
      />
      <div className="bg-light py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <BlogPostCard 
                  title="5 Ways AI Chatbots Can Boost Your Sales"
                  excerpt="Discover how implementing an AI chatbot can not only improve customer service but also have a direct impact on your bottom line."
                  date="August 5, 2024"
                  author="Jane Doe"
              />
               <BlogPostCard 
                  title="The Future of Customer Support is Hybrid"
                  excerpt="Learn why the best support systems combine the efficiency of AI with the empathy and problem-solving skills of human agents."
                  date="July 28, 2024"
                  author="John Smith"
              />
               <BlogPostCard 
                  title="How to Choose the Right Chatbot for Your Business"
                  excerpt="A comprehensive guide to navigating the chatbot market and selecting a solution that fits your specific needs and budget."
                  date="July 15, 2024"
                  author="Jane Doe"
              />
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPage;