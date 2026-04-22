import { getSupabaseClient } from '@/lib/supabase';
import { getCurrentUser } from '@/services/userService';
import type { UserProfile } from '@/types/user';

export async function fetchCurrentUser(): Promise<UserProfile> {
  const { configured, client } = getSupabaseClient();

  if (!configured || !client) {
    return getCurrentUser();
  }

  try {
    const {
      data: { user }
    } = await client.auth.getUser();

    if (!user) {
      return getCurrentUser();
    }

    const { data, error } = await client
      .from('users')
      .select('id, email, first_name, language, created_at, subscription_status, trial_end_date, streak_count')
      .eq('id', user.id)
      .single();

    if (error || !data) {
      return getCurrentUser();
    }

    return {
      id: data.id,
      firstName: data.first_name,
      email: data.email,
      language: data.language,
      createdAt: data.created_at,
      subscriptionStatus: data.subscription_status,
      trialEndDate: data.trial_end_date,
      streakCount: data.streak_count
    };
  } catch {
    return getCurrentUser();
  }
}
