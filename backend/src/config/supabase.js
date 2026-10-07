const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

let supabase = null;

if (supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http')) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
  console.log('[Database] Connected to remote Supabase PostgreSQL');
} else {
  console.log('[Database] Remote Supabase credentials not set. Running in Local Memory Store mode (Safe for local demo).');
}

module.exports = supabase;
