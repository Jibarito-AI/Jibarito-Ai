import { env } from '@/lib/env';
import type { IntegrationHealth } from '@/types/integration';

export async function listIntegrationHealth(): Promise<IntegrationHealth[]> {
  return [
    {
      provider: 'zoom',
      configured: true,
      note: 'Prototype provider enabled through session service placeholders.'
    },
    {
      provider: 'other',
      configured: Boolean(env.appEnv),
      note: 'Additional providers can be added under integrations/ later.'
    }
  ];
}
