import Purchases from 'react-native-purchases';
import { configureRevenueCat } from '@/integrations/billing/revenueCatClient';

export async function purchaseFirstAvailablePackage() {
  await configureRevenueCat();

  const offerings = await Purchases.getOfferings();
  const current = offerings.current;
  const firstPackage = current?.availablePackages?.[0];

  if (!current || !firstPackage) {
    return {
      ok: false,
      message: 'No purchasable package is available in the current offering.'
    };
  }

  return {
    ok: true,
    message: `Purchase execution scaffold ready for package: ${firstPackage.identifier}`,
    offeringIdentifier: current.identifier,
    packageIdentifier: firstPackage.identifier,
    packageToPurchase: firstPackage
  };
}
