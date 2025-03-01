import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://folsidtvstjwrzwbzjqp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvbHNpZHR2c3Rqd3J6d2J6anFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUwNTUzMTcsImV4cCI6MjA1MDYzMTMxN30.Z3TlldaC-1mZEANSZf2PVgqdEYlbcxhxdQh0TeUKad4";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);