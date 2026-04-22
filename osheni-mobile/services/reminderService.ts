import { scheduleSessionReminderNotification } from '@/integrations/notifications/expoNotificationClient';
import { fetchSessionReminder, saveSessionReminder } from '@/integrations/notifications/reminderStore';
import { getReminderLeadSeconds, getSecondsUntilTodayTime } from '@/lib/time';

export async function getSessionReminderState(sessionId: string) {
  const record = await fetchSessionReminder(sessionId);
  return {
    sessionId,
    enabled: Boolean(record?.enabled),
    record
  };
}

export async function setSessionReminder(sessionId: string, sessionTitle = 'Osheni Session', sessionTime?: string) {
  const record = await saveSessionReminder(sessionId);

  try {
    const secondsUntilSession = sessionTime ? getSecondsUntilTodayTime(sessionTime) : 60;
    const secondsFromNow = getReminderLeadSeconds(secondsUntilSession, 15);

    const scheduled = await scheduleSessionReminderNotification(sessionTitle, secondsFromNow, sessionTime);
    return {
      ok: true,
      sessionId,
      message: `Reminder saved and scheduled ${Math.max(1, Math.floor(secondsFromNow / 60))} minutes before the session.`,
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
