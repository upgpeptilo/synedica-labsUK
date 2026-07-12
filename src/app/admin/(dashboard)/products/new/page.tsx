import ProductForm from "@/components/admin/ProductForm";
import { createProduct } from "../../../actions";

export const metadata = { title: "Add Product – Admin" };

export default function NewProductPage() {
  return (
    <div className="max-w-2xl">
      <ProductForm action={createProduct} submitLabel="Create Product" cancelHref="/admin/products" />
    </div>
  );
}
