import { Text, View } from 'react-native';
import { AppScreen } from '@/components/AppScreen';
import { Badge } from '@/components/Badge';
import { Card } from '@/components/Card';
import { listLiveSessions } from '@/services/sessionService';
import { theme } from '@/lib/theme';

const sessionsPromise = listLiveSessions();

export default async function SessionsScreen() {
  const sessions = await sessionsPromise;

  return (
    <AppScreen title="Live Sessions">
      {sessions.map((session) => (
        <Card key={session.id}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
            <View style={{ flex: 1, gap: 4 }}>
              <Text style={{ color: theme.colors.muted }}>{session.time}</Text>
              <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 18 }}>{session.title}</Text>
              <Text style={{ color: theme.colors.muted }}>{session.attendees} attending • {session.provider?.toUpperCase() ?? 'SESSION'}</Text>
              {session.instructorName ? <Text style={{ color: theme.colors.muted }}>Guide: {session.instructorName}</Text> : null}
            </View>
            <Badge label={session.status} />
          </View>
          <View style={{ backgroundColor: theme.colors.primary, borderRadius: theme.radius.md, paddingVertical: 12, paddingHorizontal: 14 }}>
            <Text style={{ color: theme.colors.white, textAlign: 'center', fontWeight: '700' }}>{session.status === 'live' ? 'Join Now' : 'Set Reminder'}</Text>
          </View>
        </Card>
      ))}
    </AppScreen>
  );
}
