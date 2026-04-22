import { useEffect, useState } from 'react';
import { Alert, Pressable, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { AppScreen } from '@/components/AppScreen';
import { Card } from '@/components/Card';
import { getEditableProfile, saveEditableProfile } from '@/services/repositoryBackedEditableProfileService';
import type { SupportedLanguage, UserProfile } from '@/types/user';
import { theme } from '@/lib/theme';

const menuItems = [
  { label: 'Subscription & Billing', route: '/billing' },
  { label: 'Notifications', route: '/notifications' },
  { label: 'Help & Support', route: '/help' },
  { label: 'Progress & Insights', route: '/progress' },
  { label: 'Log Out', route: null },
];

export default function ProfileScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    (async () => {
      const loaded = await getEditableProfile();
      setProfile(loaded);
    })();
  }, []);

  const handleSave = async () => {
    if (!profile) return;
    setStatus('Saving...');
    const saved = await saveEditableProfile(profile);
    setProfile(saved);
    setStatus('Saved ✓');
    setTimeout(() => setStatus(''), 2000);
  };

  const handleMenuItem = (item: typeof menuItems[0]) => {
    if (item.label === 'Log Out') {
      Alert.alert('Log Out', 'Are you sure you want to log out?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log Out', style: 'destructive', onPress: () => router.replace('/auth' as any) },
      ]);
      return;
    }
    if (item.route) {
      router.push(item.route as any);
    }
  };

  if (!profile) {
    return (
      <AppScreen title="Profile & Settings">
        <Card>
          <Text style={{ color: theme.colors.text }}>Loading profile...</Text>
        </Card>
      </AppScreen>
    );
  }

  return (
    <AppScreen title="Profile & Settings">
      <Card>
        <Text style={{ color: theme.colors.muted }}>Member since {profile.createdAt.slice(0, 10)}</Text>
        <TextInput
          value={profile.firstName}
          onChangeText={(value) => setProfile({ ...profile, firstName: value })}
          placeholder="First Name"
          placeholderTextColor={theme.colors.muted}
          style={{ borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.radius.md, paddingHorizontal: 14, paddingVertical: 12, color: theme.colors.text }}
        />
        <TextInput
          value={profile.email}
          onChangeText={(value) => setProfile({ ...profile, email: value })}
          placeholder="Email"
          placeholderTextColor={theme.colors.muted}
          autoCapitalize="none"
          style={{ borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.radius.md, paddingHorizontal: 14, paddingVertical: 12, color: theme.colors.text }}
        />
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {(['en', 'es'] as SupportedLanguage[]).map((language) => (
            <Pressable
              key={language}
              onPress={() => setProfile({ ...profile, language })}
              style={{
                borderWidth: 1,
                borderColor: profile.language === language ? theme.colors.primary : theme.colors.border,
                borderRadius: theme.radius.md,
                paddingHorizontal: 20,
                paddingVertical: 10,
                backgroundColor: profile.language === language ? theme.colors.primary : theme.colors.white,
              }}
            >
              <Text style={{ color: profile.language === language ? theme.colors.white : theme.colors.text, fontWeight: '700' }}>
                {language.toUpperCase()}
              </Text>
            </Pressable>
          ))}
        </View>
        <Text style={{ color: theme.colors.muted }}>Plan: {profile.subscriptionStatus}</Text>
        <Pressable onPress={handleSave} style={{ backgroundColor: theme.colors.primary, borderRadius: theme.radius.md, paddingVertical: 12 }}>
          <Text style={{ color: theme.colors.white, textAlign: 'center', fontWeight: '700' }}>Save Profile</Text>
        </Pressable>
        {status ? <Text style={{ color: theme.colors.primary, textAlign: 'center', fontWeight: '600' }}>{status}</Text> : null}
      </Card>

      <View style={{ gap: theme.spacing.sm }}>
        {menuItems.map((item) => (
          <Pressable
            key={item.label}
            onPress={() => handleMenuItem(item)}
            style={({ pressed }) => ({
              backgroundColor: pressed ? '#f0f0f0' : theme.colors.white,
              borderRadius: theme.radius.md,
              padding: theme.spacing.md,
              borderWidth: 1,
              borderColor: item.label === 'Log Out' ? '#ffcccc' : theme.colors.border,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            })}
          >
            <Text style={{ color: item.label === 'Log Out' ? '#cc0000' : theme.colors.text, fontWeight: '600' }}>
              {item.label}
            </Text>
            {item.route ? <Text style={{ color: theme.colors.muted }}>›</Text> : null}
          </Pressable>
        ))}
      </View>
    </AppScreen>
  );
}
