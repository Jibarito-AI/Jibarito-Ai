import { Text, TextInput, View } from 'react-native';
import { AppScreen } from '@/components/AppScreen';
import { Badge } from '@/components/Badge';
import { Card } from '@/components/Card';
import { meditations } from '@/lib/content';
import { theme } from '@/lib/theme';

const filters = ['All', 'Sleep', 'Stress', 'Gratitude', 'Anxiety', 'Breathwork', 'Mindfulness'];

export default function ExploreScreen() {
  return (
    <AppScreen title="Explore">
      <Card>
        <TextInput
          placeholder="Search meditations"
          placeholderTextColor={theme.colors.muted}
          style={{ borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.radius.md, paddingHorizontal: 14, paddingVertical: 12, color: theme.colors.text }}
        />
      </Card>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {filters.map((filter) => (
          <Badge key={filter} label={filter} />
        ))}
      </View>

      <View style={{ gap: theme.spacing.sm }}>
        {meditations.concat(meditations).map((item, index) => (
          <Card key={`${item.title}-${index}`}>
            <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 16 }}>{item.title}</Text>
            <Text style={{ color: theme.colors.muted }}>{item.category} • {item.duration}</Text>
          </Card>
        ))}
      </View>
    </AppScreen>
  );
}
