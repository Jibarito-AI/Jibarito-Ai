import { Linking } from 'react-native';

export async function tryOpenLink(url?: string | null) {
  if (!url) {
    return {
      ok: false,
      message: 'No URL available to open.'
    };
  }

  try {
    const supported = await Linking.canOpenURL(url);

    if (!supported) {
      return {
        ok: false,
        message: `URL not supported: ${url}`
      };
    }

    await Linking.openURL(url);
    return {
      ok: true,
      message: `Opened URL: ${url}`
    };
  } catch {
    return {
      ok: false,
      message: `Failed to open URL: ${url}`
    };
  }
}
