export async function purchaseFirstAvailablePackage() {
  return {
    ok: false,
    message: 'In-app purchases require a production build. Not available in prototype mode.'
  };
}
