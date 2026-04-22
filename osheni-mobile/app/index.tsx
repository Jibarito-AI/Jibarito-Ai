import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Screen } from '@/components/Screen';
import { theme } from '@/lib/theme';

export default function Index() {
  return (
    <Screen title="Prototype Entry">
      <View style={{ backgroundColor: theme.colors.white, borderRadius: theme.radius.lg, padding: theme.spacing.lg, gap: theme.spacing.md }}>
        <Text style={{ color: theme.colors.text, fontSize: 16 }}>This is the editable mobile prototype foundation for Osheni.</Text>
        <Link href="/onboarding" asChild>
          <Pressable style={{ backgroundColor: theme.colors.primary, padding: 14, borderRadius: theme.radius.md }}>
            <Text style={{ color: theme.colors.white, fontWeight: '700', textAlign: 'center' }}>Open Onboarding</Text>
          </Pressable>
        </Link>
        <Link href="/home" asChild>
          <Pressable style={{ borderWidth: 1, borderColor: theme.colors.border, padding: 14, borderRadius: theme.radius.md }}>
            <Text style={{ color: theme.colors.text, fontWeight: '700', textAlign: 'center' }}>Open App Prototype</Text>
          </Pressable>
        </Link>
      </View>
    </Screen>
  );
}
