import { getSupabaseClient } from '@/lib/supabase';
import { submitAuth, type AuthFormData, type AuthMode } from '@/lib/auth';

export async function runPrototypeAuth(mode: AuthMode, data: AuthFormData) {
  const { configured, client } = getSupabaseClient();

  if (!configured || !client) {
    return submitAuth(mode, data);
  }

  try {
    if (mode === 'sign-in') {
      const { data: authData, error } = await client.auth.signInWithPassword({
        email: data.email,
        password: data.password
      });

      if (error) {
        return { ok: false, mode, data, message: error.message };
      }

      return { ok: true, mode, data, message: 'Signed in with Supabase.', authData };
    }

    const { data: authData, error } = await client.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          first_name: data.firstName ?? ''
        }
      }
    });

    if (error) {
      return { ok: false, mode, data, message: error.message };
    }

    return { ok: true, mode, data, message: 'Account created with Supabase.', authData };
  } catch {
    return submitAuth(mode, data);
  }
}
