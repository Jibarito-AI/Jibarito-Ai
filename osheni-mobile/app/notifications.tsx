import { Text, View } from 'react-native';
import { AppScreen } from '@/components/AppScreen';
import { Card } from '@/components/Card';
import { theme } from '@/lib/theme';

const settings = [
  'Session Reminders',
  'Daily Journaling Prompt',
  'Streak Reminders',
  'Community Activity',
  'New Content',
  'Motivational Quotes'
];

export default function NotificationsScreen() {
  return (
    <AppScreen title="Notifications">
      {settings.map((setting) => (
        <Card key={setting}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: theme.colors.text, fontWeight: '600' }}>{setting}</Text>
            <Text style={{ color: theme.colors.primary, fontWeight: '700' }}>ON</Text>
          </View>
        </Card>
      ))}
      <Card>
        <Text style={{ color: theme.colors.text, fontWeight: '700' }}>Quiet Hours</Text>
        <Text style={{ color: theme.colors.text }}>10:00 PM - 7:00 AM</Text>
      </Card>
    </AppScreen>
  );
}
