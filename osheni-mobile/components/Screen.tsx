import { ReactNode } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { theme } from '@/lib/theme';

export function Screen({ title, children }: { title: string; children: ReactNode }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView contentContainerStyle={{ padding: theme.spacing.md, gap: theme.spacing.md }}>
        <View style={{ gap: 4 }}>
          <Text style={{ fontSize: 12, textTransform: 'uppercase', color: theme.colors.muted }}>Osheni</Text>
          <Text style={{ fontSize: 28, fontWeight: '700', color: theme.colors.text }}>{title}</Text>
        </View>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}
