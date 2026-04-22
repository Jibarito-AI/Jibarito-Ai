import { ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';
import { theme } from '@/lib/theme';

export function Card({ children, style }: { children: ReactNode; style?: ViewStyle }) {
  return (
    <View
      style={[
        {
          backgroundColor: theme.colors.white,
          borderRadius: theme.radius.md,
          padding: theme.spacing.md,
          borderWidth: 1,
          borderColor: theme.colors.border,
          gap: theme.spacing.sm
        },
        style
      ]}
    >
      {children}
    </View>
  );
}
