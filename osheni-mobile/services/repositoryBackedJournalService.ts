import { fetchJournalEntries, persistJournalEntry } from '@/repositories/journalRepository';
import type { JournalEntry } from '@/types/journal';

export async function getRepositoryBackedJournalEntries(userId: string): Promise<JournalEntry[]> {
  return fetchJournalEntries(userId);
}

export async function saveRepositoryBackedJournalEntry(entry: JournalEntry): Promise<JournalEntry> {
  return persistJournalEntry(entry);
}
