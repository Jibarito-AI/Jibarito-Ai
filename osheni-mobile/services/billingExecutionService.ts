import { purchaseFirstAvailablePackage } from '@/integrations/billing/revenueCatPurchaseClient';

export async function runPrototypePurchaseExecution() {
  try {
    const result = await purchaseFirstAvailablePackage();

    if (!result.ok) {
      return result;
    }

    return {
      ok: true,
      message: `Ready to execute purchase for package: ${result.packageIdentifier}`,
      offeringIdentifier: result.offeringIdentifier,
      packageIdentifier: result.packageIdentifier
    };
  } catch {
    return {
      ok: false,
      message: 'Purchase execution unavailable in this environment. Use a configured development build with RevenueCat.'
    };
  }
}
