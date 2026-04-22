import { Text, TextInput, View } from 'react-native';
import { AppScreen } from '@/components/AppScreen';
import { Badge } from '@/components/Badge';
import { Card } from '@/components/Card';
import { theme } from '@/lib/theme';

const moods = ['😊 Great', '🙂 Good', '😐 Okay', '😔 Not Great', '😢 Struggling'];

export default function JournalScreen() {
  return (
    <AppScreen title="Your Journal">
      <Card>
        <Text style={{ color: theme.colors.muted }}>Today’s Prompt</Text>
        <Text style={{ color: theme.colors.text, fontSize: 20, fontWeight: '700' }}>What do I need to release today?</Text>
        <View style={{ backgroundColor: theme.colors.primary, borderRadius: theme.radius.md, paddingVertical: 12, paddingHorizontal: 14 }}>
          <Text style={{ color: theme.colors.white, textAlign: 'center', fontWeight: '700' }}>Start Writing</Text>
        </View>
      </Card>

      <Card>
        <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 18 }}>New Entry</Text>
        <TextInput
          multiline
          placeholder="Write freely. Your journal is private."
          placeholderTextColor={theme.colors.muted}
          style={{ minHeight: 180, textAlignVertical: 'top', borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.radius.md, paddingHorizontal: 14, paddingVertical: 12, color: theme.colors.text }}
        />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {moods.map((mood) => (
            <Badge key={mood} label={mood} />
          ))}
        </View>
        <View style={{ backgroundColor: theme.colors.primary, borderRadius: theme.radius.md, paddingVertical: 12, paddingHorizontal: 14 }}>
          <Text style={{ color: theme.colors.white, textAlign: 'center', fontWeight: '700' }}>Save Entry</Text>
        </View>
      </Card>
    </AppScreen>
  );
}
