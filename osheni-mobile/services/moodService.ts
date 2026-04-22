import type { MoodLevel } from '@/types/journal';

export type MoodCheckIn = {
  level: MoodLevel;
  tags: string[];
  note?: string;
  createdAt: string;
};

const mockMoodCheckIn: MoodCheckIn = {
  level: 'good',
  tags: ['Calm', 'Grateful'],
  note: 'Feeling more centered than earlier today.',
  createdAt: '2026-04-22T18:00:00Z'
};

export async function getLatestMoodCheckIn(): Promise<MoodCheckIn> {
  return mockMoodCheckIn;
}

export async function saveMoodCheckIn(checkIn: MoodCheckIn): Promise<MoodCheckIn> {
  return checkIn;
}
