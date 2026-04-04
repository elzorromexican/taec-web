import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.log("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log("Querying Supabase kb_items...");
  const { data, error } = await supabase.from('kb_items').select('*').limit(5);
  if (error) {
    console.error("SUPABASE ERROR:", error);
  } else {
    console.log(`Successfully fetched ${data.length} records.`);
    if (data.length > 0) {
      console.log("First item:", data[0]);
    }
  }

  // Also test the specific query
  const res2 = await supabase
    .from('kb_items')
    .select('*')
    .eq('producto', 'rise360')
    .contains('audiencia', ['interno']);
    
  console.log(`Strict query returned ${res2.data?.length || 0} records.`);
}

run();
