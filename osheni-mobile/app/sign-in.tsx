import { Link } from 'expo-router';
import { Pressable, Text, TextInput, View } from 'react-native';
import { Screen } from '@/components/Screen';
import { Card } from '@/components/Card';
import { theme } from '@/lib/theme';

export default function SignInScreen() {
  return (
    <Screen title="Welcome Back">
      <Card>
        <TextInput placeholder="Email" placeholderTextColor={theme.colors.muted} autoCapitalize="none" style={{ borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.radius.md, paddingHorizontal: 14, paddingVertical: 12, color: theme.colors.text }} />
        <TextInput placeholder="Password" placeholderTextColor={theme.colors.muted} secureTextEntry style={{ borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.radius.md, paddingHorizontal: 14, paddingVertical: 12, color: theme.colors.text }} />
        <Pressable style={{ backgroundColor: theme.colors.primary, borderRadius: theme.radius.md, paddingVertical: 12 }}>
          <Text style={{ color: theme.colors.white, textAlign: 'center', fontWeight: '700' }}>Log In</Text>
        </Pressable>
        <Link href="/home" asChild>
          <Pressable style={{ borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.radius.md, paddingVertical: 12 }}>
            <Text style={{ color: theme.colors.text, textAlign: 'center', fontWeight: '700' }}>Continue to Prototype</Text>
          </Pressable>
        </Link>
      </Card>
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 6 }}>
        <Text style={{ color: theme.colors.muted }}>Don’t have an account?</Text>
        <Link href="/sign-up" style={{ color: theme.colors.primary, fontWeight: '700' }}>Sign Up</Link>
      </View>
    </Screen>
  );
}
