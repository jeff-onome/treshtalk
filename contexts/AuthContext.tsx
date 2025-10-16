import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../supabaseClient.tsx';

interface Profile {
  id: string;
  full_name: string;
  avatar_url: string;
  role: string;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  workspaceId: string | null;
  loading: boolean;
  refreshProfile: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async (currentUser: User | null) => {
    if (currentUser) {
      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', currentUser.id)
        .single();
      
      if (profileError) console.error("Error fetching profile:", profileError);
      else setProfile(profileData);

      // Fetch workspace
      const { data: workspaceData, error: workspaceError } = await supabase
        .from('workspaces')
        .select('id')
        .eq('owner_id', currentUser.id)
        .single();

      if (workspaceError) console.error("Error fetching workspace:", workspaceError);
      else setWorkspaceId(workspaceData?.id || null);

    } else {
      setProfile(null);
      setWorkspaceId(null);
    }
  };

  useEffect(() => {
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      await fetchUserData(session?.user ?? null);
      setLoading(false);
    };

    getInitialSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      await fetchUserData(currentUser);
       if (_event !== 'INITIAL_SESSION') {
        setLoading(false);
       }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  
  const refreshProfile = async () => {
    if (user) {
      await fetchUserData(user);
    }
  }


  const value = {
    session,
    user,
    profile,
    workspaceId,
    loading,
    refreshProfile
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
