import { buildZoomJoinPayload } from '@/integrations/zoom/zoomClient';
import type { LiveSession, LiveSessionStatus } from '@/types/session';

function toIsoToday(hour24: number, minute: number) {
  const date = new Date();
  date.setHours(hour24, minute, 0, 0);
  return date.toISOString();
}

function addMinutes(iso: string, minutes: number) {
  const date = new Date(iso);
  date.setMinutes(date.getMinutes() + minutes);
  return date.toISOString();
}

function formatTimeLabel(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

function formatDateLabel(iso: string) {
  return new Date(iso).toLocaleDateString([], { month: 'short', day: 'numeric' });
}

function deriveStatus(startsAt: string, endsAt?: string): LiveSessionStatus {
  const now = new Date();
  const start = new Date(startsAt);
  const end = endsAt ? new Date(endsAt) : new Date(start.getTime() + 60 * 60 * 1000);

  if (now >= start && now <= end) return 'live';
  if (now > end) return 'completed';
  return 'upcoming';
}

const rawSessions = [
  {
    id: 'session_1',
    title: 'Morning Practice',
    startsAt: toIsoToday(6, 0),
    attendees: 124,
    provider: 'zoom' as const,
    instructorName: 'Osheni Guide',
    link: {
      provider: 'zoom' as const,
      joinUrl: 'https://zoom.us/j/1111111111',
      meetingId: '1111111111',
      passcode: 'osheni'
    }
  },
  {
    id: 'session_2',
    title: 'Midday Reset',
    startsAt: toIsoToday(11, 0),
    attendees: 97,
    provider: 'zoom' as const,
    instructorName: 'Osheni Guide',
    link: {
      provider: 'zoom' as const,
      joinUrl: 'https://zoom.us/j/2222222222',
      meetingId: '2222222222',
      passcode: 'osheni'
    }
  },
  {
    id: 'session_3',
    title: 'Afternoon Recharge',
    startsAt: toIsoToday(16, 0),
    attendees: 156,
    provider: 'zoom' as const,
    instructorName: 'Osheni Guide',
    link: {
      provider: 'zoom' as const,
      joinUrl: 'https://zoom.us/j/3333333333',
      meetingId: '3333333333',
      passcode: 'osheni'
    }
  },
  {
    id: 'session_4',
    title: 'Evening Wind-Down',
    startsAt: toIsoToday(21, 0),
    attendees: 203,
    provider: 'zoom' as const,
    instructorName: 'Osheni Guide',
    link: {
      provider: 'zoom' as const,
      joinUrl: 'https://zoom.us/j/4444444444',
      meetingId: '4444444444',
      passcode: 'osheni'
    }
  }
];

function buildSessionModels(): LiveSession[] {
  return rawSessions.map((session) => {
    const endsAt = addMinutes(session.startsAt, 60);
    return {
      ...session,
      endsAt,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timeLabel: formatTimeLabel(session.startsAt),
      dateLabel: formatDateLabel(session.startsAt),
      status: deriveStatus(session.startsAt, endsAt)
    };
  });
}

export async function listLiveSessions(): Promise<LiveSession[]> {
  return buildSessionModels();
}

export async function getNextLiveSession(): Promise<LiveSession | undefined> {
  const sessions = buildSessionModels();
  return sessions.find((session) => session.status === 'live') ?? sessions.find((session) => session.status === 'upcoming') ?? sessions[0];
}

export async function resolveSessionJoin(sessionId: string) {
  const sessions = buildSessionModels();
  const session = sessions.find((item) => item.id === sessionId);
  if (!session?.link || session.link.provider !== 'zoom' || !session.link.meetingId) {
    return null;
  }

  return buildZoomJoinPayload({
    meetingId: session.link.meetingId,
    passcode: session.link.passcode,
    joinUrl: session.link.joinUrl
  });
}
