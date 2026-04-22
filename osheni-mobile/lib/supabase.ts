import { AppState, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-url-polyfill/auto';
import { createClient, processLock, type SupabaseClient } from '@supabase/supabase-js';
import { hasSupabaseEnv, env } from '@/lib/env';

let supabase: SupabaseClient | null = null;
let autoRefreshRegistered = false;

export function getSupabaseClient(): { configured: boolean; client: SupabaseClient | null; url: string } {
  if (!hasSupabaseEnv()) {
    return {
      configured: false,
      client: null,
      url: env.supabaseUrl
    };
  }

  if (!supabase) {
    supabase = createClient(env.supabaseUrl, env.supabaseAnonKey, {
      auth: {
        ...(Platform.OS !== 'web' ? { storage: AsyncStorage } : {}),
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
        lock: processLock
      }
    });
  }

  if (!autoRefreshRegistered && Platform.OS !== 'web' && supabase) {
    autoRefreshRegistered = true;
    AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        supabase?.auth.startAutoRefresh();
      } else {
        supabase?.auth.stopAutoRefresh();
      }
    });
  }

  return {
    configured: true,
    client: supabase,
    url: env.supabaseUrl
  };
}
