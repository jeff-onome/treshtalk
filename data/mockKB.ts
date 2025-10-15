export interface KBArticle {
    id: number;
    title: string;
    category: string;
    status: 'Published' | 'Draft';
    lastUpdated: string;
}

export const mockArticles: KBArticle[] = [
    { id: 1, title: 'How to install the widget', category: 'Getting Started', status: 'Published', lastUpdated: '2024-07-15' },
    { id: 2, title: 'Setting up your first automation', category: 'Automations', status: 'Published', lastUpdated: '2024-07-12' },
    { id: 3, title: 'Integrating with Salesforce', category: 'Integrations', status: 'Draft', lastUpdated: '2024-08-01' },
    { id: 4, title: 'Understanding your reports', category: 'Analytics', status: 'Published', lastUpdated: '2024-06-28' },
];
