import type { LiveSession } from '@/types/session';

const mockSessions: LiveSession[] = [
  { id: 'session_1', title: 'Morning Practice', time: '6:00 AM', attendees: 124, status: 'upcoming' },
  { id: 'session_2', title: 'Midday Reset', time: '11:00 AM', attendees: 97, status: 'upcoming' },
  { id: 'session_3', title: 'Afternoon Recharge', time: '4:00 PM', attendees: 156, status: 'live' },
  { id: 'session_4', title: 'Evening Wind-Down', time: '9:00 PM', attendees: 203, status: 'upcoming' }
];

export async function listLiveSessions(): Promise<LiveSession[]> {
  return mockSessions;
}

export async function getNextLiveSession(): Promise<LiveSession | undefined> {
  return mockSessions.find((session) => session.status === 'live') ?? mockSessions[0];
}
