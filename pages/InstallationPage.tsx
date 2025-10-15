import React, { useState, useEffect } from 'react';
import { ClipboardIcon, CheckIcon } from '../components/icons.tsx';
import { supabase } from '../supabaseClient.tsx';
import { useAuth } from '../contexts/AuthContext.tsx';

const InstallationPage: React.FC = () => {
    const { user } = useAuth();
    const [widgetId, setWidgetId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        const fetchWorkspace = async () => {
            if (!user) return;
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('workspaces')
                    .select('widget_id')
                    .eq('owner_id', user.id)
                    .single();
                
                if (error) throw error;
                if (data) {
                    setWidgetId(data.widget_id);
                }
            } catch (error) {
                console.error("Error fetching workspace:", error);
                setWidgetId('error-loading-id');
            } finally {
                setLoading(false);
            }
        };

        fetchWorkspace();
    }, [user]);
    
    const codeSnippet = `<script src="//code.treshtalk.com/widget/${widgetId || 'loading...'}" async></script>`;

    const handleCopy = () => {
        if (widgetId) {
            navigator.clipboard.writeText(codeSnippet).then(() => {
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
            });
        }
    };

    if (loading) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 max-w-4xl mx-auto text-center">
                <p className="text-gray-600 dark:text-gray-300">Loading your unique installation script...</p>
            </div>
        )
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-dark dark:text-white mb-4">Widget Installation</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">To add the TreshTalk widget to your website, copy and paste the following code snippet just before the closing <code className="bg-gray-200 dark:bg-gray-700 text-red-600 dark:text-red-400 px-1 rounded">&lt;/body&gt;</code> tag of your HTML file.</p>
            
            <div className="bg-gray-900 rounded-lg p-4 relative group">
                <pre>
                    <code className="text-white text-sm">
                        {codeSnippet}
                    </code>
                </pre>
                <button 
                    onClick={handleCopy}
                    disabled={!widgetId}
                    className="absolute top-3 right-3 bg-gray-700 text-gray-300 hover:bg-gray-600 p-2 rounded-md transition-all duration-200 opacity-0 group-hover:opacity-100 disabled:opacity-50"
                >
                    {isCopied ? (
                        <>
                            <CheckIcon className="h-5 w-5 text-secondary" />
                            <span className="absolute -top-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded">Copied!</span>
                        </>
                    ) : (
                        <ClipboardIcon className="h-5 w-5" />
                    )}
                </button>
            </div>

            <p className="mt-6 text-gray-500 dark:text-gray-400 text-sm">
                This script is unique to your workspace. Once installed, the widget will appear on your site based on your settings.
            </p>
        </div>
    );
};

export default InstallationPage;