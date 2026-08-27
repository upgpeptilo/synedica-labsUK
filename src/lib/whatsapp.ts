import { formatGbpAmount } from "@/lib/currency";

export const DEFAULT_WHATSAPP_NUMBER = "447882524986";

export function buildWhatsAppUrl(number: string = DEFAULT_WHATSAPP_NUMBER): string {
  return `https://wa.me/${number}`;
}

type OrderLineItem = {
  title: string;
  size: string;
  variantLabel?: string;
  qty: number;
  priceGbp: number;
};

export function buildWhatsAppOrderLink(
  items: OrderLineItem[],
  total: number,
  orderNumber?: number,
  whatsappNumber: string = DEFAULT_WHATSAPP_NUMBER
): string {
  const lines = items.map((item, i) => {
    const opts = [item.variantLabel, item.size].filter(Boolean).join(", ");
    return `${i + 1}. ${item.title}${opts ? ` (${opts})` : ""} x${item.qty} - ${formatGbpAmount(item.priceGbp * item.qty)}`;
  });

  const orderRef = orderNumber ? ` (ORD-${String(orderNumber).padStart(4, "0")})` : "";
  const message = [`Hi! I'd like to order${orderRef}:`, "", ...lines, "", `Total: ${formatGbpAmount(total)}`].join("\n");

  return `${buildWhatsAppUrl(whatsappNumber)}?text=${encodeURIComponent(message)}`;
}
