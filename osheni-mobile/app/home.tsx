import { Text, View } from 'react-native';
import { AppScreen } from '@/components/AppScreen';
import { Card } from '@/components/Card';
import { meditations, quickActions } from '@/lib/content';
import { getNextLiveSession } from '@/services/sessionService';
import { getCurrentUser } from '@/services/userService';
import { theme } from '@/lib/theme';

const userPromise = getCurrentUser();
const nextSessionPromise = getNextLiveSession();

export default async function HomeScreen() {
  const [user, nextSession] = await Promise.all([userPromise, nextSessionPromise]);

  return (
    <AppScreen title="Home Dashboard">
      <Card style={{ borderRadius: theme.radius.lg, padding: theme.spacing.lg }}>
        <Text style={{ color: theme.colors.muted }}>Good morning, {user.firstName}</Text>
        <Text style={{ color: theme.colors.text, fontSize: 24, fontWeight: '700' }}>{user.streakCount ?? 0} day streak 🔥</Text>
        <Text style={{ color: theme.colors.text }}>Peace comes from what you practice daily.</Text>
      </Card>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm }}>
        {quickActions.map((item) => (
          <Card key={item} style={{ width: '47%' }}>
            <Text style={{ color: theme.colors.text, fontWeight: '600' }}>{item}</Text>
          </Card>
        ))}
      </View>

      <Card style={{ borderRadius: theme.radius.lg, padding: theme.spacing.lg }}>
        <Text style={{ color: theme.colors.text, fontSize: 18, fontWeight: '700' }}>Upcoming Live Session</Text>
        <Text style={{ color: theme.colors.muted }}>{nextSession?.title ?? 'No session scheduled'} • {nextSession?.time ?? '--'}</Text>
        {nextSession?.provider ? <Text style={{ color: theme.colors.muted }}>Provider: {nextSession.provider.toUpperCase()}</Text> : null}
      </Card>

      <View style={{ gap: theme.spacing.sm }}>
        <Text style={{ color: theme.colors.text, fontSize: 18, fontWeight: '700' }}>Recommended For You</Text>
        {meditations.map((item) => (
          <Card key={item.title}>
            <Text style={{ color: theme.colors.text, fontWeight: '600' }}>{item.title}</Text>
            <Text style={{ color: theme.colors.muted }}>{item.category} • {item.duration}</Text>
          </Card>
        ))}
      </View>
    </AppScreen>
  );
}
