export type SessionProvider = 'zoom' | 'web' | 'recording' | 'other';

export type ExternalSessionLink = {
  provider: SessionProvider;
  joinUrl: string;
  meetingId?: string;
  passcode?: string;
  fallbackUrl?: string;
};

export type IntegrationHealth = {
  provider: SessionProvider;
  configured: boolean;
  note?: string;
};
