import { Text, View } from 'react-native';
import { Screen } from '@/components/Screen';
import { onboardingSteps } from '@/lib/content';
import { theme } from '@/lib/theme';

export default function OnboardingScreen() {
  return (
    <Screen title="Onboarding">
      {onboardingSteps.map((step, index) => (
        <View key={step} style={{ backgroundColor: theme.colors.white, borderRadius: theme.radius.md, padding: theme.spacing.md, borderWidth: 1, borderColor: theme.colors.border }}>
          <Text style={{ color: theme.colors.text, fontWeight: '600' }}>{index + 1}. {step}</Text>
        </View>
      ))}
    </Screen>
  );
}
