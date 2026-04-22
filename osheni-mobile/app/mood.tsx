import { useEffect, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { AppScreen } from '@/components/AppScreen';
import { Card } from '@/components/Card';
import { getRepositoryBackedLatestMoodCheckIn, saveRepositoryBackedMoodCheckIn } from '@/services/repositoryBackedMoodService';
import { theme } from '@/lib/theme';

const moods: { value: string; emoji: string; label: string }[] = [
  { value: 'great', emoji: '😊', label: 'Great' },
  { value: 'good', emoji: '🙂', label: 'Good' },
  { value: 'okay', emoji: '😐', label: 'Okay' },
  { value: 'not_great', emoji: '😔', label: 'Not Great' },
  { value: 'struggling', emoji: '😢', label: 'Struggling' },
];

const tags = ['Peaceful', 'Anxious', 'Stressed', 'Grateful', 'Sad', 'Energized', 'Calm'];

export default function MoodScreen() {
  const [level, setLevel] = useState('good');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    (async () => {
      const latestMood = await getRepositoryBackedLatestMoodCheckIn();
      setLevel(latestMood.level);
      setNote(latestMood.note ?? '');
    })();
  }, []);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSave = async () => {
    setStatus('Saving...');
    await saveRepositoryBackedMoodCheckIn({
      level: level as any,
      tags: selectedTags,
      note,
      createdAt: new Date().toISOString()
    });
    setStatus('Saved ✓');
    setTimeout(() => setStatus(''), 2000);
  };

  return (
    <AppScreen title="Mood Check-In">
      <Card>
        <Text style={{ color: theme.colors.text, fontSize: 20, fontWeight: '700' }}>How are you feeling right now?</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
          {moods.map((mood) => (
            <Pressable
              key={mood.value}
              onPress={() => setLevel(mood.value)}
              style={{
                backgroundColor: level === mood.value ? theme.colors.primary : '#E6F3F3',
                borderRadius: theme.radius.md,
                paddingHorizontal: 14,
                paddingVertical: 10,
                alignItems: 'center',
                minWidth: 80,
              }}
            >
              <Text style={{ fontSize: 22 }}>{mood.emoji}</Text>
              <Text style={{ color: level === mood.value ? theme.colors.white : theme.colors.text, fontWeight: '600', fontSize: 12 }}>
                {mood.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </Card>

      <Card>
        <Text style={{ color: theme.colors.text, fontWeight: '700' }}>What else describes it?</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
          {tags.map((tag) => (
            <Pressable
              key={tag}
              onPress={() => toggleTag(tag)}
              style={{
                backgroundColor: selectedTags.includes(tag) ? theme.colors.primary : '#E6F3F3',
                borderRadius: 20,
                paddingHorizontal: 14,
                paddingVertical: 8,
              }}
            >
              <Text style={{ color: selectedTags.includes(tag) ? theme.colors.white : theme.colors.text, fontWeight: '600', fontSize: 13 }}>
                {tag}
              </Text>
            </Pressable>
          ))}
        </View>
        <TextInput
          multiline
          value={note}
          onChangeText={setNote}
          placeholder="Want to add anything?"
          placeholderTextColor={theme.colors.muted}
          style={{ minHeight: 120, textAlignVertical: 'top', borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.radius.md, paddingHorizontal: 14, paddingVertical: 12, color: theme.colors.text, marginTop: 8 }}
        />
        <Pressable onPress={handleSave} style={{ backgroundColor: theme.colors.primary, borderRadius: theme.radius.md, paddingVertical: 12, paddingHorizontal: 14 }}>
          <Text style={{ color: theme.colors.white, textAlign: 'center', fontWeight: '700' }}>Save Mood</Text>
        </Pressable>
        {status ? <Text style={{ color: theme.colors.primary, textAlign: 'center', fontWeight: '600' }}>{status}</Text> : null}
      </Card>
    </AppScreen>
  );
}
