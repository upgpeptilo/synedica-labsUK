import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminMobileNav from "@/components/admin/AdminMobileNav";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { count } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending");
  const pendingOrders = count ?? 0;

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50 md:flex-row">
      <AdminMobileNav pendingOrders={pendingOrders} />
      <AdminSidebar pendingOrders={pendingOrders} />
      <div className="flex-1 px-4 py-6 md:px-8 md:py-10">{children}</div>
    </div>
  );
}
