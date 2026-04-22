import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true
  })
});

export async function scheduleSessionReminderNotification(sessionTitle: string, secondsFromNow: number) {
  const identifier = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Osheni Session Reminder',
      body: `${sessionTitle} starts soon.`,
      data: { sessionTitle }
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: Math.max(1, secondsFromNow)
    }
  });

  return {
    identifier,
    secondsFromNow
  };
}
