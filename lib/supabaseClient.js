import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Pequena proteção para caso esqueça as variáveis
if (!supabaseUrl || !supabaseAnonKey) {
  // Isto só aparece no log do navegador / console, não quebra o app.
  console.warn('⚠️ NEXT_PUBLIC_SUPABASE_URL ou NEXT_PUBLIC_SUPABASE_ANON_KEY não configurados.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
