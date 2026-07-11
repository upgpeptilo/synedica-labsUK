const FALLBACK_RATES = { EUR: 1.17, USD: 1.27 };
const TTL_MS = 60 * 60 * 1000;

// Rates are always GBP-anchored (1 GBP = rates.EUR EUR = rates.USD USD),
// regardless of what currency a price was originally entered in — cross
// rates for USD/EUR conversion are derived from these two.
export type GbpRates = { EUR: number; USD: number };

type Currency = "GBP" | "EUR" | "USD";
const SYMBOL_CURRENCY: Record<string, Currency> = { "£": "GBP", "€": "EUR", "$": "USD" };

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

// Admin prices default to USD when no currency symbol is present; £ or €
// prefixes (including legacy GBP-entered products) are still detected correctly.
function extractAmounts(price: string): { currency: Currency; amounts: number[] } {
  const symbolMatches = [...price.matchAll(/([£€$])\s?([\d,]+(?:\.\d+)?)/g)];
  if (symbolMatches.length > 0) {
    return {
      currency: SYMBOL_CURRENCY[symbolMatches[0][1]],
      amounts: symbolMatches.map((m) => parseFloat(m[2].replace(/,/g, ""))),
    };
  }
  const plain = [...price.matchAll(/([\d,]+(?:\.\d+)?)/g)].map((m) => parseFloat(m[1].replace(/,/g, "")));
  return { currency: "USD", amounts: plain };
}

function toGbp(amount: number, currency: Currency, rates: GbpRates): number {
  if (currency === "GBP") return amount;
  return amount / rates[currency];
}

export function withOtherCurrencies(price: string, rates: GbpRates): string {
  const { currency, amounts } = extractAmounts(price);
  if (amounts.length === 0) return price;

  const gbpAmounts = amounts.map((a) => toGbp(a, currency, rates));
  const group = (symbol: string, values: number[]) => values.map((v) => `${symbol}${v.toFixed(2)}`).join(" – ");

  return [
    group("£", gbpAmounts),
    group("€", gbpAmounts.map((g) => g * rates.EUR)),
    group("$", gbpAmounts.map((g) => g * rates.USD)),
  ].join(" / ");
}

export function firstGbpAmount(price: string, rates: GbpRates): number {
  const { currency, amounts } = extractAmounts(price);
  if (amounts.length === 0) return 0;
  return toGbp(amounts[0], currency, rates);
}

export function formatGbpAmount(amount: number, rates: GbpRates): string {
  return `£${amount.toFixed(2)} / €${(amount * rates.EUR).toFixed(2)} / $${(amount * rates.USD).toFixed(2)}`;
}
