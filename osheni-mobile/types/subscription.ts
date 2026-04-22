export type PlanInterval = 'monthly' | 'annual';

export type SubscriptionPlan = {
  id: string;
  name: string;
  interval: PlanInterval;
  priceLabel: string;
  recommended?: boolean;
};

export type BillingState = {
  currentPlan?: SubscriptionPlan;
  trialDaysRemaining?: number;
  isActive: boolean;
};
