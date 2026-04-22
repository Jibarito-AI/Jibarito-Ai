import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { AppScreen } from '@/components/AppScreen';
import { Card } from '@/components/Card';
import { meditations, quickActions } from '@/lib/content';
import { getRepositoryBackedNextLiveSession } from '@/services/repositoryBackedSessionService';
import { getCurrentUser } from '@/services/userService';
import type { LiveSession } from '@/types/session';
import type { UserProfile } from '@/types/user';
import { theme } from '@/lib/theme';

const quickActionRoutes: Record<string, string> = {
  'Journal Entry': '/journal',
  'Mood Check-In': '/mood',
  'Quick Meditation': '/audio-player',
  'Breathing Exercise': '/audio-player',
};

export default function HomeScreen() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [nextSession, setNextSession] = useState<LiveSession | null>(null);

  useEffect(() => {
    (async () => {
      const [u, s] = await Promise.all([
        getCurrentUser(),
        getRepositoryBackedNextLiveSession()
      ]);
      setUser(u);
      setNextSession(s);
    })();
  }, []);

  return (
    <AppScreen title="Home Dashboard">
      <Card style={{ borderRadius: theme.radius.lg, padding: theme.spacing.lg }}>
        <Text style={{ color: theme.colors.muted }}>Good morning, {user?.firstName ?? '...'}</Text>
        <Text style={{ color: theme.colors.text, fontSize: 24, fontWeight: '700' }}>{user?.streakCount ?? 0} day streak 🔥</Text>
        <Text style={{ color: theme.colors.text }}>Peace comes from what you practice daily.</Text>
      </Card>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm }}>
        {quickActions.map((item) => (
          <Pressable
            key={item}
            onPress={() => router.push(quickActionRoutes[item] as any)}
            style={({ pressed }) => ({
              width: '47%',
              backgroundColor: pressed ? theme.colors.secondary : theme.colors.white,
              borderRadius: theme.radius.md,
              padding: theme.spacing.md,
              borderWidth: 1,
              borderColor: theme.colors.border,
            })}
          >
            <Text style={{ color: theme.colors.text, fontWeight: '600' }}>{item}</Text>
          </Pressable>
        ))}
      </View>

      <Card style={{ borderRadius: theme.radius.lg, padding: theme.spacing.lg }}>
        <Text style={{ color: theme.colors.text, fontSize: 18, fontWeight: '700' }}>Upcoming Live Session</Text>
        <Text style={{ color: theme.colors.muted }}>{nextSession?.title ?? 'No session scheduled'} • {nextSession?.timeLabel ?? '--'}</Text>
        {nextSession?.provider ? <Text style={{ color: theme.colors.muted }}>Provider: {nextSession.provider.toUpperCase()}</Text> : null}
        {nextSession?.timezone ? <Text style={{ color: theme.colors.muted }}>Timezone: {nextSession.timezone}</Text> : null}
        <Pressable
          onPress={() => router.push('/sessions' as any)}
          style={{ backgroundColor: theme.colors.primary, borderRadius: theme.radius.md, paddingVertical: 10, marginTop: 4 }}
        >
          <Text style={{ color: theme.colors.white, textAlign: 'center', fontWeight: '700' }}>View All Sessions</Text>
        </Pressable>
      </Card>

      <View style={{ gap: theme.spacing.sm }}>
        <Text style={{ color: theme.colors.text, fontSize: 18, fontWeight: '700' }}>Recommended For You</Text>
        {meditations.map((item) => (
          <Pressable
            key={item.title}
            onPress={() => router.push('/audio-player' as any)}
            style={({ pressed }) => ({
              backgroundColor: pressed ? '#f0f0f0' : theme.colors.white,
              borderRadius: theme.radius.md,
              padding: theme.spacing.md,
              borderWidth: 1,
              borderColor: theme.colors.border,
            })}
          >
            <Text style={{ color: theme.colors.text, fontWeight: '600' }}>{item.title}</Text>
            <Text style={{ color: theme.colors.muted }}>{item.category} • {item.duration}</Text>
          </Pressable>
        ))}
      </View>
    </AppScreen>
  );
}
