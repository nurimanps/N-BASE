
/**
 * Note: While we have the project URL and public key, 
 * standard Supabase monitoring metrics (CPU/RAM) are not exposed 
 * via the public anon client for security reasons.
 * 
 * This client is provided to fetch actual data from tables 
 * (like 'logs' or 'activity') if the user sets them up.
 */

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://xhrqpqkfwabzhewokaqj.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_4t-sxQs96q-EczQ65rVdBg_1AtjdfUG';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper to fetch recent activity if a table exists
export const getRecentActivity = async () => {
  try {
    const { data, error } = await supabase
      .from('activity')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);
    
    if (error) throw error;
    return data;
  } catch (err) {
    console.warn('Could not fetch activity from Supabase. Ensure table "activity" exists.', err);
    return null;
  }
};
