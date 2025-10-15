
import React from 'react';

const DashboardFooter: React.FC = () => {
    return (
        <footer className="bg-white border-t border-gray-200 p-4 text-center text-sm text-gray-500 flex-shrink-0">
            &copy; {new Date().getFullYear()} TreshTalk. All Rights Reserved.
        </footer>
    );
};

export default DashboardFooter;
