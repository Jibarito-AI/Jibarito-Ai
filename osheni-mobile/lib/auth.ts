export type AuthMode = 'sign-in' | 'sign-up';

export type AuthFormData = {
  firstName?: string;
  email: string;
  password: string;
};

export async function submitAuth(mode: AuthMode, data: AuthFormData) {
  return {
    ok: true,
    mode,
    data,
    message: 'Prototype auth handler. Replace with Supabase Auth.'
  };
}
