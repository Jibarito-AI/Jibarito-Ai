import type { UserProfile } from '@/types/user';

const mockUser: UserProfile = {
  id: 'user_1',
  firstName: 'Christopher',
  email: 'christopher@example.com',
  language: 'en',
  createdAt: '2026-04-01T00:00:00Z',
  subscriptionStatus: 'trial',
  trialEndDate: '2026-05-01T00:00:00Z',
  streakCount: 12
};

export async function getCurrentUser(): Promise<UserProfile> {
  return mockUser;
}
