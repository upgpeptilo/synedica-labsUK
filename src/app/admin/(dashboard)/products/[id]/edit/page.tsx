import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { getProductById } from "@/lib/products";
import { getGbpRates } from "@/lib/currency";
import { updateProduct } from "../../../../actions";

export const metadata = { title: "Edit Product – Admin" };

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, rates] = await Promise.all([getProductById(id), getGbpRates()]);
  if (!product) notFound();

  return (
    <div className="max-w-2xl">
      <ProductForm
        product={product}
        action={updateProduct.bind(null, id)}
        submitLabel="Save Changes"
        cancelHref="/admin/products"
        rates={rates}
      />
    </div>
  );
}
