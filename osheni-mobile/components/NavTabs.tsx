import { Link, usePathname } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { theme } from '@/lib/theme';

const tabs = [
  { href: '/home', label: 'Home', icon: '🏠' },
  { href: '/explore', label: 'Explore', icon: '🔍' },
  { href: '/sessions', label: 'Sessions', icon: '🎙️' },
  { href: '/mood', label: 'Mood', icon: '💭' },
  { href: '/profile', label: 'Profile', icon: '👤' },
] as const;

export function NavTabs() {
  const pathname = usePathname();

  return (
    <View
      style={{
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        backgroundColor: theme.colors.white,
        paddingTop: 8,
        paddingBottom: 16,
        paddingHorizontal: 4,
      }}
    >
      {tabs.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link key={tab.href} href={tab.href} asChild>
            <Pressable
              style={{ flex: 1, alignItems: 'center', gap: 3, paddingVertical: 4 }}
            >
              <View
                style={{
                  width: 40,
                  height: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: active ? '#E8F4F4' : 'transparent',
                  borderRadius: 20,
                }}
              >
                <Text style={{ fontSize: 18 }}>{tab.icon}</Text>
              </View>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: active ? '700' : '400',
                  color: active ? theme.colors.primary : theme.colors.muted,
                }}
              >
                {tab.label}
              </Text>
            </Pressable>
          </Link>
        );
      })}
    </View>
  );
}
