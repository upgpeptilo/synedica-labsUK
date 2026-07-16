function extractAmounts(price: string): number[] {
  return [...price.matchAll(/([\d,]+(?:\.\d+)?)/g)].map((m) => parseFloat(m[1].replace(/,/g, "")));
}

export function formatGbpAmount(amount: number): string {
  return `£${amount.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function withGbp(price: string): string {
  const amounts = extractAmounts(price);
  if (amounts.length === 0) return price;
  return amounts.map(formatGbpAmount).join(" – ");
}

export function firstGbpAmount(price: string): number {
  return extractAmounts(price)[0] ?? 0;
}
