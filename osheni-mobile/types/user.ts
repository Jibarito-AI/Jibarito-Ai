export type SupportedLanguage = 'en' | 'es';
export type SubscriptionStatus = 'trial' | 'active' | 'past_due' | 'canceled' | 'free';

export type UserProfile = {
  id: string;
  firstName: string;
  email: string;
  language: SupportedLanguage;
  createdAt: string;
  subscriptionStatus: SubscriptionStatus;
  trialEndDate?: string;
  streakCount?: number;
};
