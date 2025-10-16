import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.tsx';
import { CheckIcon } from '../components/icons.tsx';
import { supabase } from '../supabaseClient.tsx';

interface Plan {
    id: number;
    name: string;
    price_monthly: number;
    features: string[];
}

const PricingPage: React.FC = () => {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlans = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('plans')
                .select('*')
                .order('price_monthly', { ascending: true });
            
            if (error) {
                console.error("Error fetching plans:", error);
            } else if (data) {
                setPlans(data);
            }
            setLoading(false);
        };
        fetchPlans();
    }, []);

  return (
    <>
      <PageHeader
        title="Simple, transparent pricing"
        subtitle="Choose the plan that's right for your business. No hidden fees."
        imageUrl="https://picsum.photos/seed/pricing/1920/1080"
      />
      <div className="bg-light py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
                <div className="text-center text-gray-500">Loading pricing plans...</div>
            ) : (
                <div className="grid gap-8 lg:grid-cols-3 max-w-5xl mx-auto">
                    {plans.map((plan, index) => (
                         <PricingCard
                            key={plan.id}
                            plan={plan.name}
                            price={plan.price_monthly.toString()}
                            features={plan.features}
                            isPopular={index === 1} // Mark the middle plan as popular
                        />
                    ))}
                </div>
            )}
        </div>
      </div>
    </>
  );
};

interface PricingCardProps {
    plan: string;
    price: string;
    features: string[];
    isPopular: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, price, features, isPopular }) => (
    <div className={`bg-white rounded-lg shadow-lg p-8 flex flex-col ${isPopular ? 'border-2 border-primary' : ''}`}>
        {isPopular && <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full self-center -mt-12 mb-4">MOST POPULAR</span>}
        <h3 className="text-2xl font-bold text-dark text-center">{plan}</h3>
        <div className="my-4 text-center">
            <span className="text-5xl font-extrabold text-dark">${price}</span>
            <span className="text-gray-500">/month</span>
        </div>
        <ul className="space-y-4 my-8 flex-grow">
            {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                    <CheckIcon className="h-6 w-6 text-green-500 flex-shrink-0 mr-2" />
                    <span>{feature}</span>
                </li>
            ))}
        </ul>
        <Link to="/register" className={`w-full text-center block ${isPopular ? 'bg-primary text-white hover:bg-primary-hover' : 'bg-gray-100 text-primary hover:bg-gray-200'} px-6 py-3 rounded-md font-medium transition-colors duration-300`}>
            Get Started
        </Link>
    </div>
);

export default PricingPage;