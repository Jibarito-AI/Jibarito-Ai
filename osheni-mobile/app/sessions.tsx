'use client';

import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { AppScreen } from '@/components/AppScreen';
import { Badge } from '@/components/Badge';
import { Card } from '@/components/Card';
import { runSessionJoinAction, runSessionReminderAction } from '@/services/sessionActionService';
import { listLiveSessions } from '@/services/sessionService';
import type { LiveSession } from '@/types/session';
import { theme } from '@/lib/theme';

export default function SessionsScreen() {
  const [sessions, setSessions] = useState<LiveSession[]>([]);
  const [status, setStatus] = useState<Record<string, string>>({});

  useEffect(() => {
    (async () => {
      const loaded = await listLiveSessions();
      setSessions(loaded);
    })();
  }, []);

  const handleJoin = async (sessionId: string) => {
    const result = await runSessionJoinAction(sessionId);
    setStatus((prev) => ({ ...prev, [sessionId]: result.message }));
  };

  const handleReminder = async (sessionId: string) => {
    const result = await runSessionReminderAction(sessionId);
    setStatus((prev) => ({ ...prev, [sessionId]: result.message }));
  };

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

          {session.status === 'live' ? (
            <Pressable onPress={() => handleJoin(session.id)} style={{ backgroundColor: theme.colors.primary, borderRadius: theme.radius.md, paddingVertical: 12, paddingHorizontal: 14 }}>
              <Text style={{ color: theme.colors.white, textAlign: 'center', fontWeight: '700' }}>Join Now</Text>
            </Pressable>
          ) : (
            <Pressable onPress={() => handleReminder(session.id)} style={{ backgroundColor: theme.colors.primary, borderRadius: theme.radius.md, paddingVertical: 12, paddingHorizontal: 14 }}>
              <Text style={{ color: theme.colors.white, textAlign: 'center', fontWeight: '700' }}>Set Reminder</Text>
            </Pressable>
          )}

          {status[session.id] ? <Text style={{ color: theme.colors.muted }}>{status[session.id]}</Text> : null}
        </Card>
      ))}
    </AppScreen>
  );
}
