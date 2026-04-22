import type { ExternalSessionLink, SessionProvider } from '@/types/integration';

export type LiveSessionStatus = 'upcoming' | 'live' | 'completed';

export type LiveSession = {
  id: string;
  title: string;
  time: string;
  date?: string;
  attendees: number;
  status: LiveSessionStatus;
  provider?: SessionProvider;
  link?: ExternalSessionLink;
  instructorName?: string;
};
