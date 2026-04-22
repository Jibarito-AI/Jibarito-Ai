'use client';

import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { AppScreen } from '@/components/AppScreen';
import { Badge } from '@/components/Badge';
import { Card } from '@/components/Card';
import { getBillingIntegrationState } from '@/services/billingIntegrationService';
import { runPrototypePurchaseAction } from '@/services/billingPurchaseService';
import { availablePlans, getBillingState } from '@/services/billingService';
import { theme } from '@/lib/theme';

type BillingIntegrationState = Awaited<ReturnType<typeof getBillingIntegrationState>> | null;
type BillingState = Awaited<ReturnType<typeof getBillingState>> | null;

export default function BillingScreen() {
  const [billing, setBilling] = useState<BillingState>(null);
  const [integration, setIntegration] = useState<BillingIntegrationState>(null);
  const [purchaseStatus, setPurchaseStatus] = useState('');

  useEffect(() => {
    (async () => {
      const [billingState, integrationState] = await Promise.all([
        getBillingState(),
        getBillingIntegrationState()
      ]);
      setBilling(billingState);
      setIntegration(integrationState);
    })();
  }, []);

  const handlePurchase = async () => {
    setPurchaseStatus('Checking purchase options...');
    const result = await runPrototypePurchaseAction();
    setPurchaseStatus(result.message);
  };

  if (!billing || !integration) {
    return (
      <AppScreen title="Subscription & Billing">
        <Card>
          <Text style={{ color: theme.colors.text }}>Loading billing...</Text>
        </Card>
      </AppScreen>
    );
  }

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
        <Pressable onPress={handlePurchase} style={{ backgroundColor: theme.colors.primary, borderRadius: theme.radius.md, paddingVertical: 12, paddingHorizontal: 14 }}>
          <Text style={{ color: theme.colors.white, textAlign: 'center', fontWeight: '700' }}>Continue to Purchase</Text>
        </Pressable>
        {purchaseStatus ? <Text style={{ color: theme.colors.muted }}>{purchaseStatus}</Text> : null}
      </Card>

      <Card>
        <Text style={{ color: theme.colors.text, fontWeight: '700' }}>Billing Integration</Text>
        <Text style={{ color: theme.colors.text }}>{integration.ok ? 'RevenueCat scaffold is connected.' : 'RevenueCat integration not ready in this environment.'}</Text>
        {!integration.ok && integration.message ? <Text style={{ color: theme.colors.muted }}>{integration.message}</Text> : null}
        {integration.ok ? (
          <View style={{ gap: 6 }}>
            <Text style={{ color: theme.colors.text }}>Current offering: {integration.summary?.currentOfferingIdentifier ?? 'None'}</Text>
            <Text style={{ color: theme.colors.text }}>Available packages: {integration.summary?.packageCount ?? 0}</Text>
            <Text style={{ color: theme.colors.text }}>Package IDs: {(integration.summary?.packageLabels ?? []).join(', ') || 'None'}</Text>
            <Text style={{ color: theme.colors.text }}>Active entitlements: {(integration.summary?.activeEntitlements ?? []).join(', ') || 'None'}</Text>
          </View>
        ) : null}
      </Card>
    </AppScreen>
  );
}
