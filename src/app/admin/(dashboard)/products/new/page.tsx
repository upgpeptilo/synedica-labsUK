import ProductForm from "@/components/admin/ProductForm";
import { getGbpRates } from "@/lib/currency";
import { createProduct } from "../../../actions";

export const metadata = { title: "Add Product – Admin" };

export default async function NewProductPage() {
  const rates = await getGbpRates();
  return (
    <div className="max-w-2xl">
      <ProductForm action={createProduct} submitLabel="Create Product" cancelHref="/admin/products" rates={rates} />
    </div>
  );
}
