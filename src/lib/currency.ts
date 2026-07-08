const FALLBACK_RATES = { EUR: 1.17, USD: 1.27 };
const TTL_MS = 60 * 60 * 1000;

export type GbpRates = { EUR: number; USD: number };

let cached: { rates: GbpRates; ts: number } | null = null;

export async function getGbpRates(): Promise<GbpRates> {
  if (cached && Date.now() - cached.ts < TTL_MS) return cached.rates;

  try {
    const res = await fetch("https://api.frankfurter.app/latest?from=GBP&to=EUR,USD", {
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    const { EUR, USD } = data?.rates ?? {};
    if (typeof EUR === "number" && typeof USD === "number") {
      cached = { rates: { EUR, USD }, ts: Date.now() };
      return cached.rates;
    }
  } catch {
    // ponytail: network hiccup, fall back to last known/hardcoded rates
  }
  return cached?.rates ?? FALLBACK_RATES;
}

function extractGbpAmounts(priceGbp: string): number[] {
  return [...priceGbp.matchAll(/£\s?([\d,]+(?:\.\d+)?)/g)].map((m) =>
    parseFloat(m[1].replace(/,/g, ""))
  );
}

export function withOtherCurrencies(priceGbp: string, rates: GbpRates): string {
  const amounts = extractGbpAmounts(priceGbp);
  if (amounts.length === 0) return priceGbp;

  const eurParts = amounts.map((n) => `€${(n * rates.EUR).toFixed(2)}`).join(" – ");
  const usdParts = amounts.map((n) => `$${(n * rates.USD).toFixed(2)}`).join(" – ");
  return `${priceGbp} / ${eurParts} / ${usdParts}`;
}

export function firstGbpAmount(priceGbp: string): number {
  return extractGbpAmounts(priceGbp)[0] ?? 0;
}

export function formatGbpAmount(amount: number, rates: GbpRates): string {
  return `£${amount.toFixed(2)} / €${(amount * rates.EUR).toFixed(2)} / $${(amount * rates.USD).toFixed(2)}`;
}
