import { fetchLatestMoodCheckIn, persistMoodCheckIn } from '@/repositories/moodRepository';
import type { MoodCheckIn } from '@/services/moodService';

export async function getRepositoryBackedLatestMoodCheckIn(): Promise<MoodCheckIn> {
  return fetchLatestMoodCheckIn();
}

export async function saveRepositoryBackedMoodCheckIn(checkIn: MoodCheckIn): Promise<MoodCheckIn> {
  return persistMoodCheckIn(checkIn);
}
