"use server";

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
  paymentMethod: string;
  items: OrderItemInput[];
  total: number;
}) {
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
  return data as number;
}
