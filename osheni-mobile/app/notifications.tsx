import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { AppScreen } from '@/components/AppScreen';
import { Card } from '@/components/Card';
import { getNotificationSettings } from '@/services/notificationService';
import { theme } from '@/lib/theme';

type Settings = Awaited<ReturnType<typeof getNotificationSettings>>;

export default function NotificationsScreen() {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    getNotificationSettings().then(setSettings);
  }, []);

  const togglePreference = (key: string) => {
    if (!settings) return;
    setSettings({
      ...settings,
      preferences: settings.preferences.map((p) =>
        p.key === key ? { ...p, enabled: !p.enabled } : p
      ),
    });
  };

  if (!settings) {
    return (
      <AppScreen title="Notifications">
        <Card><Text style={{ color: theme.colors.text }}>Loading...</Text></Card>
      </AppScreen>
    );
  }

  return (
    <AppScreen title="Notifications">
      <Text style={{ color: theme.colors.muted, paddingHorizontal: 4, marginBottom: 4 }}>
        Tap any setting to toggle it on or off.
      </Text>
      {settings.preferences.map((setting) => (
        <Pressable
          key={setting.key}
          onPress={() => togglePreference(setting.key)}
          style={({ pressed }) => ({
            backgroundColor: pressed ? '#f0f0f0' : theme.colors.white,
            borderRadius: theme.radius.md,
            padding: theme.spacing.md,
            borderWidth: 1,
            borderColor: theme.colors.border,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          })}
        >
          <Text style={{ color: theme.colors.text, fontWeight: '600', flex: 1 }}>{setting.label}</Text>
          <View style={{
            backgroundColor: setting.enabled ? theme.colors.primary : '#ccc',
            borderRadius: 12,
            paddingHorizontal: 12,
            paddingVertical: 4,
          }}>
            <Text style={{ color: theme.colors.white, fontWeight: '700', fontSize: 12 }}>
              {setting.enabled ? 'ON' : 'OFF'}
            </Text>
          </View>
        </Pressable>
      ))}
      <Card>
        <Text style={{ color: theme.colors.text, fontWeight: '700' }}>Quiet Hours</Text>
        <Text style={{ color: theme.colors.muted }}>No notifications between these hours</Text>
        <Text style={{ color: theme.colors.text, fontSize: 18, fontWeight: '600', marginTop: 4 }}>
          {settings.quietHours.start} – {settings.quietHours.end}
        </Text>
      </Card>
    </AppScreen>
  );
}
