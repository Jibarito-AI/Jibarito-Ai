import { Text } from 'react-native';
import { AppScreen } from '@/components/AppScreen';
import { Card } from '@/components/Card';
import { profileItems } from '@/lib/content';
import { getProfileViewModel } from '@/services/profileService';
import { theme } from '@/lib/theme';

const profilePromise = getProfileViewModel();

export default async function ProfileScreen() {
  const profile = await profilePromise;

  return (
    <AppScreen title="Profile & Settings">
      <Card>
        <Text style={{ color: theme.colors.muted }}>Member since {profile.memberSince.slice(0, 10)}</Text>
        <Text style={{ color: theme.colors.text, fontSize: 20, fontWeight: '700' }}>{profile.firstName}</Text>
        <Text style={{ color: theme.colors.text }}>Current plan: {profile.currentPlanLabel}</Text>
        <Text style={{ color: theme.colors.text }}>Language: {profile.language.toUpperCase()}</Text>
      </Card>

      {profileItems.map((item) => (
        <Card key={item}>
          <Text style={{ color: theme.colors.text, fontWeight: '600' }}>{item}</Text>
        </Card>
      ))}
    </AppScreen>
  );
}
