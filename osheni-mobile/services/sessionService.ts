import { buildZoomJoinPayload } from '@/integrations/zoom/zoomClient';
import type { LiveSession } from '@/types/session';

const mockSessions: LiveSession[] = [
  {
    id: 'session_1',
    title: 'Morning Practice',
    time: '6:00 AM',
    attendees: 124,
    status: 'upcoming',
    provider: 'zoom',
    instructorName: 'Osheni Guide',
    link: {
      provider: 'zoom',
      joinUrl: 'https://zoom.us/j/1111111111',
      meetingId: '1111111111',
      passcode: 'osheni'
    }
  },
  {
    id: 'session_2',
    title: 'Midday Reset',
    time: '11:00 AM',
    attendees: 97,
    status: 'upcoming',
    provider: 'zoom',
    instructorName: 'Osheni Guide',
    link: {
      provider: 'zoom',
      joinUrl: 'https://zoom.us/j/2222222222',
      meetingId: '2222222222',
      passcode: 'osheni'
    }
  },
  {
    id: 'session_3',
    title: 'Afternoon Recharge',
    time: '4:00 PM',
    attendees: 156,
    status: 'live',
    provider: 'zoom',
    instructorName: 'Osheni Guide',
    link: {
      provider: 'zoom',
      joinUrl: 'https://zoom.us/j/3333333333',
      meetingId: '3333333333',
      passcode: 'osheni'
    }
  },
  {
    id: 'session_4',
    title: 'Evening Wind-Down',
    time: '9:00 PM',
    attendees: 203,
    status: 'upcoming',
    provider: 'zoom',
    instructorName: 'Osheni Guide',
    link: {
      provider: 'zoom',
      joinUrl: 'https://zoom.us/j/4444444444',
      meetingId: '4444444444',
      passcode: 'osheni'
    }
  }
];

export async function listLiveSessions(): Promise<LiveSession[]> {
  return mockSessions;
}

export async function getNextLiveSession(): Promise<LiveSession | undefined> {
  return mockSessions.find((session) => session.status === 'live') ?? mockSessions[0];
}

export async function resolveSessionJoin(sessionId: string) {
  const session = mockSessions.find((item) => item.id === sessionId);
  if (!session?.link || session.link.provider !== 'zoom' || !session.link.meetingId) {
    return null;
  }

  return buildZoomJoinPayload({
    meetingId: session.link.meetingId,
    passcode: session.link.passcode,
    joinUrl: session.link.joinUrl
  });
}
