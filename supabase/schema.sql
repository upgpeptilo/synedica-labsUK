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

-- seed with the real synedica-uk.shop catalog (cloned with the owner's approval).
-- Prices are the base single-unit price - their site prices bulk-quantity variants
-- (e.g. "3 kits", "5 pens") as WooCommerce variations, which this schema doesn't
-- model (no bulk pricing feature exists here yet). Images are their real product
-- photography, downloaded and resized to the site's 300/600 convention.
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
  address text not null,
  payment_method text not null,
  currency text not null default 'GBP',
  items jsonb not null default '[]',
  total numeric(10,2) not null,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

alter table orders enable row level security;

-- checkout is unauthenticated. Orders are inserted through place_order() below,
-- which is security definer so the anon role never needs read access to the table.
drop policy if exists "Anyone can insert orders" on orders;

create or replace function place_order(
  p_name text,
  p_email text,
  p_address text,
  p_payment_method text,
  p_items jsonb,
  p_total numeric
) returns int
language sql
security definer
set search_path = public
as $$
  insert into orders (name, email, address, payment_method, currency, items, total)
  values (p_name, p_email, p_address, p_payment_method, 'GBP', p_items, p_total)
  returning order_number;
$$;

grant execute on function place_order(text, text, text, text, jsonb, numeric) to anon, authenticated;

-- only admins (logged in) can view/manage orders
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

insert into products (slug, title, price, sizes, form, image300, image600, best_seller, specs, category) values
('biotin-40mg-injection-pen-kit', 'Biotin 40mg Injection Pen Kit', '£110.00', array['40MG'], 'Injection Pen Kit', '/images/biotin-40mg-injection-pen-kit-300.png', '/images/biotin-40mg-injection-pen-kit-600.png', false,
  '[{"label":"Form","value":"Injection Pen Kit"},{"label":"Pack Size","value":"40mg"}]', 'Recovery'),
('cagri-sema', 'Cagri Sema', '£190.00', array[]::text[], 'Injection Kit', '/images/cagri-sema-300.png', '/images/cagri-sema-600.png', false,
  '[{"label":"Form","value":"Injection Kit"}]', 'Weight Loss'),
('glow-skin-112mg', 'Glow Skin 112mg', '£120.00', array['112MG'], 'Pen Kit', '/images/glow-skin-112mg-300.png', '/images/glow-skin-112mg-600.png', true,
  '[{"label":"Form","value":"Pen Kit"},{"label":"Pack Size","value":"112mg"}]', 'Cosmetic'),
('melanotan-2-nasal-spray', 'Melanotan 2 Nasal Spray', '£50.00', array['20MG'], 'Nasal Spray', '/images/melanotan-2-nasal-spray-300.png', '/images/melanotan-2-nasal-spray-600.png', false,
  '[{"label":"Form","value":"Nasal Spray"},{"label":"Pack Size","value":"20mg/10ml"}]', 'Cosmetic'),
('nad-b12-synedica', 'Synedica NAD+ & B12 Kit', '£145.00', array[]::text[], 'Injection Kit', '/images/nad-b12-synedica-300.png', '/images/nad-b12-synedica-600.png', true,
  '[{"label":"Form","value":"Injection Kit"}]', 'Recovery'),
('somatotropin-hgh-120iu-injection-pen-kit', 'Somatotropin HGH 120iu Injection Pen Kit', '£180.00', array['120IU'], 'Injection Pen Kit', '/images/somatotropin-hgh-120iu-injection-pen-kit-300.png', '/images/somatotropin-hgh-120iu-injection-pen-kit-600.png', true,
  '[{"label":"Form","value":"Injection Pen Kit"},{"label":"Pack Size","value":"120iu"}]', 'Recovery'),
('synedica-bpc-157-tb-500', 'Synedica BPC 157 & TB 500', '£120.00', array['40MG'], 'Injection Kit', '/images/synedica-bpc-157-tb-500-300.png', '/images/synedica-bpc-157-tb-500-600.png', false,
  '[{"label":"Blend","value":"BPC-157 + TB-500"},{"label":"Form","value":"Injection Kit"}]', 'Recovery'),
('synedica-cagrireta-40-mg', 'Synedica CagriReta 40mg', '£190.00', array['40MG'], 'Lyophilized Powder', '/images/synedica-cagrireta-40-mg-300.png', '/images/synedica-cagrireta-40-mg-600.png', false,
  '[{"label":"Form","value":"Lyophilized Powder"},{"label":"Pack Size","value":"40mg"}]', 'Weight Loss'),
('synedica-nad-nmn-1000mg-injection-pen-kit', 'Synedica NAD+ & NMN 1000mg Injection Pen Kit', '£120.00', array['1000MG'], 'Injection Pen Kit', '/images/synedica-nad-nmn-1000mg-injection-pen-kit-300.png', '/images/synedica-nad-nmn-1000mg-injection-pen-kit-600.png', false,
  '[{"label":"Form","value":"Injection Pen Kit"},{"label":"Pack Size","value":"1000mg"}]', 'Recovery'),
('synedica-retatrutide-40mg-injection-kit', 'Synedica Retatrutide 40mg Injection Kit', '£130.00', array['40MG'], 'Injection Kit', '/images/synedica-retatrutide-40mg-injection-kit-300.png', '/images/synedica-retatrutide-40mg-injection-kit-600.png', true,
  '[{"label":"Form","value":"Injection Kit"},{"label":"Pack Size","value":"40mg"}]', 'Weight Loss'),
('synedica-semaglutide-glp-1-pen-kit', 'Synedica Semaglutide GLP-1 Pen Kit', '£160.00', array['8MG'], 'Pen Kit', '/images/synedica-semaglutide-glp-1-pen-kit-300.png', '/images/synedica-semaglutide-glp-1-pen-kit-600.png', true,
  '[{"label":"Form","value":"Pen Kit"},{"label":"Pack Size","value":"8mg"}]', 'Weight Loss'),
('synedica-tirzepatide-40mg-injection-pen-kit', 'Synedica Tirzepatide 40mg Injection Pen Kit', '£199.00', array['40MG'], 'Injection Pen Kit', '/images/synedica-tirzepatide-40mg-injection-pen-kit-300.png', '/images/synedica-tirzepatide-40mg-injection-pen-kit-600.png', false,
  '[{"label":"Form","value":"Injection Pen Kit"},{"label":"Pack Size","value":"40mg"}]', 'Weight Loss'),
('trt-hcg-injection-pen-kit', 'Synedica TRT + HCG Injection Pen Kit', '£200.00', array[]::text[], 'Injection Pen Kit', '/images/trt-hcg-injection-pen-kit-300.png', '/images/trt-hcg-injection-pen-kit-600.png', false,
  '[{"label":"Form","value":"Injection Pen Kit"}]', 'Anabolic')
on conflict (slug) do update set category = excluded.category;
