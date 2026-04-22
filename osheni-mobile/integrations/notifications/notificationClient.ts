import type { QuietHours, ReminderPreference } from '@/integrations/notifications/types';

const mockPreferences: ReminderPreference[] = [
  { key: 'session_reminders', label: 'Session Reminders', enabled: true, channel: 'push', minutesBefore: 15 },
  { key: 'journal_prompt', label: 'Daily Journaling Prompt', enabled: true, channel: 'push' },
  { key: 'streak_reminders', label: 'Streak Reminders', enabled: true, channel: 'push' },
  { key: 'new_content', label: 'New Content', enabled: true, channel: 'push' }
];

const quietHours: QuietHours = {
  start: '22:00',
  end: '07:00'
};

export async function listReminderPreferences(): Promise<ReminderPreference[]> {
  return mockPreferences;
}

export async function getQuietHours(): Promise<QuietHours> {
  return quietHours;
}
