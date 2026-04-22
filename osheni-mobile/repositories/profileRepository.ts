import { getSupabaseClient } from '@/lib/supabase';
import { getCurrentUser } from '@/services/userService';
import type { UserProfile } from '@/types/user';

export async function fetchProfile(): Promise<UserProfile> {
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

export async function persistProfile(profile: UserProfile): Promise<UserProfile> {
  const { configured, client } = getSupabaseClient();

  if (!configured || !client) {
    return profile;
  }

  try {
    const payload = {
      id: profile.id,
      email: profile.email,
      first_name: profile.firstName,
      language: profile.language,
      created_at: profile.createdAt,
      subscription_status: profile.subscriptionStatus,
      trial_end_date: profile.trialEndDate,
      streak_count: profile.streakCount ?? 0
    };

    const { data, error } = await client
      .from('users')
      .upsert(payload)
      .select('id, email, first_name, language, created_at, subscription_status, trial_end_date, streak_count')
      .single();

    if (error || !data) {
      return profile;
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
    return profile;
  }
}
