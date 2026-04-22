export type NotificationChannel = 'push' | 'email' | 'in_app';

export type ReminderPreference = {
  key: string;
  label: string;
  enabled: boolean;
  channel: NotificationChannel;
  minutesBefore?: number;
};

export type QuietHours = {
  start: string;
  end: string;
};
