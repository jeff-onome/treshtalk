import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircleIcon } from '../components/icons';
import PageHeader from '../components/PageHeader';

interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular: boolean;
  ctaText: string;
}

const plans: PricingPlan[] = [
  {
    name: 'Starter',
    price: '0',
    description: 'For individuals and small teams trying out Treshchat.',
    features: ['1 agent', '100 chats/month', 'Basic widget customization', 'Community support'],
    isPopular: false,
    ctaText: 'Start for Free',
  },
  {
    name: 'Pro',
    price: '49',
    description: 'For growing businesses that need more power and automation.',
    features: ['Up to 5 agents', 'Unlimited chats', 'Advanced AI features', 'CRM integrations', 'Priority email support'],
    isPopular: true,
    ctaText: 'Start Free Trial',
  },
  {
    name: 'Business',
    price: '99',
    description: 'For established companies with advanced support needs.',
    features: ['Unlimited agents', 'Proactive messaging', 'Advanced analytics', 'Dedicated account manager'],
    isPopular: false,
    ctaText: 'Start Free Trial',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations with specific security and support requirements.',
    features: ['Custom features', 'Single Sign-On (SSO)', 'On-premise deployment', '24/7 premium support'],
    isPopular: false,
    ctaText: 'Contact Sales',
  },
];

const PricingCard: React.FC<{ plan: PricingPlan }> = ({ plan }) => {
    const ctaLink = plan.ctaText === 'Contact Sales' ? '/contact' : '/register';
    return (
        <div className={`border rounded-xl p-8 flex flex-col ${plan.isPopular ? 'border-primary shadow-2xl relative' : 'border-gray-200 shadow-lg'}`}>
            {plan.isPopular && <div className="absolute top-0 -translate-y-1/2 bg-primary text-white px-3 py-1 text-sm font-semibold rounded-full">Most Popular</div>}
            <h3 className="text-2xl font-bold text-dark">{plan.name}</h3>
            <p className="mt-4 text-gray-500 flex-grow">{plan.description}</p>
            <div className="mt-6">
            {plan.price === 'Custom' ? (
                <p className="text-4xl font-extrabold text-dark">Custom</p>
            ) : (
                <p className="text-5xl font-extrabold text-dark">
                ${plan.price}
                <span className="text-xl font-medium text-gray-500">/mo</span>
                </p>
            )}
            </div>
            <ul className="mt-8 space-y-4">
            {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                <CheckCircleIcon className="h-6 w-6 text-secondary mr-3 flex-shrink-0" />
                <span className="text-gray-600">{feature}</span>
                </li>
            ))}
            </ul>
            <div className="mt-auto pt-8">
            <Link to={ctaLink} className={`block w-full text-center rounded-lg px-6 py-3 text-lg font-medium transition-colors duration-300 ${plan.isPopular ? 'bg-primary text-white hover:bg-primary-hover' : 'bg-gray-100 text-primary hover:bg-gray-200'}`}>
                {plan.ctaText}
            </Link>
            </div>
        </div>
    );
};


const PricingPage: React.FC = () => {
  return (
    <>
      <PageHeader 
        title="Find the perfect plan for your business"
        subtitle="Start for free, and scale as you grow. All plans include a 14-day free trial of our Pro features."
        imageUrl="https://picsum.photos/seed/pricing/1920/1080"
      />
      <div className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-4">
              {plans.map(plan => <PricingCard key={plan.name} plan={plan} />)}
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingPage;