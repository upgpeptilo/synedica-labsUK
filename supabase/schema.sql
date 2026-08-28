-- Run this once in your Supabase project's SQL editor (Database > SQL Editor > New query).

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  price text not null,
  sizes text[] not null default '{}',
  form text not null default 'Lyophilized Powder',
  image300 text not null,
  image600 text not null,
  best_seller boolean not null default false,
  specs jsonb not null default '[]',
  category text not null default 'Uncategorized',
  created_at timestamptz not null default now()
);

alter table products add column if not exists category text not null default 'Uncategorized';

alter table products enable row level security;

-- anyone can read products (storefront)
drop policy if exists "Public can view products" on products;
create policy "Public can view products"
  on products for select
  using (true);

-- only logged-in users (admins) can add/edit/delete
drop policy if exists "Authenticated users can insert products" on products;
create policy "Authenticated users can insert products"
  on products for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated users can update products" on products;
create policy "Authenticated users can update products"
  on products for update
  to authenticated
  using (true);

drop policy if exists "Authenticated users can delete products" on products;
create policy "Authenticated users can delete products"
  on products for delete
  to authenticated
  using (true);

-- storage bucket for product images
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists "Public can view product images" on storage.objects;
create policy "Public can view product images"
  on storage.objects for select
  using (bucket_id = 'product-images');

drop policy if exists "Authenticated users can upload product images" on storage.objects;
create policy "Authenticated users can upload product images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'product-images');

drop policy if exists "Authenticated users can delete product images" on storage.objects;
create policy "Authenticated users can delete product images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'product-images');

-- seed with the Synedica Labs UK research-use product catalogue.
-- Product information is written for laboratory and in-vitro research use only.
-- No product is represented as a medicine or as suitable for human or veterinary use.

alter table products add column if not exists variants_label text;

create table if not exists product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  label text not null,
  price numeric(10,2) not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table product_variants enable row level security;

drop policy if exists "Public can view product variants" on product_variants;
create policy "Public can view product variants"
  on product_variants for select using (true);

drop policy if exists "Authenticated users can insert product variants" on product_variants;
create policy "Authenticated users can insert product variants"
  on product_variants for insert to authenticated with check (true);

drop policy if exists "Authenticated users can update product variants" on product_variants;
create policy "Authenticated users can update product variants"
  on product_variants for update to authenticated using (true);

drop policy if exists "Authenticated users can delete product variants" on product_variants;
create policy "Authenticated users can delete product variants"
  on product_variants for delete to authenticated using (true);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  order_number int generated always as identity,
  name text not null,
  email text not null,
  phone text not null default '',
  address text not null,
  payment_method text not null,
  currency text not null default 'GBP',
  items jsonb not null default '[]',
  total numeric(10,2) not null,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

alter table orders add column if not exists phone text not null default '';

alter table orders enable row level security;

drop policy if exists "Anyone can insert orders" on orders;

drop function if exists place_order(text, text, text, text, jsonb, numeric);

create or replace function place_order(
  p_name text,
  p_email text,
  p_phone text,
  p_address text,
  p_payment_method text,
  p_items jsonb,
  p_total numeric
) returns int
language sql
security definer
set search_path = public
as $$
  insert into orders (name, email, phone, address, payment_method, currency, items, total)
  values (p_name, p_email, p_phone, p_address, p_payment_method, 'GBP', p_items, p_total)
  returning order_number;
$$;

grant execute on function place_order(text, text, text, text, text, jsonb, numeric) to anon, authenticated;

drop policy if exists "Authenticated users can view orders" on orders;
create policy "Authenticated users can view orders"
  on orders for select
  to authenticated
  using (true);

drop policy if exists "Authenticated users can update orders" on orders;
create policy "Authenticated users can update orders"
  on orders for update
  to authenticated
  using (true);

drop policy if exists "Authenticated users can delete orders" on orders;
create policy "Authenticated users can delete orders"
  on orders for delete
  to authenticated
  using (true);

-- site-wide settings
create table if not exists site_settings (
  id int primary key default 1,
  whatsapp_number text not null default '447882524986',
  updated_at timestamptz not null default now(),
  constraint site_settings_singleton check (id = 1)
);

alter table site_settings enable row level security;

drop policy if exists "Public can view site settings" on site_settings;
create policy "Public can view site settings"
  on site_settings for select
  using (true);

drop policy if exists "Authenticated users can update site settings" on site_settings;
create policy "Authenticated users can update site settings"
  on site_settings for update
  to authenticated
  using (true);

insert into site_settings (id, whatsapp_number) values (1, '447882524986')
on conflict (id) do nothing;


-- ============================================================
-- SEO-OPTIMISED PRODUCT CATALOGUE
-- Research-use positioning is included in the product specifications.
-- ============================================================

insert into products (
  slug,
  title,
  price,
  sizes,
  form,
  image300,
  image600,
  best_seller,
  specs,
  category
) values

(
  'biotin-40mg-injection-pen-kit',
  'Biotin 40mg Injection Pen Kit',
  '£110.00',
  array['40MG'],
  'Injection Pen Kit',
  '/images/biotin-40mg-injection-pen-kit-300.png',
  '/images/biotin-40mg-injection-pen-kit-600.png',
  false,
  '[
    {"label":"Research Compound","value":"Biotin"},
    {"label":"Pack Size","value":"40mg"},
    {"label":"Form","value":"Injection Pen Kit"},
    {"label":"Research Use","value":"Laboratory and in-vitro research use only"},
    {"label":"UK Status","value":"Not a medicine and not licensed under the Human Medicines Regulations 2012"},
    {"label":"Human Use","value":"Not for human or veterinary use or consumption"},
    {"label":"Quality Documentation","value":"Batch-specific laboratory documentation should be reviewed before research use"}
  ]',
  'Recovery'
),

(
  'cagri-sema',
  'CagriSema Research Peptide',
  '£190.00',
  array[]::text[],
  'Injection Kit',
  '/images/cagri-sema-300.png',
  '/images/cagri-sema-600.png',
  false,
  '[
    {"label":"Research Compound","value":"CagriSema"},
    {"label":"Form","value":"Injection Kit"},
    {"label":"Research Use","value":"Laboratory and in-vitro research use only"},
    {"label":"Research Context","value":"Investigated in scientific research involving metabolic and pharmacological pathways"},
    {"label":"UK Status","value":"Not a medicine and not licensed under the Human Medicines Regulations 2012"},
    {"label":"Human Use","value":"Not for human or veterinary use or consumption"},
    {"label":"Quality Documentation","value":"Batch-specific laboratory documentation should be reviewed before research use"}
  ]',
  'Weight Loss'
),

(
  'glow-skin-112mg',
  'Glow Skin 112mg Research Peptide',
  '£120.00',
  array['112MG'],
  'Pen Kit',
  '/images/glow-skin-112mg-300.png',
  '/images/glow-skin-112mg-600.png',
  true,
  '[
    {"label":"Research Product","value":"Glow Skin 112mg"},
    {"label":"Pack Size","value":"112mg"},
    {"label":"Form","value":"Pen Kit"},
    {"label":"Research Use","value":"Laboratory and in-vitro research use only"},
    {"label":"Research Context","value":"Supplied for controlled laboratory research and analytical investigation"},
    {"label":"UK Status","value":"Not a medicine and not licensed under the Human Medicines Regulations 2012"},
    {"label":"Human Use","value":"Not for human or veterinary use or consumption"},
    {"label":"Quality Documentation","value":"Batch-specific laboratory documentation should be reviewed before research use"}
  ]',
  'Cosmetic'
),

(
  'melanotan-2-nasal-spray',
  'Melanotan 2 20mg Research Nasal Spray',
  '£50.00',
  array['20MG'],
  'Nasal Spray',
  '/images/melanotan-2-nasal-spray-300.png',
  '/images/melanotan-2-nasal-spray-600.png',
  false,
  '[
    {"label":"Research Compound","value":"Melanotan 2"},
    {"label":"Pack Size","value":"20mg / 10ml"},
    {"label":"Form","value":"Nasal Spray"},
    {"label":"Research Use","value":"Laboratory and in-vitro research use only"},
    {"label":"Research Context","value":"Melanocortin-related compound investigated in scientific research"},
    {"label":"UK Status","value":"Not a medicine and not licensed under the Human Medicines Regulations 2012"},
    {"label":"Human Use","value":"Not for human or veterinary use or consumption"},
    {"label":"Quality Documentation","value":"Batch-specific laboratory documentation should be reviewed before research use"}
  ]',
  'Cosmetic'
),

(
  'nad-b12-synedica',
  'Synedica NAD+ & B12 Research Kit',
  '£145.00',
  array[]::text[],
  'Injection Kit',
  '/images/nad-b12-synedica-300.png',
  '/images/nad-b12-synedica-600.png',
  true,
  '[
    {"label":"Research Compounds","value":"NAD+ and Vitamin B12"},
    {"label":"Form","value":"Injection Kit"},
    {"label":"Research Use","value":"Laboratory and in-vitro research use only"},
    {"label":"Research Context","value":"Supplied for laboratory investigation of biochemical and cellular research pathways"},
    {"label":"UK Status","value":"Not a medicine and not licensed under the Human Medicines Regulations 2012"},
    {"label":"Human Use","value":"Not for human or veterinary use or consumption"},
    {"label":"Quality Documentation","value":"Batch-specific laboratory documentation should be reviewed before research use"}
  ]',
  'Recovery'
),

(
  'somatotropin-hgh-120iu-injection-pen-kit',
  'Somatotropin HGH 120IU Research Injection Pen Kit',
  '£180.00',
  array['120IU'],
  'Injection Pen Kit',
  '/images/somatotropin-hgh-120iu-injection-pen-kit-300.png',
  '/images/somatotropin-hgh-120iu-injection-pen-kit-600.png',
  true,
  '[
    {"label":"Research Compound","value":"Somatotropin / HGH"},
    {"label":"Pack Size","value":"120IU"},
    {"label":"Form","value":"Injection Pen Kit"},
    {"label":"Research Use","value":"Laboratory and in-vitro research use only"},
    {"label":"Research Context","value":"Growth-hormone-related compound used in laboratory and preclinical research"},
    {"label":"UK Status","value":"Not a medicine and not licensed under the Human Medicines Regulations 2012"},
    {"label":"Human Use","value":"Not for human or veterinary use or consumption"},
    {"label":"Quality Documentation","value":"Batch-specific laboratory documentation should be reviewed before research use"}
  ]',
  'Recovery'
),

(
  'synedica-bpc-157-tb-500',
  'Synedica BPC-157 & TB-500 Research Peptide',
  '£120.00',
  array['40MG'],
  'Injection Kit',
  '/images/synedica-bpc-157-tb-500-300.png',
  '/images/synedica-bpc-157-tb-500-600.png',
  false,
  '[
    {"label":"Research Compounds","value":"BPC-157 + TB-500"},
    {"label":"Pack Size","value":"40mg"},
    {"label":"Form","value":"Injection Kit"},
    {"label":"Research Use","value":"Laboratory and in-vitro research use only"},
    {"label":"Research Context","value":"Peptide compounds investigated in preclinical and laboratory research"},
    {"label":"UK Status","value":"Not a medicine and not licensed under the Human Medicines Regulations 2012"},
    {"label":"Human Use","value":"Not for human or veterinary use or consumption"},
    {"label":"Quality Documentation","value":"Batch-specific laboratory documentation should be reviewed before research use"}
  ]',
  'Recovery'
),

(
  'synedica-cagrireta-40-mg',
  'Synedica CagriReta 40mg Research Peptide',
  '£190.00',
  array['40MG'],
  'Lyophilized Powder',
  '/images/synedica-cagrireta-40-mg-300.png',
  '/images/synedica-cagrireta-40-mg-600.png',
  false,
  '[
    {"label":"Research Compound","value":"CagriReta"},
    {"label":"Pack Size","value":"40mg"},
    {"label":"Form","value":"Lyophilized Powder"},
    {"label":"Research Use","value":"Laboratory and in-vitro research use only"},
    {"label":"Research Context","value":"Investigated in scientific research involving metabolic and pharmacological pathways"},
    {"label":"UK Status","value":"Not a medicine and not licensed under the Human Medicines Regulations 2012"},
    {"label":"Human Use","value":"Not for human or veterinary use or consumption"},
    {"label":"Quality Documentation","value":"Batch-specific laboratory documentation should be reviewed before research use"}
  ]',
  'Weight Loss'
),

(
  'synedica-nad-nmn-1000mg-injection-pen-kit',
  'Synedica NAD+ & NMN 1000mg Research Pen Kit',
  '£120.00',
  array['1000MG'],
  'Injection Pen Kit',
  '/images/synedica-nad-nmn-1000mg-injection-pen-kit-300.png',
  '/images/synedica-nad-nmn-1000mg-injection-pen-kit-600.png',
  false,
  '[
    {"label":"Research Compounds","value":"NAD+ and NMN"},
    {"label":"Pack Size","value":"1000mg"},
    {"label":"Form","value":"Injection Pen Kit"},
    {"label":"Research Use","value":"Laboratory and in-vitro research use only"},
    {"label":"Research Context","value":"Nicotinamide-related compounds investigated in biochemical and cellular research"},
    {"label":"UK Status","value":"Not a medicine and not licensed under the Human Medicines Regulations 2012"},
    {"label":"Human Use","value":"Not for human or veterinary use or consumption"},
    {"label":"Quality Documentation","value":"Batch-specific laboratory documentation should be reviewed before research use"}
  ]',
  'Recovery'
),

(
  'synedica-retatrutide-40mg-injection-kit',
  'Synedica Retatrutide 40mg Research Injection Kit',
  '£130.00',
  array['40MG'],
  'Injection Kit',
  '/images/synedica-retatrutide-40mg-injection-kit-300.png',
  '/images/synedica-retatrutide-40mg-injection-kit-600.png',
  true,
  '[
    {"label":"Research Compound","value":"Retatrutide"},
    {"label":"Pack Size","value":"40mg"},
    {"label":"Form","value":"Injection Kit"},
    {"label":"Research Use","value":"Laboratory and in-vitro research use only"},
    {"label":"Research Context","value":"Investigated in clinical and preclinical research involving metabolic signalling"},
    {"label":"UK Status","value":"Not a medicine and not licensed under the Human Medicines Regulations 2012"},
    {"label":"Human Use","value":"Not for human or veterinary use or consumption"},
    {"label":"Quality Documentation","value":"Batch-specific laboratory documentation should be reviewed before research use"}
  ]',
  'Weight Loss'
),

(
  'synedica-semaglutide-glp-1-pen-kit',
  'Synedica Semaglutide GLP-1 Research Pen Kit',
  '£160.00',
  array['8MG'],
  'Pen Kit',
  '/images/synedica-semaglutide-glp-1-pen-kit-300.png',
  '/images/synedica-semaglutide-glp-1-pen-kit-600.png',
  true,
  '[
    {"label":"Research Compound","value":"Semaglutide"},
    {"label":"Research Classification","value":"GLP-1 receptor agonist"},
    {"label":"Pack Size","value":"8mg"},
    {"label":"Form","value":"Pen Kit"},
    {"label":"Research Use","value":"Laboratory and in-vitro research use only"},
    {"label":"Research Context","value":"GLP-1-related compound investigated extensively in pharmacological and metabolic research"},
    {"label":"UK Status","value":"This research product is not a medicine and is not licensed under the Human Medicines Regulations 2012"},
    {"label":"Human Use","value":"Not for human or veterinary use or consumption"},
    {"label":"Quality Documentation","value":"Batch-specific laboratory documentation should be reviewed before research use"}
  ]',
  'Weight Loss'
),

(
  'synedica-tirzepatide-40mg-injection-pen-kit',
  'Synedica Tirzepatide 40mg Research Injection Pen Kit',
  '£199.00',
  array['40MG'],
  'Injection Pen Kit',
  '/images/synedica-tirzepatide-40mg-injection-pen-kit-300.png',
  '/images/synedica-tirzepatide-40mg-injection-pen-kit-600.png',
  false,
  '[
    {"label":"Research Compound","value":"Tirzepatide"},
    {"label":"Pack Size","value":"40mg"},
    {"label":"Form","value":"Injection Pen Kit"},
    {"label":"Research Use","value":"Laboratory and in-vitro research use only"},
    {"label":"Research Context","value":"Investigated as a dual GIP and GLP-1 receptor agonist in scientific research"},
    {"label":"UK Status","value":"This research product is not a medicine and is not licensed under the Human Medicines Regulations 2012"},
    {"label":"Human Use","value":"Not for human or veterinary use or consumption"},
    {"label":"Quality Documentation","value":"Batch-specific laboratory documentation should be reviewed before research use"}
  ]',
  'Weight Loss'
),

(
  'trt-hcg-injection-pen-kit',
  'Synedica TRT + HCG Research Injection Pen Kit',
  '£200.00',
  array[]::text[],
  'Injection Pen Kit',
  '/images/trt-hcg-injection-pen-kit-300.png',
  '/images/trt-hcg-injection-pen-kit-600.png',
  false,
  '[
    {"label":"Research Compounds","value":"TRT + HCG"},
    {"label":"Form","value":"Injection Pen Kit"},
    {"label":"Research Use","value":"Laboratory and in-vitro research use only"},
    {"label":"Research Context","value":"Supplied for laboratory investigation and analytical research"},
    {"label":"UK Status","value":"Not a medicine and not licensed under the Human Medicines Regulations 2012"},
    {"label":"Human Use","value":"Not for human or veterinary use or consumption"},
    {"label":"Quality Documentation","value":"Batch-specific laboratory documentation should be reviewed before research use"}
  ]',
  'Anabolic'
)

on conflict (slug) do update set
  title = excluded.title,
  price = excluded.price,
  sizes = excluded.sizes,
  form = excluded.form,
  image300 = excluded.image300,
  image600 = excluded.image600,
  best_seller = excluded.best_seller,
  specs = excluded.specs,
  category = excluded.category;
