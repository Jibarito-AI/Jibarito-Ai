import { Text, View } from 'react-native';
import { AppScreen } from '@/components/AppScreen';
import { Badge } from '@/components/Badge';
import { Card } from '@/components/Card';
import { liveSessions } from '@/lib/content';
import { theme } from '@/lib/theme';

export default function SessionsScreen() {
  return (
    <AppScreen title="Live Sessions">
      {liveSessions.map((session) => (
        <Card key={`${session.time}-${session.title}`}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
            <View style={{ flex: 1, gap: 4 }}>
              <Text style={{ color: theme.colors.muted }}>{session.time}</Text>
              <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 18 }}>{session.title}</Text>
              <Text style={{ color: theme.colors.muted }}>{session.attendees} attending</Text>
            </View>
            <Badge label={session.status} />
          </View>
          <View style={{ backgroundColor: theme.colors.primary, borderRadius: theme.radius.md, paddingVertical: 12, paddingHorizontal: 14 }}>
            <Text style={{ color: theme.colors.white, textAlign: 'center', fontWeight: '700' }}>{session.status === 'Live Now' ? 'Join Now' : 'Set Reminder'}</Text>
          </View>
        </Card>
      ))}
    </AppScreen>
  );
}
