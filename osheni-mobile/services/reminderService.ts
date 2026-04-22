import { fetchSessionReminder, saveSessionReminder } from '@/integrations/notifications/reminderStore';

export async function getSessionReminderState(sessionId: string) {
  const record = await fetchSessionReminder(sessionId);
  return {
    sessionId,
    enabled: Boolean(record?.enabled),
    record
  };
}

export async function setSessionReminder(sessionId: string) {
  const record = await saveSessionReminder(sessionId);
  return {
    ok: true,
    sessionId,
    message: 'Reminder saved for this session.',
    record
  };
}
