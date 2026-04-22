import { Text, View } from 'react-native';
import { theme } from '@/lib/theme';

export function Badge({ label }: { label: string }) {
  return (
    <View
      style={{
        alignSelf: 'flex-start',
        backgroundColor: '#E6F3F3',
        borderRadius: 999,
        paddingHorizontal: 12,
        paddingVertical: 6
      }}
    >
      <Text style={{ color: theme.colors.text, fontSize: 12, fontWeight: '600' }}>{label}</Text>
    </View>
  );
}
