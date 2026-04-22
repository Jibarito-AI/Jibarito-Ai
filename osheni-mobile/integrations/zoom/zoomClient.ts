import type { ZoomMeetingDetails, ZoomJoinResult } from '@/integrations/zoom/types';

export function buildZoomJoinPayload(meeting: ZoomMeetingDetails): ZoomJoinResult {
  const deepLinkUrl = `zoomus://zoom.us/join?confno=${meeting.meetingId}${meeting.passcode ? `&pwd=${meeting.passcode}` : ''}`;

  return {
    provider: 'zoom',
    joinUrl: meeting.joinUrl,
    deepLinkUrl,
    installUrl: 'https://zoom.us/download'
  };
}
