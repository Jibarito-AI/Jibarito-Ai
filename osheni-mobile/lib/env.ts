export const env = {
  supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL ?? '',
  supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '',
  revenueCatApiKey: process.env.EXPO_PUBLIC_REVENUECAT_API_KEY ?? '',
  appEnv: process.env.EXPO_PUBLIC_APP_ENV ?? 'development'
};

export function hasSupabaseEnv() {
  return Boolean(env.supabaseUrl && env.supabaseAnonKey);
}
