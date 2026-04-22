import type { JournalEntry } from '@/types/journal';

const mockEntries: JournalEntry[] = [
  {
    id: 'entry_1',
    userId: 'user_1',
    createdAt: '2026-04-20T10:00:00Z',
    prompt: 'What do I need to release today?',
    content: 'I need to let go of trying to control every outcome.',
    moodLevel: 'good',
    moodTags: ['Calm', 'Grateful']
  }
];

export async function listJournalEntries(userId: string): Promise<JournalEntry[]> {
  return mockEntries.filter((entry) => entry.userId === userId);
}

export async function saveJournalEntry(entry: JournalEntry): Promise<JournalEntry> {
  return entry;
}
