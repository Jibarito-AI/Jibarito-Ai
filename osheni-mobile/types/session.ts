export type LiveSessionStatus = 'upcoming' | 'live' | 'completed';

export type LiveSession = {
  id: string;
  title: string;
  time: string;
  date?: string;
  attendees: number;
  status: LiveSessionStatus;
  zoomUrl?: string;
  passcode?: string;
};
