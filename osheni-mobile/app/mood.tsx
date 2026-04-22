import { Text, TextInput, View } from 'react-native';
import { AppScreen } from '@/components/AppScreen';
import { Badge } from '@/components/Badge';
import { Card } from '@/components/Card';
import { getRepositoryBackedLatestMoodCheckIn } from '@/services/repositoryBackedMoodService';
import { theme } from '@/lib/theme';

const latestMoodPromise = getRepositoryBackedLatestMoodCheckIn();
const moods = ['😊 Great', '🙂 Good', '😐 Okay', '😔 Not Great', '😢 Struggling'];
const tags = ['Peaceful', 'Anxious', 'Stressed', 'Grateful', 'Sad', 'Energized', 'Calm'];

export default async function MoodScreen() {
  const latestMood = await latestMoodPromise;

  return (
    <AppScreen title="Mood Check-In">
      <Card>
        <Text style={{ color: theme.colors.text, fontSize: 20, fontWeight: '700' }}>How are you feeling right now?</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {moods.map((mood) => (
            <Badge key={mood} label={mood} />
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
        <Text style={{ color: theme.colors.muted }}>Latest saved mood: {latestMood.level}</Text>
        <TextInput
          multiline
          placeholder={latestMood.note ?? 'Want to add anything?'}
          placeholderTextColor={theme.colors.muted}
          style={{ minHeight: 120, textAlignVertical: 'top', borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.radius.md, paddingHorizontal: 14, paddingVertical: 12, color: theme.colors.text }}
        />
        <View style={{ backgroundColor: theme.colors.primary, borderRadius: theme.radius.md, paddingVertical: 12, paddingHorizontal: 14 }}>
          <Text style={{ color: theme.colors.white, textAlign: 'center', fontWeight: '700' }}>Save Mood</Text>
        </View>
      </Card>
    </AppScreen>
  );
}
