import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  imageUrl: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, imageUrl }) => {
  return (
    <div className="relative bg-gray-800 h-72">
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src={imageUrl}
        alt=""
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gray-900 bg-opacity-60" />
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-200">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default PageHeader;