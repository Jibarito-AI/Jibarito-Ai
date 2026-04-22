import { getSupabaseClient } from '@/lib/supabase';
import { getLatestMoodCheckIn, saveMoodCheckIn } from '@/services/moodService';
import type { MoodCheckIn } from '@/services/moodService';

export async function fetchLatestMoodCheckIn(): Promise<MoodCheckIn> {
  const client = getSupabaseClient();

  if (!client.configured) {
    return getLatestMoodCheckIn();
  }

  // Future Supabase query goes here.
  return getLatestMoodCheckIn();
}

export async function persistMoodCheckIn(checkIn: MoodCheckIn): Promise<MoodCheckIn> {
  const client = getSupabaseClient();

  if (!client.configured) {
    return saveMoodCheckIn(checkIn);
  }

  // Future Supabase insert/update goes here.
  return saveMoodCheckIn(checkIn);
}
