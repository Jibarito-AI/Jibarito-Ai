import { Text, View } from 'react-native';
import { AppScreen } from '@/components/AppScreen';
import { Card } from '@/components/Card';
import { getNotificationSettings } from '@/services/notificationService';
import { theme } from '@/lib/theme';

const notificationSettingsPromise = getNotificationSettings();

export default async function NotificationsScreen() {
  const { preferences, quietHours } = await notificationSettingsPromise;

  return (
    <AppScreen title="Notifications">
      {preferences.map((setting) => (
        <Card key={setting.key}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: theme.colors.text, fontWeight: '600' }}>{setting.label}</Text>
            <Text style={{ color: theme.colors.primary, fontWeight: '700' }}>{setting.enabled ? 'ON' : 'OFF'}</Text>
          </View>
        </Card>
      ))}
      <Card>
        <Text style={{ color: theme.colors.text, fontWeight: '700' }}>Quiet Hours</Text>
        <Text style={{ color: theme.colors.text }}>{quietHours.start} - {quietHours.end}</Text>
      </Card>
    </AppScreen>
  );
}
