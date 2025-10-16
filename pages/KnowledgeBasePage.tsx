import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.tsx';
import { supabase } from '../supabaseClient.tsx';

interface Article {
    id: number;
    title: string;
    category: string;
    status: string;
    last_updated_at: string;
}

const KnowledgeBasePage: React.FC = () => {
    const { workspaceId } = useAuth();
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            if (!workspaceId) return;
            setLoading(true);
            const { data, error } = await supabase
                .from('kb_articles')
                .select('*')
                .eq('workspace_id', workspaceId)
                .order('last_updated_at', { ascending: false });
            
            if(error) {
                console.error("Error fetching articles:", error);
            } else if (data) {
                setArticles(data);
            }
            setLoading(false);
        };
        fetchArticles();
    }, [workspaceId]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-dark dark:text-white">Knowledge Base</h1>
                <button className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary-hover">
                    New Article
                </button>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                 <div className="p-4 flex justify-between items-center border-b dark:border-gray-700">
                    <input type="text" placeholder="Search articles..." className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white" />
                </div>
                <div className="overflow-x-auto">
                    {loading ? (
                         <p className="p-4 text-center text-gray-500">Loading articles...</p>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Title</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Category</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Status</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Last Updated</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {articles.length === 0 && (
                                     <tr><td colSpan={4} className="text-center p-4 text-gray-500">No articles found.</td></tr>
                                )}
                                {articles.map((article) => (
                                    <tr key={article.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{article.title}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{article.category}</td>
                                        <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{article.status}</span></td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{new Date(article.last_updated_at).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default KnowledgeBasePage;