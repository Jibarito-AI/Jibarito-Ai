import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { AppScreen } from '@/components/AppScreen';
import { Card } from '@/components/Card';
import { theme } from '@/lib/theme';

const ranges = ['7 days', '30 days', '90 days', 'All Time'];

const statsByRange: Record<string, { label: string; value: string }[]> = {
  '7 days': [
    { label: 'Current streak', value: '7 days' },
    { label: 'Meditations completed', value: '6' },
    { label: 'Minutes meditated', value: '54' },
    { label: 'Live sessions attended', value: '1' },
  ],
  '30 days': [
    { label: 'Current streak', value: '12 days' },
    { label: 'Meditations completed', value: '22' },
    { label: 'Minutes meditated', value: '198' },
    { label: 'Live sessions attended', value: '4' },
  ],
  '90 days': [
    { label: 'Current streak', value: '12 days' },
    { label: 'Meditations completed', value: '38' },
    { label: 'Minutes meditated', value: '412' },
    { label: 'Live sessions attended', value: '11' },
  ],
  'All Time': [
    { label: 'Current streak', value: '12 days' },
    { label: 'Meditations completed', value: '61' },
    { label: 'Minutes meditated', value: '703' },
    { label: 'Live sessions attended', value: '18' },
  ],
};

export default function ProgressScreen() {
  const [activeRange, setActiveRange] = useState('30 days');
  const stats = statsByRange[activeRange];

  return (
    <AppScreen title="Your Progress">
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {ranges.map((range) => (
          <Pressable
            key={range}
            onPress={() => setActiveRange(range)}
            style={{
              backgroundColor: activeRange === range ? theme.colors.primary : '#E6F3F3',
              borderRadius: 20,
              paddingHorizontal: 14,
              paddingVertical: 8,
            }}
          >
            <Text style={{ color: activeRange === range ? theme.colors.white : theme.colors.text, fontWeight: '600', fontSize: 13 }}>
              {range}
            </Text>
          </Pressable>
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
        <Text style={{ color: theme.colors.text, marginTop: 4 }}>You meditate most often in the evenings.</Text>
        <Text style={{ color: theme.colors.text, marginTop: 4 }}>Your mood trend is improving this month.</Text>
        <Text style={{ color: theme.colors.text, marginTop: 4 }}>You are on track to hit your 30-day consistency goal.</Text>
      </Card>
    </AppScreen>
  );
}
