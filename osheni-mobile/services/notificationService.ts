import { getQuietHours, listReminderPreferences } from '@/integrations/notifications/notificationClient';

export async function getNotificationSettings() {
  const [preferences, quietHours] = await Promise.all([
    listReminderPreferences(),
    getQuietHours()
  ]);

  return {
    preferences,
    quietHours
  };
}
