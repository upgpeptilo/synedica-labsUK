import AdminProductCard from "@/components/admin/AdminProductCard";
import { getProducts } from "@/lib/products";

export const metadata = { title: "Admin – Synedica UK" };

export default async function AdminHomePage() {
  const products = await getProducts();
  const bestSellerCount = products.filter((p) => p.bestSeller).length;

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1b6b80]">Home</h1>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:max-w-md">
        <div className="rounded-lg border border-neutral-200 bg-white p-5">
          <p className="text-3xl font-bold text-[#1b6b80]">{products.length}</p>
          <p className="mt-1 text-sm text-neutral-500">Total Products</p>
        </div>
        <div className="rounded-lg border border-neutral-200 bg-white p-5">
          <p className="text-3xl font-bold text-[#1b6b80]">{bestSellerCount}</p>
          <p className="mt-1 text-sm text-neutral-500">Best Sellers</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <AdminProductCard key={product.id} product={product} />
        ))}
        {products.length === 0 && (
          <p className="text-sm text-neutral-500">No products yet.</p>
        )}
      </div>
    </div>
  );
}
