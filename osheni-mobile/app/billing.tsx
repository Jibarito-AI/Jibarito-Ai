import { Text, View } from 'react-native';
import { AppScreen } from '@/components/AppScreen';
import { Badge } from '@/components/Badge';
import { Card } from '@/components/Card';
import { availablePlans, getBillingState } from '@/services/billingService';
import { theme } from '@/lib/theme';

const billingPromise = getBillingState();

export default async function BillingScreen() {
  const billing = await billingPromise;

  return (
    <AppScreen title="Subscription & Billing">
      <Card>
        <Badge label={billing.isActive ? 'Active' : 'Inactive'} />
        <Text style={{ color: theme.colors.text, fontSize: 20, fontWeight: '700' }}>Trial / Subscription Status</Text>
        <Text style={{ color: theme.colors.muted }}>{billing.trialDaysRemaining ?? 0} days remaining</Text>
      </Card>

      <Card>
        <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 18 }}>Choose Your Plan</Text>
        <View style={{ gap: theme.spacing.sm }}>
          {availablePlans.map((plan) => (
            <View key={plan.id} style={{ borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.radius.md, padding: theme.spacing.md }}>
              <Text style={{ color: theme.colors.text, fontWeight: '700' }}>{plan.name}</Text>
              <Text style={{ color: theme.colors.muted }}>{plan.priceLabel}{plan.recommended ? ' • Recommended' : ''}</Text>
            </View>
          ))}
        </View>
      </Card>

      <Card>
        <Text style={{ color: theme.colors.text, fontWeight: '700' }}>Prototype note</Text>
        <Text style={{ color: theme.colors.text }}>This screen is wired to a billing service and ready for RevenueCat integration later.</Text>
      </Card>
    </AppScreen>
  );
}
