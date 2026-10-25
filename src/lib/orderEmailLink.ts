const ORDER_EMAIL = "info@synedicalabs.uk";

type EmailOrder = {
  name: string;
  email: string;
  phone: string;
  address: string;
  notes?: string;
  paymentMethod: string;
  items: { title: string; size: string; variantLabel?: string; qty: number; priceGbp: number }[];
  total: number;
};

export function buildOrderEmailLink(orderNumber: number, order: EmailOrder) {
  const money = (value: number) => new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(value);
  const subject = `Synedica Labs order #${orderNumber}`;
  const body = [
    `Hello Synedica Labs, I would like to complete order #${orderNumber}.`,
    "",
    `Name: ${order.name}`,
    `Email: ${order.email}`,
    `Phone: ${order.phone}`,
    `Delivery address: ${order.address}`,
    `Payment method: ${order.paymentMethod}`,
    "",
    "Order items:",
    ...order.items.map((item) => `${item.title}${item.size ? ` — ${item.size}` : ""}${item.variantLabel ? ` — ${item.variantLabel}` : ""} | Qty ${item.qty} | ${money(item.priceGbp)} each | ${money(item.priceGbp * item.qty)}`),
    "",
    `Total: ${money(order.total)}`,
    `Order notes: ${order.notes?.trim() || "None"}`,
    "",
    "Please confirm availability and send the payment and delivery details.",
  ].join("\r\n");
  return `mailto:${ORDER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
