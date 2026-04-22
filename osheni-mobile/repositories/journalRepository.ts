import { getSupabaseClient } from '@/lib/supabase';
import { listJournalEntries, saveJournalEntry } from '@/services/journalService';
import type { JournalEntry } from '@/types/journal';

export async function fetchJournalEntries(userId: string): Promise<JournalEntry[]> {
  const client = getSupabaseClient();

  if (!client.configured) {
    return listJournalEntries(userId);
  }

  // Future Supabase query goes here.
  return listJournalEntries(userId);
}

export async function persistJournalEntry(entry: JournalEntry): Promise<JournalEntry> {
  const client = getSupabaseClient();

  if (!client.configured) {
    return saveJournalEntry(entry);
  }

  // Future Supabase insert/update goes here.
  return saveJournalEntry(entry);
}
