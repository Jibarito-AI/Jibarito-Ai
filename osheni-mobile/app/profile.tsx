'use client';

import { useEffect, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { AppScreen } from '@/components/AppScreen';
import { Card } from '@/components/Card';
import { profileItems } from '@/lib/content';
import { getEditableProfile, saveEditableProfile } from '@/services/repositoryBackedEditableProfileService';
import type { SupportedLanguage, UserProfile } from '@/types/user';
import { theme } from '@/lib/theme';

export default function ProfileScreen() {
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
    setStatus('Saved');
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
        <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
          {(['en', 'es'] as SupportedLanguage[]).map((language) => (
            <Pressable key={language} onPress={() => setProfile({ ...profile, language })} style={{ borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.radius.md, paddingHorizontal: 14, paddingVertical: 10, backgroundColor: profile.language === language ? '#E6F3F3' : theme.colors.white }}>
              <Text style={{ color: theme.colors.text, fontWeight: '600' }}>{language.toUpperCase()}</Text>
            </Pressable>
          ))}
        </View>
        <Text style={{ color: theme.colors.text }}>Current plan: {profile.subscriptionStatus}</Text>
        <Pressable onPress={handleSave} style={{ backgroundColor: theme.colors.primary, borderRadius: theme.radius.md, paddingVertical: 12 }}>
          <Text style={{ color: theme.colors.white, textAlign: 'center', fontWeight: '700' }}>Save Profile</Text>
        </Pressable>
        {status ? <Text style={{ color: theme.colors.muted }}>{status}</Text> : null}
      </Card>

      {profileItems.map((item) => (
        <Card key={item}>
          <Text style={{ color: theme.colors.text, fontWeight: '600' }}>{item}</Text>
        </Card>
      ))}
    </AppScreen>
  );
}
