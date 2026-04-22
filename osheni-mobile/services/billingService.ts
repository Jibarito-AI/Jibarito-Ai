import type { BillingState, SubscriptionPlan } from '@/types/subscription';

export const availablePlans: SubscriptionPlan[] = [
  { id: 'annual', name: 'Annual Plan', interval: 'annual', priceLabel: '$89/year', recommended: true },
  { id: 'monthly', name: 'Monthly Plan', interval: 'monthly', priceLabel: '$9.99/month' }
];

export async function getBillingState(): Promise<BillingState> {
  return {
    currentPlan: undefined,
    trialDaysRemaining: 9,
    isActive: true
  };
}
