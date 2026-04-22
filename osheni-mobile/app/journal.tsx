import { useEffect, useRef, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { AppScreen } from '@/components/AppScreen';
import { Card } from '@/components/Card';
import { getRepositoryBackedJournalEntries, saveRepositoryBackedJournalEntry } from '@/services/repositoryBackedJournalService';
import { theme } from '@/lib/theme';

const moods = [
  { value: 'great', emoji: '😊', label: 'Great' },
  { value: 'good', emoji: '🙂', label: 'Good' },
  { value: 'okay', emoji: '😐', label: 'Okay' },
  { value: 'not_great', emoji: '😔', label: 'Not Great' },
  { value: 'struggling', emoji: '😢', label: 'Struggling' },
];

export default function JournalScreen() {
  const [content, setContent] = useState('');
  const [prompt, setPrompt] = useState('What do I need to release today?');
  const [selectedMood, setSelectedMood] = useState('good');
  const [status, setStatus] = useState('');
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    (async () => {
      const entries = await getRepositoryBackedJournalEntries('user_1');
      const latestEntry = entries[0];
      if (latestEntry?.content) setContent(latestEntry.content);
      if (latestEntry?.prompt) setPrompt(latestEntry.prompt);
    })();
  }, []);

  const handleSave = async () => {
    setStatus('Saving...');
    await saveRepositoryBackedJournalEntry({
      id: `entry_${Date.now()}`,
      userId: 'user_1',
      createdAt: new Date().toISOString(),
      prompt,
      content,
      moodTags: [selectedMood],
    });
    setStatus('Saved ✓');
    setTimeout(() => setStatus(''), 2000);
  };

  return (
    <AppScreen title="Your Journal">
      <Card>
        <Text style={{ color: theme.colors.muted }}>Today's Prompt</Text>
        <Text style={{ color: theme.colors.text, fontSize: 20, fontWeight: '700' }}>{prompt}</Text>
        <Pressable
          onPress={() => inputRef.current?.focus()}
          style={{ backgroundColor: theme.colors.primary, borderRadius: theme.radius.md, paddingVertical: 12, paddingHorizontal: 14 }}
        >
          <Text style={{ color: theme.colors.white, textAlign: 'center', fontWeight: '700' }}>Start Writing</Text>
        </Pressable>
      </Card>

      <Card>
        <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 18 }}>New Entry</Text>
        <TextInput
          ref={inputRef}
          multiline
          value={content}
          onChangeText={setContent}
          placeholder="Write freely. Your journal is private."
          placeholderTextColor={theme.colors.muted}
          style={{ minHeight: 180, textAlignVertical: 'top', borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.radius.md, paddingHorizontal: 14, paddingVertical: 12, color: theme.colors.text }}
        />

        <Text style={{ color: theme.colors.text, fontWeight: '600', marginBottom: 4 }}>How are you feeling?</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {moods.map((mood) => (
            <Pressable
              key={mood.value}
              onPress={() => setSelectedMood(mood.value)}
              style={{
                backgroundColor: selectedMood === mood.value ? theme.colors.primary : '#E6F3F3',
                borderRadius: theme.radius.md,
                paddingHorizontal: 12,
                paddingVertical: 8,
                alignItems: 'center',
                flexDirection: 'row',
                gap: 4,
              }}
            >
              <Text style={{ fontSize: 16 }}>{mood.emoji}</Text>
              <Text style={{ color: selectedMood === mood.value ? theme.colors.white : theme.colors.text, fontWeight: '600', fontSize: 13 }}>
                {mood.label}
              </Text>
            </Pressable>
          ))}
        </View>

        <Pressable onPress={handleSave} style={{ backgroundColor: theme.colors.primary, borderRadius: theme.radius.md, paddingVertical: 12, paddingHorizontal: 14 }}>
          <Text style={{ color: theme.colors.white, textAlign: 'center', fontWeight: '700' }}>Save Entry</Text>
        </Pressable>
        {status ? <Text style={{ color: theme.colors.primary, textAlign: 'center', fontWeight: '600' }}>{status}</Text> : null}
      </Card>
    </AppScreen>
  );
}
