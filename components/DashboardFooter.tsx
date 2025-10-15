

import React from 'react';

const DashboardFooter: React.FC = () => {
    return (
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 text-center text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">
            &copy; {new Date().getFullYear()} TreshTalk. All Rights Reserved.
        </footer>
    );
};

export default DashboardFooter;