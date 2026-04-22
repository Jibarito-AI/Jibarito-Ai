import { fetchOfferings } from '@/integrations/billing/revenueCatClient';

export async function runPrototypePurchaseAction() {
  try {
    const offerings = await fetchOfferings();
    const current = offerings?.current;
    const firstPackage = current?.availablePackages?.[0];

    if (!current || !firstPackage) {
      return {
        ok: false,
        message: 'No purchasable package is available in the current offering.'
      };
    }

    return {
      ok: true,
      message: `Purchase scaffold ready for package: ${firstPackage.identifier}`,
      offeringIdentifier: current.identifier,
      packageIdentifier: firstPackage.identifier
    };
  } catch {
    return {
      ok: false,
      message: 'Purchase action unavailable in this environment. Use a configured development build with RevenueCat.'
    };
  }
}
