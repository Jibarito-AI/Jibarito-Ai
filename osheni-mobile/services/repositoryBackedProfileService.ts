import { fetchCurrentUser } from '@/repositories/userRepository';

export async function getRepositoryBackedProfileViewModel() {
  const user = await fetchCurrentUser();

  return {
    memberSince: user.createdAt,
    firstName: user.firstName,
    currentPlanLabel: user.subscriptionStatus === 'trial' ? 'Free Trial' : user.subscriptionStatus,
    language: user.language
  };
}
