import { Text, View } from 'react-native';
import { AppScreen } from '@/components/AppScreen';
import { Badge } from '@/components/Badge';
import { Card } from '@/components/Card';
import { theme } from '@/lib/theme';

export default function AudioPlayerScreen() {
  return (
    <AppScreen title="Audio Player">
      <Card>
        <Text style={{ color: theme.colors.text, fontSize: 22, fontWeight: '700' }}>Breath Into Calm</Text>
        <Text style={{ color: theme.colors.muted }}>Breathwork • 8 min</Text>
        <View style={{ height: 10, backgroundColor: '#DCE7F3', borderRadius: 999, overflow: 'hidden' }}>
          <View style={{ width: '42%', height: '100%', backgroundColor: theme.colors.primary }} />
        </View>
        <Text style={{ color: theme.colors.muted }}>03:22 / 08:00</Text>
      </Card>

      <Card>
        <Text style={{ color: theme.colors.text, fontWeight: '700' }}>Controls</Text>
        <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
          <Badge label="-15s" />
          <Badge label="Play / Pause" />
          <Badge label="+15s" />
          <Badge label="Sleep Timer" />
          <Badge label="1x Speed" />
        </View>
      </Card>

      <Card>
        <Text style={{ color: theme.colors.text }}>Prototype player ready for expo-av or expo-audio wiring later.</Text>
      </Card>
    </AppScreen>
  );
}
