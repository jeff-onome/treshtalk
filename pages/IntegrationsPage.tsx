import React, { useEffect } from 'react';
import PageHeader from '../components/PageHeader.tsx';

const IntegrationCard: React.FC<{ name: string; logoUrl: string }> = ({ name, logoUrl }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center aspect-square">
        <img src={logoUrl} alt={`${name} logo`} className="h-16 w-auto" />
        <p className="mt-4 font-semibold text-dark">{name}</p>
    </div>
);

const IntegrationsPage: React.FC = () => {
  useEffect(() => {
    const originalTitle = document.title;
    const originalDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');

    document.title = 'Integrations - TreshTalk | Connect Your Tools';
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Connect TreshTalk with your favorite tools like Salesforce, HubSpot, Zendesk, and Slack to supercharge your workflow.');

    let metaKeywords = document.createElement('meta');
    metaKeywords.setAttribute('name', 'keywords');
    metaKeywords.setAttribute('content', 'chatbot integrations, Salesforce integration, HubSpot, Zendesk, Slack, CRM integration');
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
        title="Connect TreshTalk with Your Favorite Tools"
        subtitle="Supercharge your workflow by integrating TreshTalk with the services you already use."
        imageUrl="https://picsum.photos/seed/integrations/1920/1080"
      />
      <div className="bg-light py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <IntegrationCard name="Salesforce" logoUrl="https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg" />
              <IntegrationCard name="HubSpot" logoUrl="https://upload.wikimedia.org/wikipedia/commons/9/91/HubSpot_Logo.svg" />
              <IntegrationCard name="Zendesk" logoUrl="https://upload.wikimedia.org/wikipedia/commons/a/a8/Zendesk_logo.svg" />
              <IntegrationCard name="Slack" logoUrl="https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg" />
              <IntegrationCard name="Shopify" logoUrl="https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg" />
              <IntegrationCard name="Zapier" logoUrl="https://upload.wikimedia.org/wikipedia/commons/f/fd/Zapier_logo.svg" />
              <IntegrationCard name="Intercom" logoUrl="https://upload.wikimedia.org/wikipedia/commons/c/c3/Intercom_logo.svg" />
              <IntegrationCard name="Mailchimp" logoUrl="https://upload.wikimedia.org/wikipedia/commons/7/72/Mailchimp_Logo.svg" />
          </div>
        </div>
      </div>
    </>
  );
};

export default IntegrationsPage;