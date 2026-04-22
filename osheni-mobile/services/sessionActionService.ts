import { resolveSessionJoin } from '@/services/sessionService';

export async function runSessionJoinAction(sessionId: string) {
  const joinPayload = await resolveSessionJoin(sessionId);

  if (!joinPayload) {
    return {
      ok: false,
      message: 'No join payload available for this session.'
    };
  }

  return {
    ok: true,
    message: `Ready to open ${joinPayload.provider.toUpperCase()} session link.`,
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
