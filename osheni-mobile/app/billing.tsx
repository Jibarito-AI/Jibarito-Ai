import { Text, View } from 'react-native';
import { AppScreen } from '@/components/AppScreen';
import { Badge } from '@/components/Badge';
import { Card } from '@/components/Card';
import { theme } from '@/lib/theme';

export default function BillingScreen() {
  return (
    <AppScreen title="Subscription & Billing">
      <Card>
        <Badge label="Free Trial" />
        <Text style={{ color: theme.colors.text, fontSize: 20, fontWeight: '700' }}>14-Day Trial Active</Text>
        <Text style={{ color: theme.colors.muted }}>9 days remaining</Text>
      </Card>

      <Card>
        <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 18 }}>Choose Your Plan</Text>
        <View style={{ gap: theme.spacing.sm }}>
          <View style={{ borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.radius.md, padding: theme.spacing.md }}>
            <Text style={{ color: theme.colors.text, fontWeight: '700' }}>Annual Plan</Text>
            <Text style={{ color: theme.colors.muted }}>$89/year • Save $30+</Text>
          </View>
          <View style={{ borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.radius.md, padding: theme.spacing.md }}>
            <Text style={{ color: theme.colors.text, fontWeight: '700' }}>Monthly Plan</Text>
            <Text style={{ color: theme.colors.muted }}>$9.99/month</Text>
          </View>
        </View>
      </Card>

      <Card>
        <Text style={{ color: theme.colors.text, fontWeight: '700' }}>Prototype note</Text>
        <Text style={{ color: theme.colors.text }}>This screen is ready for RevenueCat wiring later.</Text>
      </Card>
    </AppScreen>
  );
}
