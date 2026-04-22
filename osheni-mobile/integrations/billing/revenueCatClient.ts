import { Platform } from 'react-native';
import Purchases, { LOG_LEVEL } from 'react-native-purchases';
import { env } from '@/lib/env';

let configured = false;

export function getRevenueCatApiKey() {
  if (Platform.OS === 'ios') return env.revenueCatApiKey;
  if (Platform.OS === 'android') return env.revenueCatApiKey;
  return '';
}

export async function configureRevenueCat() {
  const apiKey = getRevenueCatApiKey();

  if (!apiKey || configured) {
    return { configured: Boolean(apiKey) };
  }

  Purchases.setLogLevel(LOG_LEVEL.VERBOSE);
  Purchases.configure({ apiKey });
  configured = true;

  return { configured: true };
}

export async function fetchCustomerInfo() {
  await configureRevenueCat();
  return Purchases.getCustomerInfo();
}

export async function fetchOfferings() {
  await configureRevenueCat();
  return Purchases.getOfferings();
}
