import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://fxibxylnevmeygwbaqfd.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4aWJ4eWxuZXZtZXlnd2JhcWZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3MzAzMjMsImV4cCI6MjA3NjMwNjMyM30.31vPiKTVFt658Qndl8ki_duE2rYawu_gRCYPVoxSxDw";

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase URL and anon key are required.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
