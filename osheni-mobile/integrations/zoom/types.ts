export type ZoomMeetingDetails = {
  meetingId: string;
  passcode?: string;
  joinUrl: string;
  hostUrl?: string;
};

export type ZoomJoinResult = {
  provider: 'zoom';
  joinUrl: string;
  installUrl?: string;
  deepLinkUrl?: string;
};
