import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://srnecvdwqnmotdiezmde.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNybmVjdmR3cW5tb3RkaWV6bWRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3MjkzMTYsImV4cCI6MjA3NjMwNTMxNn0.XP-NrqdglGM2v7H2gIs5fmt_9Gktn-EG-wWxnLhHFTQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);