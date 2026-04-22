import { fetchCustomerInfo, fetchOfferings } from '@/integrations/billing/revenueCatClient';

export async function getBillingIntegrationState() {
  try {
    const [customerInfo, offerings] = await Promise.all([
      fetchCustomerInfo(),
      fetchOfferings()
    ]);

    return {
      ok: true,
      customerInfo,
      offerings
    };
  } catch (error) {
    return {
      ok: false,
      message: 'RevenueCat integration not ready in this environment.',
      error
    };
  }
}
