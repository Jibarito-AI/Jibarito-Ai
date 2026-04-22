import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true
  })
});

export async function scheduleSessionReminderNotification(sessionTitle: string, secondsFromNow: number, sessionTime?: string) {
  const identifier = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Osheni Session Reminder',
      body: sessionTime ? `${sessionTitle} starts at ${sessionTime}.` : `${sessionTitle} starts soon.`,
      data: { sessionTitle, sessionTime }
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: Math.max(1, secondsFromNow)
    }
  });

  return {
    identifier,
    secondsFromNow,
    sessionTime
  };
}
