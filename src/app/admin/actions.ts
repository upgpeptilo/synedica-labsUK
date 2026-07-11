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

function readProductFields(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const price = String(formData.get("price") ?? "").trim();
  const sizes = parseSizes(String(formData.get("sizes") ?? ""));
  const form = String(formData.get("form") ?? "Lyophilized Powder").trim();
  const category = String(formData.get("category") ?? "Uncategorized").trim();
  const bestSeller = formData.get("bestSeller") === "on";
  const specs = buildSpecs(formData);
  const imageUrl = String(formData.get("imageUrl") ?? "").trim();

  return { title, price, sizes, form, category, bestSeller, specs, imageUrl };
}

export async function createProduct(formData: FormData) {
  const { title, price, sizes, form, category, bestSeller, specs, imageUrl } = readProductFields(formData);
  const supabase = await createClient();

  const { error } = await supabase.from("products").insert({
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
  });

  if (error) throw error;

  revalidatePath("/admin");
  revalidatePath("/products");
  revalidatePath("/");
  redirect("/admin");
}

export async function updateProduct(id: string, formData: FormData) {
  const { title, price, sizes, form, category, bestSeller, specs, imageUrl } = readProductFields(formData);
  const supabase = await createClient();

  const update: Record<string, unknown> = {
    title,
    price,
    sizes,
    form,
    category,
    best_seller: bestSeller,
    specs,
  };
  if (imageUrl) {
    update.image300 = imageUrl;
    update.image600 = imageUrl;
  }

  const { error } = await supabase.from("products").update(update).eq("id", id);
  if (error) throw error;

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

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
