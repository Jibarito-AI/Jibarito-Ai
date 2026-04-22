import { getSupabaseClient } from '@/lib/supabase';
import { getCurrentUser } from '@/services/userService';
import type { UserProfile } from '@/types/user';

export async function fetchCurrentUser(): Promise<UserProfile> {
  const client = getSupabaseClient();

  if (!client.configured) {
    return getCurrentUser();
  }

  // Future Supabase query goes here.
  return getCurrentUser();
}
