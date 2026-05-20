export function getSiteNumber() {
  // Try NEXT_PUBLIC_ prefix first (for client-side), then fallback to SITE_NUMBER (for server-side)
  const siteNumber = process.env.NEXT_PUBLIC_SITE_NUMBER || process.env.SITE_NUMBER;
  
  console.log('getSiteNumber - Reading env:', {
    NEXT_PUBLIC_SITE_NUMBER: process.env.NEXT_PUBLIC_SITE_NUMBER,
    SITE_NUMBER: process.env.SITE_NUMBER,
    resolved: siteNumber
  });
  
  if (!siteNumber) {
    // Return default instead of throwing error to allow fallback
    console.warn('SITE_NUMBER environment variable is not set, using default: 1');
    return 1;
  }
  
  const parsed = parseInt(siteNumber, 10);
  
  if (isNaN(parsed) || parsed < 1 || parsed > 40) {
    console.warn(`SITE_NUMBER must be between 1 and 40, got: ${siteNumber}, using default: 1`);
    return 1;
  }
  
  console.log('getSiteNumber - Returning:', parsed);
  return parsed;
}
