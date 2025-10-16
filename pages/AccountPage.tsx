import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext.tsx';
import { supabase } from '../supabaseClient.tsx';

const AccountPage: React.FC = () => {
    const { user, profile, refreshProfile } = useAuth();
    const [fullName, setFullName] = useState('');
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (profile) {
            setFullName(profile.full_name || '');
            setAvatarUrl(profile.avatar_url || null);
        }
    }, [profile]);

    const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !user) return;

        setUploading(true);
        const filePath = `avatars/${user.id}/${Date.now()}`;
        
        try {
            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(filePath, file, { upsert: true });

            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('images').getPublicUrl(filePath);
            const newAvatarUrl = data.publicUrl;
            
            setAvatarUrl(newAvatarUrl);

            const { error: updateError } = await supabase
                .from('profiles')
                .update({ avatar_url: newAvatarUrl })
                .eq('id', user.id);
            
            if (updateError) throw updateError;
            
            if(refreshProfile) refreshProfile();

        } catch (error) {
            console.error("Error uploading avatar:", error);
        } finally {
            setUploading(false);
        }
    };

    const handleSaveChanges = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        
        try {
             const { error } = await supabase
                .from('profiles')
                .update({ full_name: fullName })
                .eq('id', user.id);
            if (error) throw error;
            if(refreshProfile) refreshProfile();
        } catch (error) {
             console.error("Error updating profile:", error);
        }
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-dark dark:text-white mb-6">Account Settings</h1>
            
            <div className="flex items-center space-x-4 mb-8">
                <img 
                    src={avatarUrl || `https://ui-avatars.com/api/?name=${fullName || user?.email}&background=random`} 
                    alt="Profile" 
                    className="h-20 w-20 rounded-full object-cover bg-gray-200"
                />
                <div>
                    <button 
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="bg-gray-200 dark:bg-gray-700 text-dark dark:text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
                    >
                        {uploading ? 'Uploading...' : 'Change Picture'}
                    </button>
                    <input 
                        type="file" 
                        ref={fileInputRef}
                        className="hidden" 
                        accept="image/*"
                        onChange={handleAvatarUpload}
                    />
                </div>
            </div>

            <form className="space-y-6" onSubmit={handleSaveChanges}>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-white dark:bg-gray-700 dark:text-white" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                    <input type="email" name="email" id="email" value={user?.email || ''} disabled className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400" />
                </div>
                <div>
                    <button type="submit" className="w-full sm:w-auto flex justify-center py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AccountPage;