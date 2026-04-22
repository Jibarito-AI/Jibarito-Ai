import { fetchLiveSessions, fetchNextLiveSession } from '@/repositories/sessionRepository';
import type { LiveSession } from '@/types/session';

export async function getRepositoryBackedLiveSessions(): Promise<LiveSession[]> {
  return fetchLiveSessions();
}

export async function getRepositoryBackedNextLiveSession(): Promise<LiveSession | undefined> {
  return fetchNextLiveSession();
}
