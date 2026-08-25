import { formatGbpAmount } from "@/lib/currency";

export const WHATSAPP_NUMBER = "447882524986";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

type OrderLineItem = {
  title: string;
  size: string;
  variantLabel?: string;
  qty: number;
  priceGbp: number;
};

export function buildWhatsAppOrderLink(items: OrderLineItem[], total: number, orderNumber?: number): string {
  const lines = items.map((item, i) => {
    const opts = [item.variantLabel, item.size].filter(Boolean).join(", ");
    return `${i + 1}. ${item.title}${opts ? ` (${opts})` : ""} x${item.qty} - ${formatGbpAmount(item.priceGbp * item.qty)}`;
  });

  const orderRef = orderNumber ? ` (ORD-${String(orderNumber).padStart(4, "0")})` : "";
  const message = [`Hi! I'd like to order${orderRef}:`, "", ...lines, "", `Total: ${formatGbpAmount(total)}`].join("\n");

  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}
