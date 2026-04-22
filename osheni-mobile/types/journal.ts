export type MoodLevel = 'great' | 'good' | 'okay' | 'not_great' | 'struggling';

export type JournalEntry = {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt?: string;
  prompt?: string;
  content: string;
  moodLevel?: MoodLevel;
  moodTags?: string[];
};
