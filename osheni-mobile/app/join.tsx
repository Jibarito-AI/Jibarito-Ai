import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { Screen } from '@/components/Screen';
import { Card } from '@/components/Card';
import { runPrototypeAuth } from '@/services/prototypeAuthService';
import { theme } from '@/lib/theme';

export default function JoinScreen() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async () => {
    if (!firstName.trim() || !email.trim() || !password.trim()) {
      setStatus('Please fill in all fields.');
      return;
    }
    if (password.length < 6) {
      setStatus('Password must be at least 6 characters.');
      return;
    }
    setStatus('Creating account...');
    const result = await runPrototypeAuth('sign-up', { firstName, email, password });
    if (result.ok) {
      router.replace('/home');
    } else {
      setStatus(result.message);
    }
  };

  return (
    <Screen title="Create Your Account">
      <Card>
        <TextInput value={firstName} onChangeText={setFirstName} placeholder="First Name" placeholderTextColor={theme.colors.muted} style={{ borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.radius.md, paddingHorizontal: 14, paddingVertical: 12, color: theme.colors.text }} />
        <TextInput value={email} onChangeText={setEmail} placeholder="Email" placeholderTextColor={theme.colors.muted} autoCapitalize="none" style={{ borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.radius.md, paddingHorizontal: 14, paddingVertical: 12, color: theme.colors.text }} />
        <TextInput value={password} onChangeText={setPassword} placeholder="Password" placeholderTextColor={theme.colors.muted} secureTextEntry style={{ borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.radius.md, paddingHorizontal: 14, paddingVertical: 12, color: theme.colors.text }} />
        <Pressable onPress={handleSubmit} style={{ backgroundColor: theme.colors.primary, borderRadius: theme.radius.md, paddingVertical: 12 }}>
          <Text style={{ color: theme.colors.white, textAlign: 'center', fontWeight: '700' }}>Create Account</Text>
        </Pressable>
        {status ? <Text style={{ color: theme.colors.muted }}>{status}</Text> : null}
      </Card>
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 6 }}>
        <Text style={{ color: theme.colors.muted }}>Already have an account?</Text>
        <Link href="/sign-in" style={{ color: theme.colors.primary, fontWeight: '700' }}>Log In</Link>
      </View>
    </Screen>
  );
}
