import { Text } from 'react-native';
import { AppScreen } from '@/components/AppScreen';
import { Card } from '@/components/Card';
import { profileItems } from '@/lib/content';
import { theme } from '@/lib/theme';

export default function ProfileScreen() {
  return (
    <AppScreen title="Profile & Settings">
      <Card>
        <Text style={{ color: theme.colors.muted }}>Member since April 2026</Text>
        <Text style={{ color: theme.colors.text, fontSize: 20, fontWeight: '700' }}>Christopher</Text>
        <Text style={{ color: theme.colors.text }}>Current plan: Free Trial</Text>
      </Card>

      {profileItems.map((item) => (
        <Card key={item}>
          <Text style={{ color: theme.colors.text, fontWeight: '600' }}>{item}</Text>
        </Card>
      ))}
    </AppScreen>
  );
}
