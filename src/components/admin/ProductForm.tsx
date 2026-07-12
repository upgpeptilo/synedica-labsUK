"use client";

import { useState } from "react";
import ImageUploader from "./ImageUploader";
import type { Product, ProductSpec, ProductVariant } from "@/lib/products";
import { withGbp } from "@/lib/currency";
import { PEPTIDE_TEMPLATES } from "@/lib/peptideTemplates";

const KNOWN_SPECS = ["CAS Number", "Molecular Formula", "Molecular Weight", "Purity", "Peptide Sequence"];
const CATEGORIES = ["Anabolic", "Cosmetic", "Recovery", "Weight Loss", "Uncategorized"];
const FORMS = ["Injection Pen Kit", "Injection Kit", "Pen Kit", "Nasal Spray", "Lyophilized Powder"];
const inputClass =
  "mt-1.5 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-neutral-900 focus:border-[#1b6b80] focus:outline-none";

function findSpec(specs: ProductSpec[] | undefined, label: string) {
  return specs?.find((s) => s.label.toLowerCase() === label.toLowerCase())?.value ?? "";
}

export default function ProductForm({
  product,
  action,
  submitLabel,
  cancelHref = "/admin",
}: {
  product?: Product;
  action: (formData: FormData) => void;
  submitLabel: string;
  cancelHref?: string;
}) {
  const initialExtraSpecs = product?.specs.filter((s) => !KNOWN_SPECS.includes(s.label)) ?? [];
  const initialVariants = product?.variants ?? [];
  const initialVariantsLabel = product?.variantsLabel ?? "";
  const initialPrice = product?.price ?? "";
  const initialForm = product?.form ?? "Lyophilized Powder";
  const initialTitle = product?.title ?? "";
  const initialSizes = product?.sizes.join(", ") ?? "";
  const initialCategory = product?.category ?? "Uncategorized";
  const initialFormValue = FORMS.includes(initialForm) ? initialForm : "Other";
  const initialFormCustom = FORMS.includes(initialForm) ? "" : initialForm;
  const initialCas = findSpec(product?.specs, "CAS Number");
  const initialFormula = findSpec(product?.specs, "Molecular Formula");
  const initialWeight = findSpec(product?.specs, "Molecular Weight");
  const initialPurity = findSpec(product?.specs, "Purity");
  const initialSequence = findSpec(product?.specs, "Peptide Sequence");

  const [extraSpecs, setExtraSpecs] = useState<ProductSpec[]>(initialExtraSpecs);
  const [variants, setVariants] = useState<Pick<ProductVariant, "label" | "priceGbp">[]>(initialVariants);
  const [variantsLabel, setVariantsLabel] = useState(initialVariantsLabel);
  const [priceInput, setPriceInput] = useState(initialPrice);
  const pricePreview = withGbp(priceInput);

  const [quickFill, setQuickFill] = useState("");
  const [title, setTitle] = useState(initialTitle);
  const [sizes, setSizes] = useState(initialSizes);
  const [category, setCategory] = useState(initialCategory);
  const [form, setForm] = useState(initialFormValue);
  const [formCustom, setFormCustom] = useState(initialFormCustom);
  const [cas, setCas] = useState(initialCas);
  const [formula, setFormula] = useState(initialFormula);
  const [weight, setWeight] = useState(initialWeight);
  const [purity, setPurity] = useState(initialPurity);
  const [sequence, setSequence] = useState(initialSequence);

  function resetAll() {
    setQuickFill("");
    setTitle(initialTitle);
    setPriceInput(initialPrice);
    setSizes(initialSizes);
    setCategory(initialCategory);
    setForm(initialFormValue);
    setFormCustom(initialFormCustom);
    setCas(initialCas);
    setFormula(initialFormula);
    setWeight(initialWeight);
    setPurity(initialPurity);
    setSequence(initialSequence);
    setExtraSpecs(initialExtraSpecs);
    setVariants(initialVariants);
    setVariantsLabel(initialVariantsLabel);
  }

  function applyQuickFill(id: string) {
    setQuickFill(id);
    const t = PEPTIDE_TEMPLATES.find((p) => p.id === id);
    if (!t) return;
    setTitle(t.title);
    setSizes(t.sizes);
    setCategory(t.category);
    if (FORMS.includes(t.form)) {
      setForm(t.form);
      setFormCustom("");
    } else {
      setForm("Other");
      setFormCustom(t.form);
    }
    setCas(t.cas);
    setFormula(t.formula);
    setWeight(t.weight);
    setPurity(t.purity);
    setSequence(t.sequence);
  }

  return (
    <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
      <div className="flex items-start gap-3 border-b border-neutral-200 p-6">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eef7f9] text-[#1b6b80]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
            <path d="M21 8 12 3 3 8l9 5 9-5Z" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 8v8l9 5 9-5V8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 13v8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <div>
          <h2 className="font-semibold text-neutral-900">{product ? "Edit Product" : "Add Product"}</h2>
          <p className="text-sm text-neutral-500">
            {product ? "Update the details for this product" : "Add a new product to the storefront"}
          </p>
        </div>
      </div>

      <form action={action} className="space-y-6 p-6">
        <div className="rounded-lg border border-[#cfe8ee] bg-[#f3fbfc] p-4">
          <label className="text-sm font-medium text-neutral-700" htmlFor="quickFill">
            Quick Fill — start from a known compound
          </label>
          <select
            id="quickFill"
            value={quickFill}
            onChange={(e) => applyQuickFill(e.target.value)}
            className={inputClass}
          >
            <option value="">— Select a compound —</option>
            {PEPTIDE_TEMPLATES.map((t) => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>
          <p className="mt-1.5 text-xs text-neutral-500">
            Fills in Title, Form, Category, Sizes and Specifications below from reference data —
            double-check CAS number, formula, weight and purity before publishing.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-neutral-700" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-neutral-700" htmlFor="price">
              Price
            </label>
            <input
              id="price"
              name="price"
              type="text"
              required
              placeholder="59.99 or 59.99 – 107.99"
              value={priceInput}
              onChange={(e) => setPriceInput(e.target.value)}
              className={inputClass}
            />
            {pricePreview !== priceInput && (
              <p className="mt-1 text-xs text-neutral-500">Shown to customers as: {pricePreview}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-neutral-700" htmlFor="sizes">
              Sizes
            </label>
            <input
              id="sizes"
              name="sizes"
              type="text"
              placeholder="10MG, 20MG"
              value={sizes}
              onChange={(e) => setSizes(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-neutral-700" htmlFor="form">
              Form
            </label>
            <select id="form" value={form} onChange={(e) => setForm(e.target.value)} className={inputClass}>
              {FORMS.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
              <option value="Other">Other (type below)</option>
            </select>
            <input type="hidden" name="form" value={form === "Other" ? formCustom : form} />
            {form === "Other" && (
              <input
                type="text"
                value={formCustom}
                onChange={(e) => setFormCustom(e.target.value)}
                placeholder="Custom form"
                className={`${inputClass} mt-2`}
              />
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-neutral-700" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputClass}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
          <input type="checkbox" name="bestSeller" defaultChecked={product?.bestSeller} />
          Best Seller
        </label>

        <div className="border-t border-neutral-200 pt-6">
          <h3 className="font-semibold text-neutral-900">Specifications</h3>

          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-neutral-700" htmlFor="specCas">
                CAS Number
              </label>
              <input
                id="specCas"
                name="specCas"
                type="text"
                value={cas}
                onChange={(e) => setCas(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-700" htmlFor="specFormula">
                Molecular Formula
              </label>
              <input
                id="specFormula"
                name="specFormula"
                type="text"
                value={formula}
                onChange={(e) => setFormula(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-700" htmlFor="specWeight">
                Molecular Weight
              </label>
              <input
                id="specWeight"
                name="specWeight"
                type="text"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-700" htmlFor="specPurity">
                Purity
              </label>
              <input
                id="specPurity"
                name="specPurity"
                type="text"
                value={purity}
                onChange={(e) => setPurity(e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium text-neutral-700" htmlFor="specSequence">
                Peptide Sequence
              </label>
              <input
                id="specSequence"
                name="specSequence"
                type="text"
                value={sequence}
                onChange={(e) => setSequence(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          {extraSpecs.length > 0 && (
            <div className="mt-4 space-y-3">
              {extraSpecs.map((spec, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    name="extraSpecLabel"
                    type="text"
                    placeholder="Label (e.g. BPC-157)"
                    defaultValue={spec.label}
                    className="w-1/3 rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm text-neutral-900 focus:border-[#1b6b80] focus:outline-none"
                  />
                  <input
                    name="extraSpecValue"
                    type="text"
                    placeholder="Value"
                    defaultValue={spec.value}
                    className="flex-1 rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm text-neutral-900 focus:border-[#1b6b80] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setExtraSpecs(extraSpecs.filter((_, i) => i !== index))}
                    className="px-2 text-neutral-400 hover:text-red-600"
                    aria-label="Remove spec"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={() => setExtraSpecs([...extraSpecs, { label: "", value: "" }])}
            className="mt-4 text-sm font-medium text-[#1b6b80] hover:underline"
          >
            + Add another spec
          </button>
        </div>

        <div className="border-t border-neutral-200 pt-6">
          <h3 className="font-semibold text-neutral-900">Variants (dropdown pricing)</h3>
          <p className="mt-1 text-sm text-neutral-500">
            Leave empty for a flat-price product. Add rows to show a dropdown where each option has its
            own price (e.g. &ldquo;3 Kits&rdquo; = &pound;360.00).
          </p>

          <div className="mt-4">
            <label className="text-sm font-medium text-neutral-700" htmlFor="variantsLabel">
              Dropdown Label
            </label>
            <input
              id="variantsLabel"
              name="variantsLabel"
              type="text"
              placeholder="Kits, Pens, Vials…"
              value={variantsLabel}
              onChange={(e) => setVariantsLabel(e.target.value)}
              className={`${inputClass} max-w-xs`}
            />
          </div>

          {variants.length > 0 && (
            <div className="mt-4 space-y-3">
              {variants.map((variant, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    name="variantOptionLabel"
                    type="text"
                    placeholder="Label (e.g. 3 Kits)"
                    defaultValue={variant.label}
                    className="flex-1 rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm text-neutral-900 focus:border-[#1b6b80] focus:outline-none"
                  />
                  <input
                    name="variantOptionPrice"
                    type="text"
                    placeholder="Price (e.g. 360.00)"
                    defaultValue={variant.priceGbp}
                    className="w-40 rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm text-neutral-900 focus:border-[#1b6b80] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setVariants(variants.filter((_, i) => i !== index))}
                    className="px-2 text-neutral-400 hover:text-red-600"
                    aria-label="Remove variant"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={() => setVariants([...variants, { label: "", priceGbp: 0 }])}
            className="mt-4 text-sm font-medium text-[#1b6b80] hover:underline"
          >
            + Add variant option
          </button>
        </div>

        <div className="border-t border-neutral-200 pt-6">
          <label className="text-sm font-medium text-neutral-700">Product Image</label>
          <p className="text-sm text-neutral-500">Drag and drop an image, or browse to upload</p>
          <div className="mt-3">
            <ImageUploader initialUrl={product?.image600} />
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-neutral-200 pt-6">
          <a
            href={cancelHref}
            className="rounded-lg border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
          >
            Cancel
          </a>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={(e) => {
                e.currentTarget.form?.reset();
                resetAll();
              }}
              className="rounded-lg border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
            >
              Reset
            </button>
            <button
              type="submit"
              className="rounded-lg bg-[#1b6b80] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#164f5f]"
            >
              {submitLabel}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
