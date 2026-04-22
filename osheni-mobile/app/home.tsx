import { Text, View } from 'react-native';
import { Screen } from '@/components/Screen';
import { liveSessions, meditations, quickActions } from '@/lib/content';
import { theme } from '@/lib/theme';

export default function HomeScreen() {
  return (
    <Screen title="Home Dashboard">
      <View style={{ backgroundColor: theme.colors.white, borderRadius: theme.radius.lg, padding: theme.spacing.lg, gap: 8 }}>
        <Text style={{ color: theme.colors.muted }}>Good morning, Christopher</Text>
        <Text style={{ color: theme.colors.text, fontSize: 24, fontWeight: '700' }}>12 day streak 🔥</Text>
        <Text style={{ color: theme.colors.text }}>Peace comes from what you practice daily.</Text>
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm }}>
        {quickActions.map((item) => (
          <View key={item} style={{ width: '47%', backgroundColor: theme.colors.white, borderRadius: theme.radius.md, padding: theme.spacing.md, borderWidth: 1, borderColor: theme.colors.border }}>
            <Text style={{ color: theme.colors.text, fontWeight: '600' }}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={{ backgroundColor: theme.colors.white, borderRadius: theme.radius.lg, padding: theme.spacing.lg, gap: 10 }}>
        <Text style={{ color: theme.colors.text, fontSize: 18, fontWeight: '700' }}>Upcoming Live Session</Text>
        <Text style={{ color: theme.colors.muted }}>{liveSessions[2].title} • {liveSessions[2].time}</Text>
      </View>

      <View style={{ gap: theme.spacing.sm }}>
        <Text style={{ color: theme.colors.text, fontSize: 18, fontWeight: '700' }}>Recommended For You</Text>
        {meditations.map((item) => (
          <View key={item.title} style={{ backgroundColor: theme.colors.white, borderRadius: theme.radius.md, padding: theme.spacing.md, borderWidth: 1, borderColor: theme.colors.border }}>
            <Text style={{ color: theme.colors.text, fontWeight: '600' }}>{item.title}</Text>
            <Text style={{ color: theme.colors.muted }}>{item.category} • {item.duration}</Text>
          </View>
        ))}
      </View>
    </Screen>
  );
}
