import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Screen } from '@/components/Screen';
import { Card } from '@/components/Card';
import { theme } from '@/lib/theme';

export default function AuthGatewayScreen() {
  return (
    <Screen title="Authentication">
      <Card>
        <Text style={{ color: theme.colors.text, fontSize: 18, fontWeight: '700' }}>Welcome to Osheni</Text>
        <Text style={{ color: theme.colors.muted }}>Choose how you want to enter the prototype. This flow will later connect to real authentication.</Text>
        <Link href="/sign-in" asChild>
          <Pressable style={{ backgroundColor: theme.colors.primary, borderRadius: theme.radius.md, paddingVertical: 12 }}>
            <Text style={{ color: theme.colors.white, textAlign: 'center', fontWeight: '700' }}>Sign In</Text>
          </Pressable>
        </Link>
        <Link href="/create-account" asChild>
          <Pressable style={{ borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.radius.md, paddingVertical: 12 }}>
            <Text style={{ color: theme.colors.text, textAlign: 'center', fontWeight: '700' }}>Create Account</Text>
          </Pressable>
        </Link>
        <Link href="/home" asChild>
          <Pressable style={{ borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.radius.md, paddingVertical: 12 }}>
            <Text style={{ color: theme.colors.text, textAlign: 'center', fontWeight: '700' }}>Skip to App Prototype</Text>
          </Pressable>
        </Link>
      </Card>
    </Screen>
  );
}
