import { fetchProfile, persistProfile } from '@/repositories/profileRepository';
import type { SupportedLanguage, UserProfile } from '@/types/user';

export async function getEditableProfile(): Promise<UserProfile> {
  return fetchProfile();
}

export async function saveEditableProfile(profile: UserProfile): Promise<UserProfile> {
  return persistProfile(profile);
}

export function updateProfileDraft(profile: UserProfile, updates: Partial<Pick<UserProfile, 'firstName' | 'email' | 'language'>>): UserProfile {
  return {
    ...profile,
    firstName: updates.firstName ?? profile.firstName,
    email: updates.email ?? profile.email,
    language: (updates.language as SupportedLanguage | undefined) ?? profile.language
  };
}
