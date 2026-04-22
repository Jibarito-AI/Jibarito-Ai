import { Text, View } from 'react-native';
import { AppScreen } from '@/components/AppScreen';
import { Badge } from '@/components/Badge';
import { Card } from '@/components/Card';
import { theme } from '@/lib/theme';

const stats = [
  { label: 'Current streak', value: '12 days' },
  { label: 'Meditations completed', value: '38' },
  { label: 'Minutes meditated', value: '412' },
  { label: 'Live sessions attended', value: '11' }
];

export default function ProgressScreen() {
  return (
    <AppScreen title="Your Progress">
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm }}>
        {['7 days', '30 days', '90 days', 'All Time'].map((range) => (
          <Badge key={range} label={range} />
        ))}
      </View>

      <View style={{ gap: theme.spacing.sm }}>
        {stats.map((stat) => (
          <Card key={stat.label} style={{ width: '100%' }}>
            <Text style={{ color: theme.colors.muted }}>{stat.label}</Text>
            <Text style={{ color: theme.colors.text, fontSize: 22, fontWeight: '700' }}>{stat.value}</Text>
          </Card>
        ))}
      </View>

      <Card>
        <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 18 }}>Insights</Text>
        <Text style={{ color: theme.colors.text }}>You meditate most often in the evenings.</Text>
        <Text style={{ color: theme.colors.text }}>Your mood trend is improving this month.</Text>
        <Text style={{ color: theme.colors.text }}>You are on track to hit your 30-day consistency goal.</Text>
      </Card>
    </AppScreen>
  );
}
