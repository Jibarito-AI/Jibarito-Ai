import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { AppScreen } from '@/components/AppScreen';
import { Card } from '@/components/Card';
import { getSessionReminderState } from '@/services/reminderService';
import { runSessionJoinAction, runSessionReminderAction } from '@/services/sessionActionService';
import { getRepositoryBackedLiveSessions } from '@/services/repositoryBackedSessionService';
import type { LiveSession } from '@/types/session';
import { theme } from '@/lib/theme';

type SessionUiState = {
  reminderSet?: boolean;
  joinedAt?: string;
};

export default function SessionsScreen() {
  const [sessions, setSessions] = useState<LiveSession[]>([]);
  const [sessionState, setSessionState] = useState<Record<string, SessionUiState>>({});

  useEffect(() => {
    (async () => {
      const loaded = await getRepositoryBackedLiveSessions();
      setSessions(loaded);

      const reminderStates = await Promise.all(
        loaded.map(async (session) => {
          const reminder = await getSessionReminderState(session.id);
          return [session.id, { reminderSet: reminder.enabled }] as const;
        })
      );

      setSessionState(Object.fromEntries(reminderStates));
    })();
  }, []);

  const handleJoin = async (sessionId: string) => {
    await runSessionJoinAction(sessionId);
    setSessionState((prev) => ({
      ...prev,
      [sessionId]: { ...prev[sessionId], joinedAt: new Date().toLocaleTimeString() },
    }));
  };

  const handleReminder = async (sessionId: string) => {
    await runSessionReminderAction(sessionId);
    setSessionState((prev) => ({
      ...prev,
      [sessionId]: { ...prev[sessionId], reminderSet: true },
    }));
  };

  return (
    <AppScreen title="Live Sessions">
      {sessions.map((session) => {
        const state = sessionState[session.id];
        const isLive = session.status === 'live';

        return (
          <Card key={session.id}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <View style={{ flex: 1, gap: 4 }}>
                <Text style={{ color: theme.colors.muted }}>
                  {session.dateLabel ? `${session.dateLabel} • ` : ''}{session.timeLabel ?? session.startsAt}
                </Text>
                <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 18 }}>{session.title}</Text>
                <Text style={{ color: theme.colors.muted }}>{session.attendees} attending</Text>
                {session.instructorName ? (
                  <Text style={{ color: theme.colors.muted }}>Guide: {session.instructorName}</Text>
                ) : null}
              </View>

              <View style={{
                backgroundColor: isLive ? '#d4f4dd' : '#E6F3F3',
                borderRadius: 99,
                paddingHorizontal: 12,
                paddingVertical: 4,
                alignSelf: 'flex-start',
              }}>
                <Text style={{ color: isLive ? '#1a7a3a' : theme.colors.muted, fontWeight: '700', fontSize: 12 }}>
                  {isLive ? '● LIVE' : 'Upcoming'}
                </Text>
              </View>
            </View>

            {isLive ? (
              state?.joinedAt ? (
                <View style={{ backgroundColor: '#d4f4dd', borderRadius: theme.radius.md, paddingVertical: 12, alignItems: 'center' }}>
                  <Text style={{ color: '#1a7a3a', fontWeight: '700' }}>Joined at {state.joinedAt}</Text>
                </View>
              ) : (
                <Pressable
                  onPress={() => handleJoin(session.id)}
                  style={{ backgroundColor: theme.colors.primary, borderRadius: theme.radius.md, paddingVertical: 12 }}
                >
                  <Text style={{ color: theme.colors.white, textAlign: 'center', fontWeight: '700' }}>Join Now</Text>
                </Pressable>
              )
            ) : (
              <Pressable
                onPress={() => handleReminder(session.id)}
                style={{
                  backgroundColor: state?.reminderSet ? '#E6F3F3' : theme.colors.primary,
                  borderRadius: theme.radius.md,
                  paddingVertical: 12,
                }}
              >
                <Text style={{
                  color: state?.reminderSet ? theme.colors.primary : theme.colors.white,
                  textAlign: 'center',
                  fontWeight: '700',
                }}>
                  {state?.reminderSet ? '✓ Reminder Set' : 'Set Reminder'}
                </Text>
              </Pressable>
            )}
          </Card>
        );
      })}
    </AppScreen>
  );
}
