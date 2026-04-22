import { useState } from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { theme } from '@/lib/theme';

type Language = 'en' | 'es';
type Goal = string;
type ExperienceLevel = string;
type SessionTime = string;

const goals = ['Reduce stress', 'Better sleep', 'Manage anxiety', 'Build mindfulness', 'Emotional healing', 'Daily calm'];
const experienceLevels = ['Complete beginner', 'Some experience', 'Regular meditator', 'Advanced practitioner'];
const sessionTimes = ['Early morning (5–7 AM)', 'Morning (7–9 AM)', 'Midday (11 AM–1 PM)', 'Afternoon (3–5 PM)', 'Evening (7–9 PM)', 'Late night (9 PM+)'];

export default function OnboardingScreen() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [language, setLanguage] = useState<Language>('en');
  const [selectedGoals, setSelectedGoals] = useState<Goal[]>([]);
  const [experience, setExperience] = useState<ExperienceLevel>('');
  const [selectedTimes, setSelectedTimes] = useState<SessionTime[]>([]);

  const totalSteps = 6;

  const toggleGoal = (goal: Goal) => {
    setSelectedGoals((prev) => prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]);
  };

  const toggleTime = (time: SessionTime) => {
    setSelectedTimes((prev) => prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]);
  };

  const next = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      router.replace('/home' as any);
    }
  };

  const back = () => {
    if (step > 0) setStep(step - 1);
  };

  const canContinue = () => {
    if (step === 3) return selectedGoals.length > 0;
    if (step === 4) return experience !== '';
    if (step === 5) return selectedTimes.length > 0;
    return true;
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <View style={{ alignItems: 'center', gap: 16 }}>
            <Text style={{ fontSize: 64 }}>🌿</Text>
            <Text style={{ fontSize: 32, fontWeight: '700', color: theme.colors.text, textAlign: 'center' }}>
              Welcome to Osheni
            </Text>
            <Text style={{ color: theme.colors.muted, textAlign: 'center', fontSize: 16, lineHeight: 24 }}>
              Your space for meditation, healing, and daily calm. Let's get you set up in just a minute.
            </Text>
          </View>
        );

      case 1:
        return (
          <View style={{ gap: 16 }}>
            <Text style={{ fontSize: 24, fontWeight: '700', color: theme.colors.text }}>Choose your language</Text>
            <Text style={{ color: theme.colors.muted }}>You can change this anytime in Profile.</Text>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              {(['en', 'es'] as Language[]).map((lang) => (
                <Pressable
                  key={lang}
                  onPress={() => setLanguage(lang)}
                  style={{
                    flex: 1,
                    borderWidth: 2,
                    borderColor: language === lang ? theme.colors.primary : theme.colors.border,
                    borderRadius: theme.radius.md,
                    padding: 20,
                    alignItems: 'center',
                    backgroundColor: language === lang ? '#f0f8ff' : theme.colors.white,
                  }}
                >
                  <Text style={{ fontSize: 32 }}>{lang === 'en' ? '🇺🇸' : '🇲🇽'}</Text>
                  <Text style={{ fontWeight: '700', color: theme.colors.text, marginTop: 8 }}>
                    {lang === 'en' ? 'English' : 'Español'}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        );

      case 2:
        return (
          <View style={{ gap: 16 }}>
            <Text style={{ fontSize: 24, fontWeight: '700', color: theme.colors.text }}>Your free trial</Text>
            <View style={{ backgroundColor: '#f0f8ff', borderRadius: theme.radius.lg, padding: 20, gap: 12 }}>
              <Text style={{ fontSize: 20, fontWeight: '700', color: theme.colors.primary }}>7 days free</Text>
              {['Unlimited meditations', 'Live group sessions', 'Mood & journal tracking', 'Cancel anytime'].map((benefit) => (
                <View key={benefit} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <Text style={{ color: theme.colors.primary, fontSize: 18 }}>✓</Text>
                  <Text style={{ color: theme.colors.text, fontWeight: '600' }}>{benefit}</Text>
                </View>
              ))}
            </View>
            <Text style={{ color: theme.colors.muted, textAlign: 'center', fontSize: 13 }}>
              No charge until your trial ends. Manage billing anytime.
            </Text>
          </View>
        );

      case 3:
        return (
          <View style={{ gap: 16 }}>
            <Text style={{ fontSize: 24, fontWeight: '700', color: theme.colors.text }}>What brings you here?</Text>
            <Text style={{ color: theme.colors.muted }}>Select all that apply.</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
              {goals.map((goal) => (
                <Pressable
                  key={goal}
                  onPress={() => toggleGoal(goal)}
                  style={{
                    backgroundColor: selectedGoals.includes(goal) ? theme.colors.primary : '#E6F3F3',
                    borderRadius: 20,
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                  }}
                >
                  <Text style={{ color: selectedGoals.includes(goal) ? theme.colors.white : theme.colors.text, fontWeight: '600' }}>
                    {goal}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        );

      case 4:
        return (
          <View style={{ gap: 16 }}>
            <Text style={{ fontSize: 24, fontWeight: '700', color: theme.colors.text }}>Your experience level</Text>
            <Text style={{ color: theme.colors.muted }}>We'll personalize your content based on this.</Text>
            <View style={{ gap: 10 }}>
              {experienceLevels.map((level) => (
                <Pressable
                  key={level}
                  onPress={() => setExperience(level)}
                  style={{
                    borderWidth: 2,
                    borderColor: experience === level ? theme.colors.primary : theme.colors.border,
                    borderRadius: theme.radius.md,
                    padding: 16,
                    backgroundColor: experience === level ? '#f0f8ff' : theme.colors.white,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: theme.colors.text, fontWeight: '600', fontSize: 16 }}>{level}</Text>
                  {experience === level && (
                    <Text style={{ color: theme.colors.primary, fontWeight: '700' }}>✓</Text>
                  )}
                </Pressable>
              ))}
            </View>
          </View>
        );

      case 5:
        return (
          <View style={{ gap: 16 }}>
            <Text style={{ fontSize: 24, fontWeight: '700', color: theme.colors.text }}>Best times for you?</Text>
            <Text style={{ color: theme.colors.muted }}>We'll schedule live sessions around these. Select all that work.</Text>
            <View style={{ gap: 10 }}>
              {sessionTimes.map((time) => (
                <Pressable
                  key={time}
                  onPress={() => toggleTime(time)}
                  style={{
                    borderWidth: 2,
                    borderColor: selectedTimes.includes(time) ? theme.colors.primary : theme.colors.border,
                    borderRadius: theme.radius.md,
                    padding: 14,
                    backgroundColor: selectedTimes.includes(time) ? '#f0f8ff' : theme.colors.white,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: theme.colors.text, fontWeight: '600' }}>{time}</Text>
                  {selectedTimes.includes(time) && (
                    <Text style={{ color: theme.colors.primary, fontWeight: '700' }}>✓</Text>
                  )}
                </Pressable>
              ))}
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ flex: 1, padding: 24, gap: 24 }}>
        {/* Progress bar */}
        <View style={{ flexDirection: 'row', gap: 6 }}>
          {Array.from({ length: totalSteps }).map((_, i) => (
            <View
              key={i}
              style={{
                flex: 1,
                height: 4,
                borderRadius: 99,
                backgroundColor: i <= step ? theme.colors.primary : '#DCE7F3',
              }}
            />
          ))}
        </View>

        {/* Step content */}
        <View style={{ flex: 1, justifyContent: 'center' }}>
          {renderStep()}
        </View>

        {/* Navigation */}
        <View style={{ gap: 12 }}>
          <Pressable
            onPress={next}
            disabled={!canContinue()}
            style={({ pressed }) => ({
              backgroundColor: canContinue()
                ? (pressed ? theme.colors.secondary : theme.colors.primary)
                : '#ccc',
              borderRadius: theme.radius.md,
              paddingVertical: 16,
              alignItems: 'center',
            })}
          >
            <Text style={{ color: theme.colors.white, fontWeight: '700', fontSize: 17 }}>
              {step === totalSteps - 1 ? 'Get Started' : 'Continue'}
            </Text>
          </Pressable>

          {step > 0 && (
            <Pressable onPress={back} style={{ alignItems: 'center', paddingVertical: 10 }}>
              <Text style={{ color: theme.colors.muted, fontWeight: '600' }}>Back</Text>
            </Pressable>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
