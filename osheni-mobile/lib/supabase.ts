import { hasSupabaseEnv, env } from '@/lib/env';

export type SupabaseClientPlaceholder = {
  configured: boolean;
  url: string;
};

export function getSupabaseClient(): SupabaseClientPlaceholder {
  return {
    configured: hasSupabaseEnv(),
    url: env.supabaseUrl
  };
}
