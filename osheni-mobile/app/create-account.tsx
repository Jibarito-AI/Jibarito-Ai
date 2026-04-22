import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Screen } from '@/components/Screen';
import { Card } from '@/components/Card';
import { theme } from '@/lib/theme';

export default function CreateAccountScreen() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async () => {
    if (!firstName.trim()) { setStatus('Please enter your first name.'); return; }
    if (!email.trim()) { setStatus('Please enter your email.'); return; }
    if (password.length < 6) { setStatus('Password must be at least 6 characters.'); return; }
    setStatus('Creating account...');
    await new Promise((r) => setTimeout(r, 800));
    await AsyncStorage.setItem('osheni_logged_in', 'true');
    router.replace('/home');
  };

  return (
    <Screen title="Create Your Account">
      <Card>
        <TextInput
          value={firstName}
          onChangeText={setFirstName}
          placeholder="First Name"
          placeholderTextColor={theme.colors.muted}
          style={{ borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.radius.md, paddingHorizontal: 14, paddingVertical: 12, color: theme.colors.text }}
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor={theme.colors.muted}
          autoCapitalize="none"
          keyboardType="email-address"
          style={{ borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.radius.md, paddingHorizontal: 14, paddingVertical: 12, color: theme.colors.text }}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor={theme.colors.muted}
          secureTextEntry
          style={{ borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.radius.md, paddingHorizontal: 14, paddingVertical: 12, color: theme.colors.text }}
        />
        <Pressable
          onPress={handleSubmit}
          style={{ backgroundColor: theme.colors.primary, borderRadius: theme.radius.md, paddingVertical: 12 }}
        >
          <Text style={{ color: theme.colors.white, textAlign: 'center', fontWeight: '700' }}>Create Account</Text>
        </Pressable>
        {status ? <Text style={{ color: theme.colors.muted, textAlign: 'center' }}>{status}</Text> : null}
      </Card>
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 6 }}>
        <Text style={{ color: theme.colors.muted }}>Already have an account?</Text>
        <Link href="/sign-in" style={{ color: theme.colors.primary, fontWeight: '700' }}>Log In</Link>
      </View>
    </Screen>
  );
}
