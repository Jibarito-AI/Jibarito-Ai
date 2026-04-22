import { Link, usePathname } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { theme } from '@/lib/theme';

const tabs = [
  { href: '/home', label: 'Home' },
  { href: '/explore', label: 'Explore' },
  { href: '/sessions', label: 'Sessions' },
  { href: '/journal', label: 'Journal' },
  { href: '/profile', label: 'Profile' }
] as const;

export function NavTabs() {
  const pathname = usePathname();

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        backgroundColor: theme.colors.white,
        paddingVertical: 12,
        paddingHorizontal: 8
      }}
    >
      {tabs.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link key={tab.href} href={tab.href} asChild>
            <Pressable style={{ alignItems: 'center', gap: 4 }}>
              <Text style={{ color: active ? theme.colors.primary : theme.colors.muted, fontWeight: active ? '700' : '500' }}>{tab.label}</Text>
            </Pressable>
          </Link>
        );
      })}
    </View>
  );
}
