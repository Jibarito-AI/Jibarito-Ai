import { getCurrentUser } from '@/services/userService';

export async function getProfileViewModel() {
  const user = await getCurrentUser();

  return {
    memberSince: user.createdAt,
    firstName: user.firstName,
    currentPlanLabel: user.subscriptionStatus === 'trial' ? 'Free Trial' : user.subscriptionStatus,
    language: user.language
  };
}
