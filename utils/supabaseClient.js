import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; // Coloque sua URL do Supabase
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Coloque sua chave anônima

export const supabase = createClient(supabaseUrl, supabaseAnonKey);