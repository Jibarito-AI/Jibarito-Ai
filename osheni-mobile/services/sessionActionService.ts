import { resolveSessionJoin } from '@/services/sessionService';

export async function runSessionJoinAction(sessionId: string) {
  const joinPayload = await resolveSessionJoin(sessionId);

  if (!joinPayload) {
    return {
      ok: false,
      message: 'No join payload available for this session.'
    };
  }

  const deepLink = joinPayload.deepLinkUrl ? ` Deep link: ${joinPayload.deepLinkUrl}` : '';
  const webLink = joinPayload.joinUrl ? ` Web: ${joinPayload.joinUrl}` : '';

  return {
    ok: true,
    message: `Resolved ${joinPayload.provider.toUpperCase()} session.${deepLink}${webLink}`,
    joinPayload
  };
}

export async function runSessionReminderAction(sessionId: string) {
  return {
    ok: true,
    sessionId,
    message: 'Reminder placeholder saved for this session.'
  };
}
