import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { AppScreen } from '@/components/AppScreen';
import { Card } from '@/components/Card';
import { meditations } from '@/lib/content';
import { theme } from '@/lib/theme';

const filters = ['All', 'Sleep', 'Stress', 'Gratitude', 'Anxiety', 'Breathwork', 'Mindfulness'];

const allMeditations = [
  { title: 'Morning Reset', duration: '5 min', category: 'Stress' },
  { title: 'Breath Into Calm', duration: '8 min', category: 'Breathwork' },
  { title: 'Sleep Wind Down', duration: '12 min', category: 'Sleep' },
  { title: 'Gratitude Flow', duration: '7 min', category: 'Gratitude' },
  { title: 'Anxiety Release', duration: '10 min', category: 'Anxiety' },
  { title: 'Mindful Moment', duration: '5 min', category: 'Mindfulness' },
  { title: 'Deep Sleep Journey', duration: '20 min', category: 'Sleep' },
  { title: 'Stress Melt', duration: '9 min', category: 'Stress' },
];

export default function ExploreScreen() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = allMeditations.filter((item) => {
    const matchesFilter = activeFilter === 'All' || item.category === activeFilter;
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <AppScreen title="Explore">
      <Card>
        <TextInput
          placeholder="Search meditations"
          placeholderTextColor={theme.colors.muted}
          value={search}
          onChangeText={setSearch}
          style={{ borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.radius.md, paddingHorizontal: 14, paddingVertical: 12, color: theme.colors.text }}
        />
      </Card>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {filters.map((filter) => (
          <Pressable
            key={filter}
            onPress={() => setActiveFilter(filter)}
            style={{
              backgroundColor: activeFilter === filter ? theme.colors.primary : '#E6F3F3',
              borderRadius: 20,
              paddingHorizontal: 14,
              paddingVertical: 8,
            }}
          >
            <Text style={{ color: activeFilter === filter ? theme.colors.white : theme.colors.text, fontWeight: '600', fontSize: 13 }}>
              {filter}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={{ gap: theme.spacing.sm }}>
        {filtered.length === 0 ? (
          <Card>
            <Text style={{ color: theme.colors.muted, textAlign: 'center' }}>No meditations found.</Text>
          </Card>
        ) : (
          filtered.map((item) => (
            <Card key={item.title}>
              <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 16 }}>{item.title}</Text>
              <Text style={{ color: theme.colors.muted }}>{item.category} • {item.duration}</Text>
            </Card>
          ))
        )}
      </View>
    </AppScreen>
  );
}
