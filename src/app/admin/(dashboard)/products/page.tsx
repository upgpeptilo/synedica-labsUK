import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/products";
import { deleteProduct } from "../../actions";

export const metadata = { title: "All Products – Admin" };

export default async function AllProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1b6b80]">All Products</h1>

      <div className="mt-6 max-w-3xl divide-y divide-neutral-200 rounded-lg border border-neutral-200 bg-white">
        {products.map((product) => (
          <div key={product.id} className="flex items-center gap-4 p-4">
            <Image
              src={product.image300}
              alt={product.title}
              width={60}
              height={60}
              className="rounded border border-neutral-200 object-contain"
            />
            <div className="flex-1">
              <p className="font-semibold text-neutral-900">{product.title}</p>
              <p className="text-sm text-neutral-500">{product.price}</p>
            </div>
            <Link href={`/admin/products/${product.id}/edit`} className="text-sm text-[#1b6b80] underline">
              Edit
            </Link>
            <form action={deleteProduct.bind(null, product.id)}>
              <button type="submit" className="text-sm text-red-600 underline">
                Delete
              </button>
            </form>
          </div>
        ))}
        {products.length === 0 && <p className="p-4 text-sm text-neutral-500">No products yet.</p>}
      </div>
    </div>
  );
}
