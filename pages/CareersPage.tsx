import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

const JobOpening: React.FC<{ title: string; location: string; department: string }> = ({ title, location, department }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
        <div>
            <p className="text-sm text-primary font-semibold">{department}</p>
            <h3 className="text-xl font-bold text-dark">{title}</h3>
            <p className="text-gray-600 mt-1">{location}</p>
        </div>
        <div>
            <Link to="/contact" className="bg-gray-100 text-primary hover:bg-gray-200 px-4 py-2 rounded-md font-medium transition-colors duration-300">
                Apply Now
            </Link>
        </div>
    </div>
);

const CareersPage: React.FC = () => {
  return (
    <>
      <PageHeader
        title="Join Our Team"
        subtitle="We're looking for passionate people to help us build the future of customer communication."
        imageUrl="https://picsum.photos/seed/careers/1920/1080"
      />
      <div className="bg-light py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-6">
              <JobOpening 
                  title="Senior Frontend Engineer"
                  location="Remote"
                  department="Engineering"
              />
              <JobOpening 
                  title="Product Marketing Manager"
                  location="Remote"
                  department="Marketing"
              />
              <JobOpening 
                  title="Customer Success Advocate"
                  location="Remote, US Timezones"
                  department="Customer Support"
              />
          </div>
        </div>
      </div>
    </>
  );
};

export default CareersPage;