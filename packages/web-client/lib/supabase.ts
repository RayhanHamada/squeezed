import { createClient } from "@supabase/supabase-js";

const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonApiKey = process.env
  .NEXT_PUBLIC_SUPABASE_ANON_API_KEY as string;

export const client = createClient(supabaseURL, supabaseAnonApiKey, {
  autoRefreshToken: true,
  persistSession: true,
});
