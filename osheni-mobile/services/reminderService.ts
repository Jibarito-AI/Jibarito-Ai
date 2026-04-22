import { scheduleSessionReminderNotification } from '@/integrations/notifications/expoNotificationClient';
import { fetchSessionReminder, saveSessionReminder } from '@/integrations/notifications/reminderStore';

export async function getSessionReminderState(sessionId: string) {
  const record = await fetchSessionReminder(sessionId);
  return {
    sessionId,
    enabled: Boolean(record?.enabled),
    record
  };
}

export async function setSessionReminder(sessionId: string, sessionTitle = 'Osheni Session') {
  const record = await saveSessionReminder(sessionId);

  try {
    const scheduled = await scheduleSessionReminderNotification(sessionTitle, 60);
    return {
      ok: true,
      sessionId,
      message: 'Reminder saved and local notification scheduled.',
      record,
      scheduled
    };
  } catch {
    return {
      ok: true,
      sessionId,
      message: 'Reminder saved, but local notification scheduling was unavailable.',
      record
    };
  }
}
