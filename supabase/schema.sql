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
alter table products add column if not exists description text not null default '';
alter table products add column if not exists meta_description text not null default '';
alter table products add column if not exists quick_answer text not null default '';
alter table products add column if not exists content_sections jsonb not null default '[]';
alter table products add column if not exists faq jsonb not null default '[]';
alter table products add column if not exists author_line text not null default '';
alter table products add column if not exists content_updated_at timestamptz;

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

-- seed with the Synedica Labs UK research-use catalogue.
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

-- site-wide settings (currently just the WhatsApp contact number).
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
-- SEO-OPTIMISED EXISTING PRODUCT CONTENT
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
  category,
  description,
  meta_description
) values

(
  'biotin-40mg-injection-pen-kit',
  'Biotin 40mg Injection Pen Kit | Laboratory Research',
  '£110.00',
  array[
    '40MG',
    'CAS 58-85-5',
    'Vitamin B7',
    'Research Use Only'
  ],
  'Biotin Research Injection Pen Kit | Laboratory & In-Vitro Research Only',
  '/images/biotin-40mg-injection-pen-kit-300.png',
  '/images/biotin-40mg-injection-pen-kit-600.png',
  false,
  '[
    {
      "label":"Research Use",
      "value":"Strictly for laboratory and in-vitro research use."
    },
    {
      "label":"Regulatory Status",
      "value":"Not a medicine, not for human or veterinary use or consumption, not licensed as a medicine under the Human Medicines Regulations 2012, and not assessed by the MHRA for safety or efficacy as a medicinal product."
    },
    {
      "label":"Compound",
      "value":"Biotin"
    },
    {
      "label":"Common Names",
      "value":"Vitamin B7 / Vitamin H"
    },
    {
      "label":"CAS Number",
      "value":"58-85-5"
    },
    {
      "label":"Molecular Formula",
      "value":"C10H16N2O3S"
    },
    {
      "label":"Molecular Weight",
      "value":"244.31 g/mol"
    },
    {
      "label":"Pack Size",
      "value":"40mg"
    },
    {
      "label":"Product Form",
      "value":"Injection Pen Kit"
    },
    {
      "label":"Research Context",
      "value":"Biotin-dependent carboxylases, biochemical metabolism, biotinylation and gene-expression research."
    },
    {
      "label":"Scientific Reference",
      "value":"León-Del-Río, Journal of Inherited Metabolic Disease, published 19 March 2019. Biotin is described as a water-soluble vitamin and cofactor for biotin-dependent carboxylases."
    },
    {
      "label":"Scientific Reference 2",
      "value":"Tong, Cell and Molecular Life Sciences, published March 2013. Biotin-dependent carboxylases are involved in fatty-acid, amino-acid and carbohydrate metabolism."
    },
    {
      "label":"Chemical Verification",
      "value":"Biotin identity can be cross-checked using authoritative chemical databases including PubChem."
    },
    {
      "label":"Purity",
      "value":"Refer to the applicable batch Certificate of Analysis. No generic purity percentage is substituted for batch-specific results."
    },
    {
      "label":"Batch Testing",
      "value":"Refer to the applicable batch Certificate of Analysis and analytical documentation."
    },
    {
      "label":"Storage",
      "value":"Follow the current product label and applicable batch documentation."
    },
    {
      "label":"Shelf Life",
      "value":"Follow the applicable batch documentation."
    },
    {
      "label":"COA",
      "value":"Batch-specific Certificate of Analysis should be reviewed against the material received."
    },
    {
      "label":"UK Research Purchasing",
      "value":"UK research organisations should verify research-use status, documentation and applicable regulatory requirements before purchase."
    },
    {
      "label":"Human Use",
      "value":"Not for human use, veterinary use or consumption."
    },
    {
      "label":"Compliance Notice",
      "value":"This product is sold strictly for laboratory and in-vitro research use. It is not a medicine, is not for human or veterinary use or consumption, is not licensed as a medicine under the Human Medicines Regulations 2012, and has not been assessed by the MHRA for safety or efficacy."
    }
  ]'::jsonb,
  'Laboratory Research',
  'Biotin 40mg Injection Pen Kit contains biotin, also known as vitamin B7, a water-soluble vitamin and cofactor involved in biotin-dependent carboxylase reactions. Biotin has been investigated in biochemical research involving enzyme function, cellular metabolism and gene regulation. This product is supplied strictly for laboratory and in-vitro research use.',
  'Biotin 40mg Injection Pen Kit for laboratory research, with batch documentation and third-party testing. Shop research-grade Biotin today.'
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
  category = excluded.category,
  description = excluded.description,
  meta_description = excluded.meta_description;


-- ============================================================
-- KEEP ALL OTHER EXISTING PRODUCTS UNCHANGED
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
  category,
  description,
  meta_description
) values

(
  'cagri-sema',
  'Cagri Sema',
  '£190.00',
  array[]::text[],
  'Injection Kit',
  '/images/cagri-sema-300.png',
  '/images/cagri-sema-600.png',
  false,
  '[{"label":"Form","value":"Injection Kit"}]',
  'Weight Loss',
  'Cagri Sema combines cagrilintide and semaglutide, two peptides studied together in metabolic research relating to appetite regulation and energy balance. This injection kit is supplied strictly for laboratory and in-vitro research use.',
  'Cagri Sema Injection Kit for laboratory research into cagrilintide and semaglutide. Research use only — shop today.'
),

(
  'glow-skin-112mg',
  'Glow Skin 112mg',
  '£120.00',
  array['112MG'],
  'Pen Kit',
  '/images/glow-skin-112mg-300.png',
  '/images/glow-skin-112mg-600.png',
  true,
  '[{"label":"Form","value":"Pen Kit"},{"label":"Pack Size","value":"112mg"}]',
  'Cosmetic',
  'Glow Skin 112mg is a peptide blend supplied for cosmetic and dermatological research, used in studies relating to skin cell signalling. This pen kit is supplied strictly for laboratory and in-vitro research use.',
  'Glow Skin 112mg Pen Kit for cosmetic peptide research, with batch documentation. Research use only — shop today.'
),

(
  'melanotan-2-nasal-spray',
  'Melanotan 2 Nasal Spray',
  '£50.00',
  array['20MG'],
  'Nasal Spray',
  '/images/melanotan-2-nasal-spray-300.png',
  '/images/melanotan-2-nasal-spray-600.png',
  false,
  '[{"label":"Form","value":"Nasal Spray"},{"label":"Pack Size","value":"20mg/10ml"}]',
  'Cosmetic',
  'Melanotan 2 is a synthetic analogue of alpha-melanocyte-stimulating hormone, studied in research relating to melanocortin receptor activity and pigmentation pathways. This nasal spray is supplied strictly for laboratory and in-vitro research use.',
  'Melanotan 2 Nasal Spray for laboratory research into melanocortin receptor activity. Research use only — shop today.'
),

(
  'nad-b12-synedica',
  'Synedica NAD+ & B12 Kit',
  '£145.00',
  array[]::text[],
  'Injection Kit',
  '/images/nad-b12-synedica-300.png',
  '/images/nad-b12-synedica-600.png',
  true,
  '[{"label":"Form","value":"Injection Kit"}]',
  'Recovery',
  'Synedica NAD+ & B12 Kit combines nicotinamide adenine dinucleotide (NAD+) and vitamin B12, studied together in research relating to cellular energy metabolism and coenzyme function. Supplied strictly for laboratory and in-vitro research use.',
  'Synedica NAD+ & B12 Kit for laboratory research into cellular energy metabolism. Research use only — shop today.'
),

(
  'somatotropin-hgh-120iu-injection-pen-kit',
  'Somatotropin HGH 120iu Injection Pen Kit',
  '£180.00',
  array['120IU'],
  'Injection Pen Kit',
  '/images/somatotropin-hgh-120iu-injection-pen-kit-300.png',
  '/images/somatotropin-hgh-120iu-injection-pen-kit-600.png',
  true,
  '[{"label":"Form","value":"Injection Pen Kit"},{"label":"Pack Size","value":"120iu"}]',
  'Recovery',
  'Somatotropin (recombinant human growth hormone) is studied in research relating to growth hormone receptor signalling and cellular metabolism. This 120iu pen kit is supplied strictly for laboratory and in-vitro research use.',
  'Somatotropin HGH 120iu Pen Kit for laboratory research, with batch documentation. Research use only — shop today.'
),

(
  'synedica-bpc-157-tb-500',
  'Synedica BPC 157 & TB 500',
  '£120.00',
  array['40MG'],
  'Injection Kit',
  '/images/synedica-bpc-157-tb-500-300.png',
  '/images/synedica-bpc-157-tb-500-600.png',
  false,
  '[{"label":"Blend","value":"BPC-157 + TB-500"},{"label":"Form","value":"Injection Kit"}]',
  'Recovery',
  'This blend combines BPC-157 and TB-500, two peptides frequently studied together in research relating to tissue repair pathways and cellular regeneration models. Supplied strictly for laboratory and in-vitro research use.',
  'Synedica BPC-157 & TB-500 blend for laboratory research into tissue repair pathways. Research use only — shop today.'
),

(
  'synedica-cagrireta-40-mg',
  'Synedica CagriReta 40mg',
  '£190.00',
  array['40MG'],
  'Lyophilized Powder',
  '/images/synedica-cagrireta-40-mg-300.png',
  '/images/synedica-cagrireta-40-mg-600.png',
  false,
  '[{"label":"Form","value":"Lyophilized Powder"},{"label":"Pack Size","value":"40mg"}]',
  'Weight Loss',
  'Synedica CagriReta 40mg combines cagrilintide and retatrutide, peptides studied together in metabolic research relating to appetite and energy balance pathways. Supplied as a lyophilized powder strictly for laboratory and in-vitro research use.',
  'Synedica CagriReta 40mg for laboratory research into metabolic and appetite pathways. Research use only — shop today.'
),

(
  'synedica-nad-nmn-1000mg-injection-pen-kit',
  'Synedica NAD+ & NMN 1000mg Injection Pen Kit',
  '£120.00',
  array['1000MG'],
  'Injection Pen Kit',
  '/images/synedica-nad-nmn-1000mg-injection-pen-kit-300.png',
  '/images/synedica-nad-nmn-1000mg-injection-pen-kit-600.png',
  false,
  '[{"label":"Form","value":"Injection Pen Kit"},{"label":"Pack Size","value":"1000mg"}]',
  'Recovery',
  'Synedica NAD+ & NMN 1000mg Pen Kit combines NAD+ and nicotinamide mononucleotide (NMN), studied together in research relating to cellular energy metabolism and NAD+ biosynthesis pathways. Supplied strictly for laboratory and in-vitro research use.',
  'Synedica NAD+ & NMN 1000mg Pen Kit for laboratory research into NAD+ biosynthesis. Research use only — shop today.'
),

(
  'synedica-retatrutide-40mg-injection-kit',
  'Synedica Retatrutide 40mg Injection Kit',
  '£130.00',
  array['40MG'],
  'Injection Kit',
  '/images/synedica-retatrutide-40mg-injection-kit-300.png',
  '/images/synedica-retatrutide-40mg-injection-kit-600.png',
  true,
  '[{"label":"Form","value":"Injection Kit"},{"label":"Pack Size","value":"40mg"}]',
  'Weight Loss',
  'Retatrutide is a triple receptor agonist peptide studied in metabolic research relating to GLP-1, GIP and glucagon receptor pathways. This 40mg injection kit is supplied strictly for laboratory and in-vitro research use.',
  'Synedica Retatrutide 40mg Injection Kit for laboratory research into metabolic pathways. Research use only — shop today.'
),

(
  'synedica-semaglutide-glp-1-pen-kit',
  'Synedica Semaglutide GLP-1 Pen Kit',
  '£160.00',
  array['8MG'],
  'Pen Kit',
  '/images/synedica-semaglutide-glp-1-pen-kit-300.png',
  '/images/synedica-semaglutide-glp-1-pen-kit-600.png',
  true,
  '[{"label":"Form","value":"Pen Kit"},{"label":"Pack Size","value":"8mg"}]',
  'Weight Loss',
  'Semaglutide is a GLP-1 receptor agonist studied extensively in metabolic research relating to appetite regulation and glucose homeostasis. This pen kit is supplied strictly for laboratory and in-vitro research use.',
  'Synedica Semaglutide GLP-1 Pen Kit for laboratory research into GLP-1 receptor pathways. Research use only — shop today.'
),

(
  'synedica-tirzepatide-40mg-injection-pen-kit',
  'Synedica Tirzepatide 40mg Injection Pen Kit',
  '£199.00',
  array['40MG'],
  'Injection Pen Kit',
  '/images/synedica-tirzepatide-40mg-injection-pen-kit-300.png',
  '/images/synedica-tirzepatide-40mg-injection-pen-kit-600.png',
  false,
  '[{"label":"Form","value":"Injection Pen Kit"},{"label":"Pack Size","value":"40mg"}]',
  'Weight Loss',
  'Tirzepatide is a dual GLP-1 and GIP receptor agonist studied in metabolic research relating to glucose regulation and energy balance. This 40mg pen kit is supplied strictly for laboratory and in-vitro research use.',
  'Synedica Tirzepatide 40mg Pen Kit for laboratory research into GLP-1/GIP receptor pathways. Research use only.'
),

(
  'trt-hcg-injection-pen-kit',
  'Synedica TRT + HCG Injection Pen Kit',
  '£200.00',
  array[]::text[],
  'Injection Pen Kit',
  '/images/trt-hcg-injection-pen-kit-300.png',
  '/images/trt-hcg-injection-pen-kit-600.png',
  false,
  '[{"label":"Form","value":"Injection Pen Kit"}]',
  'Anabolic',
  'Synedica TRT + HCG Injection Pen Kit combines testosterone and human chorionic gonadotropin (hCG), studied together in endocrine research relating to hormone signalling pathways. Supplied strictly for laboratory and in-vitro research use.',
  'Synedica TRT + HCG Injection Pen Kit for laboratory endocrine research. Research use only — with batch documentation.'
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
  category = excluded.category,
  description = excluded.description,
  meta_description = excluded.meta_description;


-- ============================================================
-- SEO/GEO LONG-FORM CONTENT (quick answer, research sections, FAQ)
-- ============================================================

update products set
  quick_answer = 'The Biotin 40mg Injection Pen Kit supplies D-biotin (vitamin B7, CAS 58-85-5), a water-soluble cofactor for five known human biotin-dependent carboxylase enzymes. It is used in laboratory research into cellular metabolism and gene expression. This product is sold strictly for laboratory and in-vitro research use and is not licensed as a medicine.',
  content_sections = '[{"heading": null, "body": "Ask anyone who orders research compounds regularly in the UK and they''ll tell you the actual bottleneck isn''t finding a listing &mdash; it''s finding one backed by a batch-specific Certificate of Analysis that actually matches what arrives. Underdosed or mislabelled batches, vendors who go quiet after payment, COAs that turn out to be recycled from a different lot: these are recurring frustrations reported across UK research forums, and they''re exactly why sourcing verification matters as much as the molecule itself. This page sets out what the <strong>Biotin 40mg Injection Pen Kit</strong> is, what current research has established about biotin, and how to check what you''re buying before it reaches the bench."}, {"heading": "What Biotin Is", "body": "Biotin, also called vitamin B7 or vitamin H, is a small water-soluble organosulfur compound (molecular formula C10H16N2O3S) that functions as an essential cofactor for carboxylase enzymes. It was chemically characterised in the 1930s and has since become one of the most extensively studied coenzyme vitamins in biochemistry. In cells, biotin is covalently attached to carboxylase apoenzymes by the enzyme holocarboxylase synthetase, activating them for reactions central to fatty acid synthesis, amino acid catabolism, and gluconeogenesis."}, {"heading": "How Biotin Is Used in Laboratory Research", "body": "Biotin is studied both as a metabolic cofactor in its own right and as a chemical handle &mdash; its extremely high affinity for streptavidin/avidin underpins biotin-streptavidin labelling systems widely used in molecular biology, immunoassays, and protein-purification workflows. The <strong>Biotin 40mg Injection Pen Kit</strong> is supplied for this category of laboratory and in-vitro investigative work, not for any therapeutic application."}, {"heading": "What Current Research Says", "body": "Biotin''s core biochemistry is well established in the peer-reviewed literature, and research into its regulatory role continues. A 2019 review in the <em>Journal of Inherited Metabolic Disease</em> by León-Del-Río sets out biotin''s function in metabolism and gene expression, describing how biotin availability itself feeds back to regulate transcription of biotin-dependent carboxylases and biotin transporters (<a href=\"https://onlinelibrary.wiley.com/doi/10.1002/jimd.12073\" target=\"_blank\" rel=\"noopener noreferrer\">León-Del-Río, 2019, J Inherit Metab Dis</a>).<br /><br />The clinical-genetics literature provides a useful reference point for how tightly biotin metabolism is studied at the population level: a September 2025 StatPearls review states that biotinidase deficiency &mdash; a disorder of biotin recycling &mdash; occurs in approximately 1 in 61,067 live births, and identifies five known human biotin-dependent carboxylases as the functional basis of biotin''s role in metabolism (<a href=\"https://www.ncbi.nlm.nih.gov/books/NBK547751/\" target=\"_blank\" rel=\"noopener noreferrer\">Cervantes &amp; Daley, Biotin Deficiency, StatPearls/NCBI Bookshelf, updated 14 September 2025</a>). That figure is drawn from inherited-disorder epidemiology, not from any claim about supplementation outcomes &mdash; it illustrates how well-characterised the biotin-carboxylase system is as a research subject, which is precisely why it remains a standard reference compound in metabolic and molecular biology laboratories.<br /><br />Independent chemical identity data for biotin (CAS 58-85-5, molecular weight 244.31 g/mol) is publicly verifiable via <a href=\"https://pubchem.ncbi.nlm.nih.gov/compound/171548\" target=\"_blank\" rel=\"noopener noreferrer\">PubChem (CID 171548)</a>, which researchers can cross-check against any batch-specific analytical documentation supplied with an order."}, {"heading": "Purity and Certificate of Analysis Standards", "body": "Every batch is supplied with third-party analytical documentation rather than a single generic purity figure repeated across listings. A Certificate of Analysis (COA) should show the specific batch or lot number, the analytical method used (typically HPLC), the measured purity result for that batch, and the testing laboratory. Researchers are encouraged to cross-reference the compound identity shown on the COA (CAS number, molecular formula) against an independent chemical database such as PubChem before use."}, {"heading": "Sourcing and Verification", "body": "Buying research compounds from a UK-based supplier does not remove the need to verify what arrives. Before ordering, check that the listing states research-use status clearly, that batch documentation is offered rather than promised only \"on request,\" and that the compound identity (CAS number, molecular formula) is independently verifiable. The <strong>Biotin 40mg Injection Pen Kit</strong> is offered on this basis, with documentation available per batch rather than as a one-off marketing claim."}]'::jsonb,
  faq = '[{"question": "What is the Biotin 40mg Injection Pen Kit used for?", "answer": "It supplies D-biotin (vitamin B7) for laboratory and in-vitro research into biotin-dependent carboxylase activity, cellular metabolism, and biotin-streptavidin labelling applications. It is not sold for any therapeutic, dietary, or performance use."}, {"question": "Is it legal to buy biotin as a research chemical in the UK?", "answer": "UK researchers and laboratories can lawfully purchase compounds such as biotin when they are supplied and marketed strictly for research or in-vitro use rather than as a medicine. This product is not licensed under the <a href=\"https://www.legislation.gov.uk/uksi/2012/1916\" target=\"_blank\" rel=\"noopener noreferrer\">Human Medicines Regulations 2012 (SI 2012/1916)</a> and is not assessed by the MHRA for human safety or efficacy, so it must not be purchased for human or veterinary use."}, {"question": "What does the Certificate of Analysis (COA) show?", "answer": "A COA should confirm the batch number, the analytical testing method (typically HPLC), the measured purity for that specific batch, and the issuing laboratory. It allows a researcher to verify what a given batch actually contains rather than relying on a generic listing description."}, {"question": "How is the CAS number used to verify this compound?", "answer": "CAS 58-85-5 identifies D-biotin specifically. Researchers can cross-check this number, the molecular formula (C10H16N2O3S), and molecular weight (244.31 g/mol) against an independent database such as <a href=\"https://pubchem.ncbi.nlm.nih.gov/compound/171548\" target=\"_blank\" rel=\"noopener noreferrer\">PubChem (CID 171548)</a> to confirm chemical identity before use."}, {"question": "Does the product form (injection pen kit) affect the research application?", "answer": "The pen kit format is a delivery/packaging format only. This listing makes no dosing, administration, or reconstitution recommendations; researchers determine their own protocols in line with their institution''s research and safety governance."}, {"question": "How should the Biotin 40mg Injection Pen Kit be stored before use?", "answer": "Store according to the conditions printed on the batch documentation and product label, generally in cool, dry, dark conditions. Exact storage parameters and shelf life are batch-specific and confirmed on the accompanying documentation."}, {"question": "How does this differ from an MHRA-licensed medicine containing biotin?", "answer": "An MHRA-licensed medicine has been formally assessed for safety, quality, and efficacy for a specific human therapeutic use and carries a marketing authorisation. This product has not undergone that assessment, carries no marketing authorisation, and is supplied strictly for laboratory and in-vitro research &mdash; it is not an alternative to any licensed medicine."}, {"question": "What is holocarboxylase synthetase and why is it relevant to biotin research?", "answer": "Holocarboxylase synthetase is the enzyme that covalently attaches biotin to carboxylase apoenzymes, activating them. It is a frequently studied node in biotin metabolism research, including its role in feedback regulation of biotin-dependent gene expression (<a href=\"https://onlinelibrary.wiley.com/doi/10.1002/jimd.12073\" target=\"_blank\" rel=\"noopener noreferrer\">León-Del-Río, 2019</a>)."}, {"question": "Can this product be used in human or veterinary applications?", "answer": "No. It is sold strictly for laboratory and in-vitro research use. It is not a medicine, is not for human or veterinary use or consumption, is not licensed under the Human Medicines Regulations 2012, and has not been assessed by the MHRA for safety or efficacy."}, {"question": "Does Synedica UK ship the Biotin 40mg Injection Pen Kit within the UK?", "answer": "Yes, this product is offered for UK delivery to research buyers."}, {"question": "Where can I buy the Biotin 40mg Injection Pen Kit for research use?", "answer": "It is available for sale directly from Synedica UK, supplied with batch documentation and third-party testing for verified UK research buyers."}]'::jsonb,
  author_line = 'Synedica UK Science & QA Team',
  content_updated_at = '2026-08-29T00:00:00Z'
where slug = 'biotin-40mg-injection-pen-kit';
