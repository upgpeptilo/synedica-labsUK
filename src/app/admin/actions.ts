"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const FIXED_SPEC_FIELDS: [string, string][] = [
  ["specCas", "CAS Number"],
  ["specFormula", "Molecular Formula"],
  ["specWeight", "Molecular Weight"],
  ["specPurity", "Purity"],
  ["specSequence", "Peptide Sequence"],
];

function buildSpecs(formData: FormData) {
  const specs = FIXED_SPEC_FIELDS.map(([field, label]) => ({
    label,
    value: String(formData.get(field) ?? "").trim(),
  })).filter((s) => s.value);

  const extraLabels = formData.getAll("extraSpecLabel").map(String);
  const extraValues = formData.getAll("extraSpecValue").map(String);
  extraLabels.forEach((rawLabel, i) => {
    const label = rawLabel.trim();
    const value = (extraValues[i] ?? "").trim();
    if (label && value) specs.push({ label, value });
  });

  return specs;
}

function parseSizes(raw: string) {
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function buildVariants(formData: FormData) {
  const labels = formData.getAll("variantOptionLabel").map(String);
  const prices = formData.getAll("variantOptionPrice").map(String);
  const variants: { label: string; price: number }[] = [];
  labels.forEach((rawLabel, i) => {
    const label = rawLabel.trim();
    const price = parseFloat(prices[i] ?? "");
    if (label && !Number.isNaN(price)) variants.push({ label, price });
  });
  return variants;
}

function readProductFields(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const price = String(formData.get("price") ?? "").trim();
  const sizes = parseSizes(String(formData.get("sizes") ?? ""));
  const form = String(formData.get("form") ?? "Lyophilized Powder").trim();
  const category = String(formData.get("category") ?? "Uncategorized").trim();
  const bestSeller = formData.get("bestSeller") === "on";
  const specs = buildSpecs(formData);
  const imageUrl = String(formData.get("imageUrl") ?? "").trim();
  const variantsLabel = String(formData.get("variantsLabel") ?? "").trim() || null;
  const variants = buildVariants(formData);

  return { title, price, sizes, form, category, bestSeller, specs, imageUrl, variantsLabel, variants };
}

export async function createProduct(formData: FormData) {
  const { title, price, sizes, form, category, bestSeller, specs, imageUrl, variantsLabel, variants } =
    readProductFields(formData);
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .insert({
      slug: slugify(title),
      title,
      price,
      sizes,
      form,
      category,
      best_seller: bestSeller,
      specs,
      image300: imageUrl,
      image600: imageUrl,
      variants_label: variantsLabel,
    })
    .select("id")
    .single();

  if (error) throw error;

  if (variants.length > 0) {
    const { error: variantsError } = await supabase.from("product_variants").insert(
      variants.map((v, i) => ({ product_id: data.id, label: v.label, price: v.price, sort_order: i }))
    );
    if (variantsError) throw variantsError;
  }

  revalidatePath("/admin");
  revalidatePath("/products");
  revalidatePath("/");
  redirect("/admin");
}

export async function updateProduct(id: string, formData: FormData) {
  const { title, price, sizes, form, category, bestSeller, specs, imageUrl, variantsLabel, variants } =
    readProductFields(formData);
  const supabase = await createClient();

  const update: Record<string, unknown> = {
    title,
    price,
    sizes,
    form,
    category,
    best_seller: bestSeller,
    specs,
    variants_label: variantsLabel,
  };
  if (imageUrl) {
    update.image300 = imageUrl;
    update.image600 = imageUrl;
  }

  const { error } = await supabase.from("products").update(update).eq("id", id);
  if (error) throw error;

  const { error: deleteError } = await supabase.from("product_variants").delete().eq("product_id", id);
  if (deleteError) throw deleteError;

  if (variants.length > 0) {
    const { error: variantsError } = await supabase.from("product_variants").insert(
      variants.map((v, i) => ({ product_id: id, label: v.label, price: v.price, sort_order: i }))
    );
    if (variantsError) throw variantsError;
  }

  revalidatePath("/admin");
  revalidatePath("/products");
  revalidatePath("/");
  redirect("/admin");
}

export async function deleteProduct(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;

  revalidatePath("/admin");
  revalidatePath("/products");
  revalidatePath("/");
}

export async function updateOrderStatus(id: string, status: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("orders").update({ status }).eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/orders");
}

export async function deleteOrder(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("orders").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/orders");
}

export async function updateSiteSettings(formData: FormData) {
  const digits = String(formData.get("whatsappNumber") ?? "").replace(/\D/g, "");
  if (!digits) throw new Error("WhatsApp number must contain at least one digit");

  const supabase = await createClient();
  const { error } = await supabase
    .from("site_settings")
    .update({ whatsapp_number: digits })
    .eq("id", 1);
  if (error) throw error;

  revalidatePath("/how-to-pay");
  revalidatePath("/admin/settings");
  redirect("/admin/settings?saved=1");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
