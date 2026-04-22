import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Screen } from '@/components/Screen';
import { Card } from '@/components/Card';
import { runPrototypeAuth } from '@/services/prototypeAuthService';
import { theme } from '@/lib/theme';

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      setStatus('Please enter your email and password.');
      return;
    }
    setStatus('Signing in...');
    const result = await runPrototypeAuth('sign-in', { email, password });
    if (result.ok) {
      await AsyncStorage.setItem('osheni_logged_in', 'true');
      router.replace('/home');
    } else {
      setStatus(result.message);
    }
  };

  return (
    <Screen title="Welcome Back">
      <Card>
        <TextInput value={email} onChangeText={setEmail} placeholder="Email" placeholderTextColor={theme.colors.muted} autoCapitalize="none" style={{ borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.radius.md, paddingHorizontal: 14, paddingVertical: 12, color: theme.colors.text }} />
        <TextInput value={password} onChangeText={setPassword} placeholder="Password" placeholderTextColor={theme.colors.muted} secureTextEntry style={{ borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.radius.md, paddingHorizontal: 14, paddingVertical: 12, color: theme.colors.text }} />
        <Pressable onPress={handleSubmit} style={{ backgroundColor: theme.colors.primary, borderRadius: theme.radius.md, paddingVertical: 12 }}>
          <Text style={{ color: theme.colors.white, textAlign: 'center', fontWeight: '700' }}>Log In</Text>
        </Pressable>
        {status ? <Text style={{ color: theme.colors.muted }}>{status}</Text> : null}
        <Link href="/home" asChild>
          <Pressable style={{ borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.radius.md, paddingVertical: 12 }}>
            <Text style={{ color: theme.colors.text, textAlign: 'center', fontWeight: '700' }}>Continue to Prototype</Text>
          </Pressable>
        </Link>
      </Card>
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 6 }}>
        <Text style={{ color: theme.colors.muted }}>Don’t have an account?</Text>
        <Link href="/create-account" style={{ color: theme.colors.primary, fontWeight: '700' }}>Create Account</Link>
      </View>
    </Screen>
  );
}
