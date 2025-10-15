import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ogwnypotazzzednvqids.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9nd255cG90YXp6emVkbnZxaWRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0MjIxMjgsImV4cCI6MjA3NTk5ODEyOH0.SrbOhHVVrYT6vQLvBzZhIB0pI81whzq81m6aUm96fO0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
