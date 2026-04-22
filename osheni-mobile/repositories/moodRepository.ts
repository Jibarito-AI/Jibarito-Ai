import { getSupabaseClient } from '@/lib/supabase';
import { getLatestMoodCheckIn, saveMoodCheckIn } from '@/services/moodService';
import type { MoodCheckIn } from '@/services/moodService';

export async function fetchLatestMoodCheckIn(): Promise<MoodCheckIn> {
  const { configured, client } = getSupabaseClient();

  if (!configured || !client) {
    return getLatestMoodCheckIn();
  }

  try {
    const {
      data: { user }
    } = await client.auth.getUser();

    if (!user) {
      return getLatestMoodCheckIn();
    }

    const { data, error } = await client
      .from('mood_check_ins')
      .select('mood_level, tags, note, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      return getLatestMoodCheckIn();
    }

    return {
      level: data.mood_level,
      tags: data.tags ?? [],
      note: data.note,
      createdAt: data.created_at
    };
  } catch {
    return getLatestMoodCheckIn();
  }
}

export async function persistMoodCheckIn(checkIn: MoodCheckIn): Promise<MoodCheckIn> {
  const { configured, client } = getSupabaseClient();

  if (!configured || !client) {
    return saveMoodCheckIn(checkIn);
  }

  try {
    const {
      data: { user }
    } = await client.auth.getUser();

    if (!user) {
      return saveMoodCheckIn(checkIn);
    }

    const payload = {
      user_id: user.id,
      mood_level: checkIn.level,
      tags: checkIn.tags,
      note: checkIn.note,
      created_at: checkIn.createdAt
    };

    const { data, error } = await client
      .from('mood_check_ins')
      .insert(payload)
      .select('mood_level, tags, note, created_at')
      .single();

    if (error || !data) {
      return saveMoodCheckIn(checkIn);
    }

    return {
      level: data.mood_level,
      tags: data.tags ?? [],
      note: data.note,
      createdAt: data.created_at
    };
  } catch {
    return saveMoodCheckIn(checkIn);
  }
}
