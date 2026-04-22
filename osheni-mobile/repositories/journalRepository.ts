import { getSupabaseClient } from '@/lib/supabase';
import { listJournalEntries, saveJournalEntry } from '@/services/journalService';
import type { JournalEntry } from '@/types/journal';

export async function fetchJournalEntries(userId: string): Promise<JournalEntry[]> {
  const { configured, client } = getSupabaseClient();

  if (!configured || !client) {
    return listJournalEntries(userId);
  }

  try {
    const { data, error } = await client
      .from('journal_entries')
      .select('id, user_id, created_at, updated_at, prompt, content, mood_level, mood_tags')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error || !data) {
      return listJournalEntries(userId);
    }

    return data.map((entry) => ({
      id: entry.id,
      userId: entry.user_id,
      createdAt: entry.created_at,
      updatedAt: entry.updated_at,
      prompt: entry.prompt,
      content: entry.content,
      moodLevel: entry.mood_level,
      moodTags: entry.mood_tags ?? []
    }));
  } catch {
    return listJournalEntries(userId);
  }
}

export async function persistJournalEntry(entry: JournalEntry): Promise<JournalEntry> {
  const { configured, client } = getSupabaseClient();

  if (!configured || !client) {
    return saveJournalEntry(entry);
  }

  try {
    const payload = {
      id: entry.id,
      user_id: entry.userId,
      created_at: entry.createdAt,
      updated_at: entry.updatedAt,
      prompt: entry.prompt,
      content: entry.content,
      mood_level: entry.moodLevel,
      mood_tags: entry.moodTags ?? []
    };

    const { data, error } = await client
      .from('journal_entries')
      .upsert(payload)
      .select('id, user_id, created_at, updated_at, prompt, content, mood_level, mood_tags')
      .single();

    if (error || !data) {
      return saveJournalEntry(entry);
    }

    return {
      id: data.id,
      userId: data.user_id,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      prompt: data.prompt,
      content: data.content,
      moodLevel: data.mood_level,
      moodTags: data.mood_tags ?? []
    };
  } catch {
    return saveJournalEntry(entry);
  }
}
