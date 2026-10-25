"use server";

import { createOrderMailer, sendOrderEmail } from "@/lib/orderEmail";
import { createClient } from "@/lib/supabase/server";

type OrderItemInput = {
  title: string;
  size: string;
  variantLabel?: string;
  qty: number;
  priceGbp: number;
};

export async function placeOrder(input: {
  name: string;
  email: string;
  phone: string;
  address: string;
  notes?: string;
  paymentMethod: string;
  items: OrderItemInput[];
  total: number;
}) {
  if (!input.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)
      || /[\r\n]/.test(input.email) || !input.phone.trim() || !input.address.trim()
      || !input.items.length || input.items.length > 100
      || !Number.isFinite(input.total) || input.total < 0
      || input.items.some((item) => !Number.isInteger(item.qty) || item.qty < 1
        || !Number.isFinite(item.priceGbp) || item.priceGbp < 0)) {
    throw new Error("Please check your order details.");
  }
  // Fail before saving if the sending account has not been configured.
  const mailer = createOrderMailer();
  const supabase = await createClient();
  // ponytail: rpc, not insert().select() — anon has no SELECT policy on orders,
  // so the RETURNING read would be blocked by RLS.
  const { data, error } = await supabase.rpc("place_order", {
    p_name: input.name,
    p_email: input.email,
    p_phone: input.phone,
    p_address: input.address,
    p_payment_method: input.paymentMethod,
    p_items: input.items,
    p_total: input.total,
  });

  if (error) throw error;
  const orderNumber = Number(data);
  let emailSent = false;
  try {
    await sendOrderEmail(mailer, orderNumber, input);
    emailSent = true;
  } catch {
    // The order already exists. Return its reference so the customer does not
    // resubmit and create duplicate orders. Never log customer data or secrets.
    console.error("Order email delivery failed", { orderNumber });
  }
  return { orderNumber, emailSent };
}
