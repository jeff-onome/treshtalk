import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient.tsx';

const SuperAdminFinancialsPage: React.FC = () => {
    const [invoices, setInvoices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

     useEffect(() => {
        const fetchFinancials = async () => {
            setLoading(true);
            const { data, error } = await supabase.from('invoices').select(`
                *,
                workspaces ( company_name )
            `);
            if (error) console.error(error);
            else if (data) setInvoices(data);
            setLoading(false);
        };
        fetchFinancials();
    }, []);

    return (
         <div className="space-y-6">
            <h1 className="text-3xl font-bold text-dark dark:text-white">Financials</h1>
             <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                 <div className="p-4 border-b dark:border-gray-700">
                     <h2 className="text-xl font-bold">Recent Invoices</h2>
                 </div>
                <div className="overflow-x-auto">
                    {loading ? (
                         <p className="p-4 text-center text-gray-500">Loading invoices...</p>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Workspace</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Amount</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Date</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                 {invoices.length === 0 && (
                                     <tr><td colSpan={4} className="text-center p-4 text-gray-500">No invoices found.</td></tr>
                                 )}
                                {invoices.map(invoice => (
                                    <tr key={invoice.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{invoice.workspaces.company_name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">${(invoice.amount / 100).toFixed(2)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${invoice.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{invoice.status}</span></td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(invoice.created_at).toLocaleDateString()}</td>
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

export default SuperAdminFinancialsPage;