import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../supabaseClient.tsx';

interface Profile {
    id: string;
    full_name: string;
    avatar_url: string;
}

interface AuthContextType {
    user: User | null;
    session: Session | null;
    profile: Profile | null;
    workspaceId: string | null;
    loading: boolean;
    refreshProfile: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [workspaceId, setWorkspaceId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchProfileAndWorkspace = async (user: User) => {
        try {
            // Fetch profile
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (profileError) throw profileError;
            setProfile(profileData);

            // Fetch workspace
            const { data: workspaceData, error: workspaceError } = await supabase
                .from('workspaces')
                .select('id')
                .eq('owner_id', user.id)
                .single();
            
            if (workspaceError) {
                // It's possible a user exists but workspace creation failed.
                // Or they are a team member, not an owner.
                // For this app's logic, we assume owner for simplicity.
                console.warn("Could not fetch workspace for user:", workspaceError.message);
            }
            if (workspaceData) {
                setWorkspaceId(workspaceData.id);
            }
            
        } catch (error) {
            console.error('Error fetching user profile or workspace:', error);
        }
    };

    useEffect(() => {
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
            setUser(session?.user ?? null);

            if (session?.user) {
                await fetchProfileAndWorkspace(session.user);
            }
            setLoading(false);
        };

        getSession();

        const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setSession(session);
            const currentUser = session?.user ?? null;
            setUser(currentUser);

            if (currentUser) {
                await fetchProfileAndWorkspace(currentUser);
            } else {
                setProfile(null);
                setWorkspaceId(null);
            }
            setLoading(false);
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    const refreshProfile = () => {
        if (user) {
            fetchProfileAndWorkspace(user);
        }
    };

    const value = {
        user,
        session,
        profile,
        workspaceId,
        loading,
        refreshProfile,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
