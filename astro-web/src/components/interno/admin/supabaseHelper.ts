import { createClient } from '@supabase/supabase-js';

let supabaseClient: any = null;

export const getSupabaseClient = (url: string, key: string, token: string) => {
  if (!supabaseClient) {
    supabaseClient = createClient(url, key, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    });
  }
  return supabaseClient;
};
