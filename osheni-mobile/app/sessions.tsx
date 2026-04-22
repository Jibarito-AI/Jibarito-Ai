'use client';

import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { AppScreen } from '@/components/AppScreen';
import { Badge } from '@/components/Badge';
import { Card } from '@/components/Card';
import { getSessionReminderState } from '@/services/reminderService';
import { runSessionJoinAction, runSessionReminderAction } from '@/services/sessionActionService';
import { listLiveSessions } from '@/services/sessionService';
import type { LiveSession } from '@/types/session';
import { theme } from '@/lib/theme';

type SessionUiState = {
  message?: string;
  joinProvider?: string;
  deepLinkUrl?: string;
  webUrl?: string;
  reminderSet?: boolean;
};

export default function SessionsScreen() {
  const [sessions, setSessions] = useState<LiveSession[]>([]);
  const [sessionState, setSessionState] = useState<Record<string, SessionUiState>>({});

  useEffect(() => {
    (async () => {
      const loaded = await listLiveSessions();
      setSessions(loaded);

      const reminderStates = await Promise.all(
        loaded.map(async (session) => {
          const reminder = await getSessionReminderState(session.id);
          return [session.id, { reminderSet: reminder.enabled }] as const;
        })
      );

      setSessionState((prev) => ({
        ...prev,
        ...Object.fromEntries(reminderStates)
      }));
    })();
  }, []);

  const handleJoin = async (sessionId: string) => {
    const result = await runSessionJoinAction(sessionId);
    setSessionState((prev) => ({
      ...prev,
      [sessionId]: {
        ...prev[sessionId],
        message: result.message,
        joinProvider: result.joinPayload?.provider,
        deepLinkUrl: result.joinPayload?.deepLinkUrl,
        webUrl: result.joinPayload?.joinUrl
      }
    }));
  };

  const handleReminder = async (sessionId: string) => {
    const result = await runSessionReminderAction(sessionId);
    setSessionState((prev) => ({
      ...prev,
      [sessionId]: {
        ...prev[sessionId],
        message: result.message,
        reminderSet: true
      }
    }));
  };

  return (
    <AppScreen title="Live Sessions">
      {sessions.map((session) => {
        const state = sessionState[session.id];

        return (
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

            {session.status === 'live' ? (
              <Pressable onPress={() => handleJoin(session.id)} style={{ backgroundColor: theme.colors.primary, borderRadius: theme.radius.md, paddingVertical: 12, paddingHorizontal: 14 }}>
                <Text style={{ color: theme.colors.white, textAlign: 'center', fontWeight: '700' }}>Join Now</Text>
              </Pressable>
            ) : (
              <Pressable onPress={() => handleReminder(session.id)} style={{ backgroundColor: theme.colors.primary, borderRadius: theme.radius.md, paddingVertical: 12, paddingHorizontal: 14 }}>
                <Text style={{ color: theme.colors.white, textAlign: 'center', fontWeight: '700' }}>{state?.reminderSet ? 'Reminder Set' : 'Set Reminder'}</Text>
              </Pressable>
            )}

            {state?.message ? (
              <Card>
                <Text style={{ color: theme.colors.text, fontWeight: '600' }}>Action Status</Text>
                <Text style={{ color: theme.colors.muted }}>{state.message}</Text>
                {state.joinProvider ? <Text style={{ color: theme.colors.text }}>Provider: {state.joinProvider.toUpperCase()}</Text> : null}
                {state.deepLinkUrl ? <Text style={{ color: theme.colors.text }}>Deep link: {state.deepLinkUrl}</Text> : null}
                {state.webUrl ? <Text style={{ color: theme.colors.text }}>Web URL: {state.webUrl}</Text> : null}
              </Card>
            ) : null}
          </Card>
        );
      })}
    </AppScreen>
  );
}
