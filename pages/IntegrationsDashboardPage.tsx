

import React from 'react';
import { PuzzleIcon } from '../components/icons.tsx';

const IntegrationsDashboardPage: React.FC = () => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow h-full flex items-center justify-center text-center p-8">
            <div>
                 <div className="mx-auto h-16 w-16 text-gray-300 dark:text-gray-600">
                    <PuzzleIcon strokeWidth={1}/>
                </div>
                <h1 className="mt-4 text-2xl font-bold text-dark dark:text-white mb-4">Integrations</h1>
                <p className="text-gray-600 dark:text-gray-400">Connect TreshTalk with your favorite apps to streamline your workflow. This feature is coming soon!</p>
            </div>
        </div>
    );
};

export default IntegrationsDashboardPage;