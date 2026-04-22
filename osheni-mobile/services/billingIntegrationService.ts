import { fetchCustomerInfo, fetchOfferings } from '@/integrations/billing/revenueCatClient';

export async function getBillingIntegrationState() {
  try {
    const [customerInfo, offerings] = await Promise.all([
      fetchCustomerInfo(),
      fetchOfferings()
    ]);

    const currentOffering = offerings?.current;
    const packages = currentOffering?.availablePackages ?? [];

    return {
      ok: true,
      customerInfo,
      offerings,
      summary: {
        activeEntitlements: Object.keys(customerInfo?.entitlements?.active ?? {}),
        currentOfferingIdentifier: currentOffering?.identifier ?? null,
        packageCount: packages.length,
        packageLabels: packages.map((pkg: any) => pkg.identifier)
      }
    };
  } catch (error) {
    return {
      ok: false,
      message: 'RevenueCat integration not ready in this environment.',
      error
    };
  }
}
