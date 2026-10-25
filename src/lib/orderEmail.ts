import nodemailer, { type Transporter } from "nodemailer";

const MAILBOX = "info@synedicalabs.uk";

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

export function createOrderMailer() {
  const password = process.env.SMTP_PASSWORD;
  if (!password) throw new Error("Order email is not configured.");
  return nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: { user: MAILBOX, pass: password },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    disableFileAccess: true,
    disableUrlAccess: true,
  });
}

export async function sendOrderEmail(mailer: Transporter, orderNumber: number, order: EmailOrder) {
  const money = (value: number) => new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(value);
  const text = [
    `New Synedica Labs order #${orderNumber}`,
    "Payment status: awaiting payment confirmation",
    "",
    `Customer: ${order.name}`,
    `Email: ${order.email}`,
    `Phone: ${order.phone}`,
    `Delivery address: ${order.address}`,
    `Payment method: ${order.paymentMethod}`,
    "",
    "Items:",
    ...order.items.map((item) => `${item.title}${item.size ? ` — ${item.size}` : ""}${item.variantLabel ? ` — ${item.variantLabel}` : ""} | Qty ${item.qty} | ${money(item.priceGbp)} each | ${money(item.priceGbp * item.qty)}`),
    "",
    `Total: ${money(order.total)}`,
    `Order notes: ${order.notes?.trim() || "None"}`,
    "",
    "This order has been saved in the site admin. Verify payment before dispatch.",
  ].join("\n");
  const result = await mailer.sendMail({
    from: { name: "Synedica Labs Orders", address: MAILBOX },
    to: MAILBOX,
    replyTo: { name: order.name.replace(/[\r\n]/g, " "), address: order.email },
    subject: `New Synedica Labs order #${orderNumber}`,
    text,
    messageId: `<synedica-order-${orderNumber}@synedicalabs.uk>`,
  });
  if (!result.accepted?.length) throw new Error("Order notification was not accepted by the mail server.");
}
