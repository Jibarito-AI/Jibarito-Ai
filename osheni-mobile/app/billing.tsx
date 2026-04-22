import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { AppScreen } from '@/components/AppScreen';
import { Card } from '@/components/Card';
import { getBillingIntegrationState } from '@/services/billingIntegrationService';
import { runPrototypePurchaseExecution } from '@/services/billingExecutionService';
import { availablePlans, getBillingState } from '@/services/billingService';
import { theme } from '@/lib/theme';

type BillingIntegrationState = Awaited<ReturnType<typeof getBillingIntegrationState>> | null;
type BillingState = Awaited<ReturnType<typeof getBillingState>> | null;

export default function BillingScreen() {
  const [billing, setBilling] = useState<BillingState>(null);
  const [integration, setIntegration] = useState<BillingIntegrationState>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [purchaseStatus, setPurchaseStatus] = useState('');

  useEffect(() => {
    (async () => {
      const [billingState, integrationState] = await Promise.all([
        getBillingState(),
        getBillingIntegrationState()
      ]);
      setBilling(billingState);
      setIntegration(integrationState);
      const recommended = availablePlans.find((p) => p.recommended);
      if (recommended) setSelectedPlanId(recommended.id);
    })();
  }, []);

  const handleSubscribe = async () => {
    if (!selectedPlanId) return;
    setPurchaseStatus('Processing...');
    const result = await runPrototypePurchaseExecution();
    setPurchaseStatus(result.message);
    setTimeout(() => setPurchaseStatus(''), 3000);
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
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <View style={{
            backgroundColor: billing.isActive ? '#d4f4dd' : '#fde8e8',
            borderRadius: 99,
            paddingHorizontal: 12,
            paddingVertical: 4,
          }}>
            <Text style={{ color: billing.isActive ? '#1a7a3a' : '#cc0000', fontWeight: '700', fontSize: 13 }}>
              {billing.isActive ? 'Active' : 'Inactive'}
            </Text>
          </View>
          <Text style={{ color: theme.colors.muted }}>
            {billing.trialDaysRemaining ?? 0} trial days remaining
          </Text>
        </View>
        <Text style={{ color: theme.colors.text, fontSize: 20, fontWeight: '700', marginTop: 4 }}>
          Your Subscription
        </Text>
      </Card>

      <Card>
        <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 18, marginBottom: 8 }}>Choose Your Plan</Text>
        <View style={{ gap: theme.spacing.sm }}>
          {availablePlans.map((plan) => (
            <Pressable
              key={plan.id}
              onPress={() => setSelectedPlanId(plan.id)}
              style={{
                borderWidth: 2,
                borderColor: selectedPlanId === plan.id ? theme.colors.primary : theme.colors.border,
                borderRadius: theme.radius.md,
                padding: theme.spacing.md,
                backgroundColor: selectedPlanId === plan.id ? '#f0f8ff' : theme.colors.white,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View>
                <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 16 }}>{plan.name}</Text>
                <Text style={{ color: theme.colors.muted }}>{plan.priceLabel}</Text>
                {plan.recommended ? (
                  <Text style={{ color: theme.colors.primary, fontWeight: '600', fontSize: 12, marginTop: 2 }}>Recommended</Text>
                ) : null}
              </View>
              <View style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: selectedPlanId === plan.id ? theme.colors.primary : theme.colors.border,
                backgroundColor: selectedPlanId === plan.id ? theme.colors.primary : 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {selectedPlanId === plan.id ? (
                  <Text style={{ color: theme.colors.white, fontSize: 14, fontWeight: '700' }}>✓</Text>
                ) : null}
              </View>
            </Pressable>
          ))}
        </View>

        <Pressable
          onPress={handleSubscribe}
          style={({ pressed }) => ({
            backgroundColor: pressed ? theme.colors.secondary : theme.colors.primary,
            borderRadius: theme.radius.md,
            paddingVertical: 14,
            paddingHorizontal: 14,
            marginTop: 4,
            opacity: selectedPlanId ? 1 : 0.5,
          })}
        >
          <Text style={{ color: theme.colors.white, textAlign: 'center', fontWeight: '700', fontSize: 16 }}>
            Subscribe Now
          </Text>
        </Pressable>
        {purchaseStatus ? (
          <Text style={{ color: theme.colors.primary, textAlign: 'center', fontWeight: '600', marginTop: 4 }}>
            {purchaseStatus}
          </Text>
        ) : null}
      </Card>

      <Card>
        <Text style={{ color: theme.colors.muted, fontSize: 13, textAlign: 'center' }}>
          Subscriptions will be processed through the App Store or Google Play at launch.
          Prototype mode — no charges will occur.
        </Text>
      </Card>
    </AppScreen>
  );
}
