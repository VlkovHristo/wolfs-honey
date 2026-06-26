/**
 * "Build your box" bundle discount tiers, richest first. The best matching
 * tier for the total jar count applies automatically — any mix of jars counts.
 */
export const BUNDLE_TIERS = [
  { minJars: 6, rate: 0.15 },
  { minJars: 3, rate: 0.1 },
] as const;

export function bundleRate(count: number): number {
  for (const tier of BUNDLE_TIERS) {
    if (count >= tier.minJars) return tier.rate;
  }
  return 0;
}
