import { submitAuth, type AuthFormData, type AuthMode } from '@/services/auth';

export async function runPrototypeAuth(mode: AuthMode, data: AuthFormData) {
  return submitAuth(mode, data);
}
