import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { AppScreen } from '@/components/AppScreen';
import { Card } from '@/components/Card';
import { getNotificationSettings } from '@/services/notificationService';
import { theme } from '@/lib/theme';

type Settings = Awaited<ReturnType<typeof getNotificationSettings>>;

export default function NotificationsScreen() {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    getNotificationSettings().then(setSettings);
  }, []);

  if (!settings) {
    return (
      <AppScreen title="Notifications">
        <Card><Text style={{ color: theme.colors.text }}>Loading...</Text></Card>
      </AppScreen>
    );
  }

  return (
    <AppScreen title="Notifications">
      {settings.preferences.map((setting) => (
        <Card key={setting.key}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: theme.colors.text, fontWeight: '600' }}>{setting.label}</Text>
            <Text style={{ color: theme.colors.primary, fontWeight: '700' }}>{setting.enabled ? 'ON' : 'OFF'}</Text>
          </View>
        </Card>
      ))}
      <Card>
        <Text style={{ color: theme.colors.text, fontWeight: '700' }}>Quiet Hours</Text>
        <Text style={{ color: theme.colors.text }}>{settings.quietHours.start} - {settings.quietHours.end}</Text>
      </Card>
    </AppScreen>
  );
}
