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
  address: string;
  paymentMethod: string;
  items: OrderItemInput[];
  total: number;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .insert({
      name: input.name,
      email: input.email,
      address: input.address,
      payment_method: input.paymentMethod,
      currency: "GBP",
      items: input.items,
      total: input.total,
    })
    .select("order_number")
    .single();

  if (error) throw error;
  return data.order_number as number;
}
