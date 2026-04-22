import { ReactNode } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { NavTabs } from '@/components/NavTabs';
import { theme } from '@/lib/theme';

export function AppScreen({ title, children }: { title: string; children: ReactNode }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: theme.spacing.md, gap: theme.spacing.md, paddingBottom: theme.spacing.lg }}>
          <View style={{ gap: 4 }}>
            <Text style={{ fontSize: 12, textTransform: 'uppercase', color: theme.colors.muted }}>Osheni Club</Text>
            <Text style={{ fontSize: 28, fontWeight: '700', color: theme.colors.text }}>{title}</Text>
          </View>
          {children}
        </ScrollView>
        <NavTabs />
      </View>
    </SafeAreaView>
  );
}
