import { tryOpenLink } from '@/services/linkingService';
import { setSessionReminder } from '@/services/reminderService';
import { resolveSessionJoin, listLiveSessions } from '@/services/sessionService';

export async function runSessionJoinAction(sessionId: string) {
  const joinPayload = await resolveSessionJoin(sessionId);

  if (!joinPayload) {
    return {
      ok: false,
      message: 'No join payload available for this session.'
    };
  }

  const deepLinkAttempt = await tryOpenLink(joinPayload.deepLinkUrl ?? null);

  if (deepLinkAttempt.ok) {
    return {
      ok: true,
      message: `Opened ${joinPayload.provider.toUpperCase()} deep link successfully.`,
      joinPayload,
      openResult: deepLinkAttempt
    };
  }

  const webAttempt = await tryOpenLink(joinPayload.joinUrl ?? null);

  const message = webAttempt.ok
    ? `Deep link unavailable. Opened ${joinPayload.provider.toUpperCase()} web URL instead.`
    : `Resolved ${joinPayload.provider.toUpperCase()} session but could not open automatically.`;

  return {
    ok: webAttempt.ok,
    message,
    joinPayload,
    openResult: webAttempt,
    fallbackResult: deepLinkAttempt
  };
}

export async function runSessionReminderAction(sessionId: string) {
  const sessions = await listLiveSessions();
  const session = sessions.find((item) => item.id === sessionId);
  return setSessionReminder(sessionId, session?.title ?? 'Osheni Session', session?.time);
}
