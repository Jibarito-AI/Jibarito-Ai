import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';
import { theme } from '@/lib/theme';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const loggedIn = await AsyncStorage.getItem('osheni_logged_in');
      const onboarded = await AsyncStorage.getItem('osheni_onboarded');
      if (loggedIn === 'true') {
        router.replace('/home');
      } else if (onboarded === 'true') {
        router.replace('/sign-in');
      } else {
        router.replace('/onboarding');
      }
    })();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
}
