import { createClient } from "@/lib/supabase/server";
import { withGbp } from "@/lib/currency";

export type ProductSpec = {
  label: string;
  value: string;
};

export type ProductVariant = {
  id: string;
  label: string;
  priceGbp: number;
};

export type ContentSection = {
  heading: string | null;
  body: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Product = {
  id: string;
  slug: string;
  title: string;
  price: string;
  sizes: string[];
  form: string;
  image300: string;
  image600: string;
  bestSeller: boolean;
  specs: ProductSpec[];
  category: string;
  description: string;
  metaDescription: string;
  variantsLabel: string | null;
  variants: ProductVariant[];
  quickAnswer: string;
  contentSections: ContentSection[];
  faq: FaqItem[];
  authorLine: string;
  contentUpdatedAt: string | null;
};

export const storageText =
  "Storage (Lyophilized): Store at -20°C in a dry, desiccated environment. – After Reconstitution: Store reconstituted peptide at 2–8°C and use within 30 days. For long-term storage, aliquot and freeze at -20°C. Avoid repeated freeze-thaw cycles. – Reconstitution: Reconstitute in sterile bacteriostatic water or appropriate buffer depending on experimental needs.";

export const disclaimerText =
  "This product is sold strictly for in vitro research and laboratory use only. It is not for human or veterinary use. By purchasing or using this product, the buyer agrees they have read, understood and accept the Terms & Conditions of Synedica UK.";

type ProductRow = {
  id: string;
  slug: string;
  title: string;
  price: string;
  sizes: string[];
  form: string;
  image300: string;
  image600: string;
  best_seller: boolean;
  specs: ProductSpec[];
  category: string;
  description: string;
  meta_description: string;
  variants_label: string | null;
  quick_answer: string | null;
  content_sections: ContentSection[] | null;
  faq: FaqItem[] | null;
  author_line: string | null;
  content_updated_at: string | null;
};

type VariantRow = {
  id: string;
  product_id: string;
  label: string;
  price: number;
  sort_order: number;
};

function mapRow(row: ProductRow, variantRows: VariantRow[]): Product {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    price: row.price,
    sizes: row.sizes,
    form: row.form,
    image300: row.image300,
    image600: row.image600,
    bestSeller: row.best_seller,
    specs: row.specs,
    category: row.category,
    description: row.description,
    metaDescription: row.meta_description,
    variantsLabel: row.variants_label,
    variants: variantRows
      .filter((v) => v.product_id === row.id)
      .map((v) => ({ id: v.id, label: v.label, priceGbp: v.price })),
    quickAnswer: row.quick_answer ?? "",
    contentSections: row.content_sections ?? [],
    faq: row.faq ?? [],
    authorLine: row.author_line ?? "",
    contentUpdatedAt: row.content_updated_at,
  };
}

function priceWithVariants(product: Product): string {
  if (product.variants.length === 0) return withGbp(product.price);
  const prices = product.variants.map((v) => v.priceGbp);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return min === max ? `£${min.toFixed(2)}` : `£${min.toFixed(2)} – £${max.toFixed(2)}`;
}

async function getVariantsFor(productIds: string[]): Promise<VariantRow[]> {
  if (productIds.length === 0) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("product_variants")
    .select("*")
    .in("product_id", productIds)
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data as VariantRow[];
}

export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw error;
  const rows = data as ProductRow[];
  const variantRows = await getVariantsFor(rows.map((r) => r.id));
  return rows.map((row) => {
    const product = mapRow(row, variantRows);
    return { ...product, price: priceWithVariants(product) };
  });
}

export async function getProduct(slug: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("products").select("*").eq("slug", slug).maybeSingle();

  if (error) throw error;
  if (!data) return null;
  const row = data as ProductRow;
  const variantRows = await getVariantsFor([row.id]);
  const product = mapRow(row, variantRows);
  return { ...product, price: priceWithVariants(product) };
}

export async function getBestSellers(): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.bestSeller);
}

export async function getProductById(id: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("products").select("*").eq("id", id).maybeSingle();

  if (error) throw error;
  if (!data) return null;
  const row = data as ProductRow;
  const variantRows = await getVariantsFor([row.id]);
  return mapRow(row, variantRows);
}
