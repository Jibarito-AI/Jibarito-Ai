'use client';

import { useEffect, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { AppScreen } from '@/components/AppScreen';
import { Badge } from '@/components/Badge';
import { Card } from '@/components/Card';
import { getRepositoryBackedLatestMoodCheckIn, saveRepositoryBackedMoodCheckIn } from '@/services/repositoryBackedMoodService';
import { theme } from '@/lib/theme';

const moods = ['great', 'good', 'okay', 'not_great', 'struggling'] as const;
const tags = ['Peaceful', 'Anxious', 'Stressed', 'Grateful', 'Sad', 'Energized', 'Calm'];

export default function MoodScreen() {
  const [level, setLevel] = useState<(typeof moods)[number]>('good');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    (async () => {
      const latestMood = await getRepositoryBackedLatestMoodCheckIn();
      setLevel(latestMood.level);
      setNote(latestMood.note ?? '');
    })();
  }, []);

  const handleSave = async () => {
    setStatus('Saving...');
    await saveRepositoryBackedMoodCheckIn({
      level,
      tags: ['Calm'],
      note,
      createdAt: new Date().toISOString()
    });
    setStatus('Saved');
  };

  return (
    <AppScreen title="Mood Check-In">
      <Card>
        <Text style={{ color: theme.colors.text, fontSize: 20, fontWeight: '700' }}>How are you feeling right now?</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {moods.map((mood) => (
            <Pressable key={mood} onPress={() => setLevel(mood)}>
              <Badge label={mood} />
            </Pressable>
          ))}
        </View>
      </Card>

      <Card>
        <Text style={{ color: theme.colors.text, fontWeight: '700' }}>What else describes it?</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {tags.map((tag) => (
            <Badge key={tag} label={tag} />
          ))}
        </View>
        <Text style={{ color: theme.colors.muted }}>Current mood level: {level}</Text>
        <TextInput
          multiline
          value={note}
          onChangeText={setNote}
          placeholder="Want to add anything?"
          placeholderTextColor={theme.colors.muted}
          style={{ minHeight: 120, textAlignVertical: 'top', borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.radius.md, paddingHorizontal: 14, paddingVertical: 12, color: theme.colors.text }}
        />
        <Pressable onPress={handleSave} style={{ backgroundColor: theme.colors.primary, borderRadius: theme.radius.md, paddingVertical: 12, paddingHorizontal: 14 }}>
          <Text style={{ color: theme.colors.white, textAlign: 'center', fontWeight: '700' }}>Save Mood</Text>
        </Pressable>
        {status ? <Text style={{ color: theme.colors.muted }}>{status}</Text> : null}
      </Card>
    </AppScreen>
  );
}
