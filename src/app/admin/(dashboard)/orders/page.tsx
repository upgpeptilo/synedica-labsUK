import { createClient } from "@/lib/supabase/server";
import { formatGbpAmount } from "@/lib/currency";
import StatusSelect from "@/components/admin/StatusSelect";
import DeleteOrderButton from "@/components/admin/DeleteOrderButton";

export const metadata = { title: "Orders – Admin" };

type OrderItem = {
  title: string;
  size: string;
  variantLabel?: string;
  qty: number;
  priceGbp: number;
};

type Order = {
  id: string;
  order_number: number;
  name: string;
  email: string;
  address: string;
  payment_method: string;
  currency: string;
  items: OrderItem[];
  total: number;
  status: string;
  created_at: string;
};

export default async function OrdersPage() {
  const supabase = await createClient();
  const { data: orders, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1b6b80]">Orders</h1>

      <div className="mt-6 max-w-3xl divide-y divide-neutral-200 rounded-lg border border-neutral-200 bg-white">
        {(orders as Order[]).map((order) => (
          <details key={order.id} className="group p-4 open:bg-neutral-50 hover:bg-neutral-50">
            <summary className="flex cursor-pointer flex-wrap items-center gap-3 [&::-webkit-details-marker]:hidden">
              <span className="rounded-full bg-[#eef1fb] px-2.5 py-1 text-xs font-semibold text-[#1b6b80]">
                ORD-{String(order.order_number).padStart(4, "0")}
              </span>
              <span className="flex-1">
                <p className="font-semibold text-neutral-900">{order.name}</p>
                <p className="text-sm text-neutral-500">{order.email}</p>
              </span>
              <span className="font-semibold text-neutral-900">
                {formatGbpAmount(order.total)} {order.currency}
              </span>
              <StatusSelect id={order.id} status={order.status} />
              <span className="text-xs text-neutral-500">
                {new Date(order.created_at).toLocaleString("en-GB")}
              </span>
            </summary>

            <div className="mt-4 space-y-3 border-t border-neutral-200 pt-4 text-sm">
              <p>
                <span className="font-semibold text-neutral-700">Address: </span>
                {order.address}
              </p>
              <p>
                <span className="font-semibold text-neutral-700">Payment method: </span>
                {order.payment_method}
              </p>
              <div>
                <p className="font-semibold text-neutral-700">Items:</p>
                <ul className="mt-1 list-inside list-disc text-neutral-600">
                  {order.items.map((item, i) => (
                    <li key={i}>
                      {item.title}
                      {item.variantLabel ? ` (${item.variantLabel})` : ""}
                      {item.size ? ` (${item.size})` : ""} x{item.qty} —{" "}
                      {formatGbpAmount(item.priceGbp * item.qty)}
                    </li>
                  ))}
                </ul>
              </div>
              <DeleteOrderButton id={order.id} />
            </div>
          </details>
        ))}
        {orders.length === 0 && <p className="p-4 text-sm text-neutral-500">No orders yet.</p>}
      </div>
    </div>
  );
}
