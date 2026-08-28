-- Run this once in your Supabase project's SQL editor
-- (Database > SQL Editor > New query).
--
-- This migration keeps all existing products, prices, images, orders,
-- variants, RLS policies, storage and site settings unchanged.
--
-- It only adds SEO/content fields to the products table and updates
-- the Biotin 40mg Injection Pen Kit product content.


-- ============================================================
-- SEO CONTENT FIELDS
-- ============================================================

alter table products add column if not exists primary_keyword text;
alter table products add column if not exists description text;
alter table products add column if not exists seo_content text;
alter table products add column if not exists meta_title text;
alter table products add column if not exists meta_description text;
alter table products add column if not exists page_title text;
alter table products add column if not exists seo_keywords text[];


-- ============================================================
-- BIOTIN 40MG INJECTION PEN KIT
-- SEO / GEO PRODUCT CONTENT
-- ============================================================

update products
set
  primary_keyword = 'Biotin 40mg Injection Pen Kit',

  description = 'Biotin 40mg Injection Pen Kit supplied strictly for laboratory and in-vitro research use. Biotin, also known as vitamin B7, is a water-soluble vitamin and cofactor involved in biotin-dependent carboxylase reactions. This product is not a medicine and is not for human or veterinary use or consumption.',

  meta_title = 'Biotin 40mg Injection Pen Kit | Synedica Labs UK',

  meta_description = 'Biotin 40mg Injection Pen Kit for laboratory research, with batch documentation and third-party testing. Shop research-grade Biotin today.',

  page_title = 'Biotin 40mg Injection Pen Kit | Research Use',

  seo_keywords = array[
    'Biotin 40mg Injection Pen Kit',
    'Biotin 40mg UK',
    'Biotin research UK',
    'Biotin laboratory research',
    'Biotin research use only',
    'Biotin CAS 58-85-5',
    'Biotin molecular weight',
    'Vitamin B7 research',
    'Biotin COA',
    'Biotin Certificate of Analysis',
    'Biotin research-grade',
    'Biotin laboratory supplier',
    'Biotin UK supplier'
  ],

  seo_content = $seo$

<h1>Biotin 40mg Injection Pen Kit</h1>

<div class="quick-answer">
<strong>Quick answer:</strong> The Biotin 40mg Injection Pen Kit contains biotin, also known as vitamin B7, a water-soluble cofactor involved in biotin-dependent carboxylase reactions. Biotin has been investigated in biochemical and cellular research involving enzyme function, metabolism and gene regulation. This product is supplied strictly for laboratory and in-vitro research use.
</div>

<p><strong>Research-use notice:</strong> This product is sold strictly for laboratory and in-vitro research use. It is not a medicine, is not for human or veterinary use or consumption, is not licensed as a medicine under the Human Medicines Regulations 2012, and has not been assessed by the MHRA for safety or efficacy as a medicinal product.</p>

<h2>Biotin 40mg Injection Pen Kit for laboratory research</h2>

<p>The Biotin 40mg Injection Pen Kit is supplied as a research material for laboratories requiring biotin for controlled laboratory and in-vitro research.</p>

<p>For research buyers, identifying the compound is only the first step. A reliable purchasing decision also depends on traceability, batch documentation, chemical identity and clear separation between research materials and medicinal products.</p>

<p>Biotin is also known as vitamin B7 and vitamin H. PubChem identifies biotin as CAS 58-85-5, with molecular formula C10H16N2O3S and molecular weight 244.31 g/mol. <a href="https://pubchem.ncbi.nlm.nih.gov/compound/171548" rel="nofollow noopener">PubChem, Biotin record</a>.</p>

<p>The product supplied by Synedica Labs UK is intended strictly for laboratory and in-vitro research. Nothing on this page should be interpreted as a recommendation for human or veterinary administration.</p>

<h3>What is Biotin?</h3>

<p>Biotin is a water-soluble vitamin and biochemical cofactor. Scientific literature has examined biotin-dependent carboxylases and their involvement in biochemical pathways including gluconeogenesis, fatty-acid synthesis and amino-acid catabolism.</p>

<p>A review by Alfonso León-Del-Río published in the <em>Journal of Inherited Metabolic Disease</em> on 19 March 2019 examined biotin-dependent carboxylases and the molecular biology of biotin metabolism. <a href="https://pubmed.ncbi.nlm.nih.gov/30746739/" rel="nofollow noopener">León-Del-Río, Journal of Inherited Metabolic Disease, 2019</a>.</p>

<p>Earlier research has also investigated relationships between biotin and gene expression. A review by Rodríguez-Meléndez and Zempleni published in the <em>Journal of Nutritional Biochemistry</em> examined evidence concerning regulation of gene expression by biotin. <a href="https://pubmed.ncbi.nlm.nih.gov/14690760/" rel="nofollow noopener">Rodríguez-Meléndez &amp; Zempleni, Journal of Nutritional Biochemistry</a>.</p>

<h3>What current research says about Biotin</h3>

<p>Current scientific literature describes biotin primarily in terms of biochemical cofactor activity and its relationship with biotin-dependent enzymes. Research has also examined mechanisms connecting biotin status with cellular regulation and gene expression.</p>

<p>These research findings describe experimental scientific literature. They should not be interpreted as evidence that the Synedica Labs UK research product treats, cures, prevents or improves any human or veterinary condition.</p>

<p>For researchers evaluating biotin as a laboratory material, the chemical identity can be independently cross-checked against PubChem, which records CAS 58-85-5 and a molecular weight of 244.31 g/mol. <a href="https://pubchem.ncbi.nlm.nih.gov/compound/171548" rel="nofollow noopener">PubChem: Biotin</a>.</p>

<h3>Biotin research applications</h3>

<p>Biotin has been investigated in laboratory research involving biotin-dependent carboxylase activity, biochemical metabolism, protein chemistry, biotinylation and mechanisms of gene regulation.</p>

<p>The scientific relevance of biotin therefore extends beyond its common nutritional name. For laboratory researchers, the compound can be considered in the context of enzyme systems and molecular biology rather than as a consumer health product.</p>

<p>Research should always distinguish between an experimentally investigated mechanism and a demonstrated clinical outcome. This product is supplied solely for laboratory and in-vitro research.</p>

<h3>Biotin 40mg specifications</h3>

<table>
<thead>
<tr>
<th>Specification</th>
<th>Biotin 40mg Injection Pen Kit</th>
</tr>
</thead>
<tbody>
<tr>
<td>Research compound</td>
<td>Biotin</td>
</tr>
<tr>
<td>Common names</td>
<td>Vitamin B7 / Vitamin H</td>
</tr>
<tr>
<td>CAS number</td>
<td>58-85-5</td>
</tr>
<tr>
<td>Molecular formula</td>
<td>C10H16N2O3S</td>
</tr>
<tr>
<td>Molecular weight</td>
<td>244.31 g/mol</td>
</tr>
<tr>
<td>Product quantity</td>
<td>40mg</td>
</tr>
<tr>
<td>Product form</td>
<td>Injection Pen Kit</td>
</tr>
<tr>
<td>Intended use</td>
<td>Laboratory and in-vitro research only</td>
</tr>
<tr>
<td>Purity</td>
<td>Refer to the applicable batch Certificate of Analysis</td>
</tr>
<tr>
<td>Batch-testing method</td>
<td>Refer to the applicable batch Certificate of Analysis</td>
</tr>
<tr>
<td>Storage temperature</td>
<td>Follow the current product label and batch documentation</td>
</tr>
<tr>
<td>Shelf life</td>
<td>Follow the applicable batch documentation</td>
</tr>
</tbody>
</table>

<p>PubChem identifies biotin as CAS 58-85-5, molecular formula C10H16N2O3S and molecular weight 244.31 g/mol. <a href="https://pubchem.ncbi.nlm.nih.gov/compound/171548" rel="nofollow noopener">PubChem chemical record</a>.</p>

<p>Product-specific purity, analytical testing, storage requirements and shelf life should not be inferred from general chemical databases. Researchers should use the documentation applicable to the actual batch supplied.</p>

<h3>Biotin versus related research compounds</h3>

<p>Biotin is chemically different from peptide research compounds. Biotin is a small-molecule vitamin and biochemical cofactor rather than a peptide sequence.</p>

<p>This distinction is relevant when selecting analytical methods and evaluating laboratory documentation. Chemical identity, molecular structure, batch information and analytical results should be considered together when assessing a research material.</p>

<h2>Purity, COA and batch verification</h2>

<p>A Certificate of Analysis provides batch-specific quality information that allows a laboratory to compare the material received with the supplier's documented specification.</p>

<p>Depending on the product and analytical specification, a COA may contain information such as compound identity, batch number, analytical method, assay or purity result, test date and release information.</p>

<p>Researchers should verify that the batch number shown on the COA corresponds with the material received. Product-specific purity figures should always be taken from the current batch documentation rather than assumed from a generic catalogue description.</p>

<p>See the <a href="[internal: Certificate of Analysis page]">Certificate of Analysis and batch verification page</a> for further information.</p>

<h2>Sourcing Biotin 40mg for UK research</h2>

<p>For UK laboratories, sourcing a research material should involve more than comparing product names and prices. Chemical identity, documentation, traceability and clearly stated intended use are all relevant when assessing a supplier.</p>

<ul>
<li>Confirm that the material is explicitly supplied for laboratory or in-vitro research.</li>
<li>Check the chemical identity and CAS number.</li>
<li>Request or review the applicable batch Certificate of Analysis.</li>
<li>Match the batch number on the COA with the material received.</li>
<li>Review the documented storage and handling requirements.</li>
<li>Ensure the product is not being represented as a medicine.</li>
<li>Ensure the intended use is laboratory or in-vitro research rather than human or veterinary use.</li>
</ul>

<p>See the <a href="[internal: Synedica Labs UK research-use policy]">Synedica Labs UK research-use policy</a> for the supplier's research-use position.</p>

<p>For delivery and handling information, see the <a href="[internal: UK delivery and storage FAQ]">UK research product delivery and storage FAQ</a>.</p>

<h2>Storage and laboratory handling</h2>

<p>Storage requirements should be taken from the current product documentation and applicable batch information rather than copied from an unrelated biotin formulation.</p>

<p>Researchers should retain the original product identification, batch information and applicable documentation as part of their laboratory records.</p>

<p>If the applicable storage conditions, expiry information or batch documentation are unclear, the supplier should be contacted before the material is incorporated into a research workflow.</p>

<p>This page does not provide dosing amounts, injection frequency, reconstitution-for-injection instructions or cycling protocols.</p>

<h2>Is Biotin 40mg a medicine?</h2>

<p>No. The Biotin 40mg Injection Pen Kit described on this page is supplied strictly as a laboratory and in-vitro research material.</p>

<p>It is not a medicine, is not for human or veterinary use or consumption, is not licensed as a medicine under the Human Medicines Regulations 2012, and has not been assessed by the MHRA for safety or efficacy as a medicinal product.</p>

<p>Regulatory requirements can depend on the product, presentation, intended purpose, claims and circumstances of supply. Researchers and organisations are responsible for ensuring that their activities comply with applicable UK requirements.</p>

<h2>Biotin 40mg research FAQ</h2>

<h3>What is Biotin 40mg Injection Pen Kit?</h3>
<p>The Biotin 40mg Injection Pen Kit is a research-format product containing biotin, also known as vitamin B7. Biotin is a biochemical cofactor investigated in laboratory research involving biotin-dependent carboxylases and related molecular pathways.</p>

<h3>What is Biotin studied for?</h3>
<p>Biotin has been investigated in biochemical research involving enzyme cofactor activity, cellular metabolism, biotinylation and mechanisms associated with gene regulation.</p>

<h3>What is the CAS number for Biotin?</h3>
<p>The CAS number for biotin is 58-85-5. PubChem lists biotin under CID 171548. <a href="https://pubchem.ncbi.nlm.nih.gov/compound/171548" rel="nofollow noopener">PubChem</a>.</p>

<h3>What is the molecular weight of Biotin?</h3>
<p>Biotin has a molecular weight of 244.31 g/mol according to the PubChem chemical record. <a href="https://pubchem.ncbi.nlm.nih.gov/compound/171548" rel="nofollow noopener">PubChem Biotin record</a>.</p>

<h3>Is Biotin 40mg Injection Pen Kit a medicine?</h3>
<p>No. It is supplied strictly for laboratory and in-vitro research. It is not a medicine and is not for human or veterinary use or consumption.</p>

<h3>Is Biotin 40mg licensed by the MHRA?</h3>
<p>This research product is not presented by Synedica Labs UK as an MHRA-licensed medicine and has not been assessed by the MHRA for safety or efficacy as a medicinal product.</p>

<h3>Can I buy Biotin 40mg for research in the UK?</h3>
<p>Research organisations should ensure that any purchase and intended use comply with applicable UK requirements. Buyers should verify the research-use status, product documentation and batch information before purchase.</p>

<h3>What does a COA show for Biotin?</h3>
<p>A Certificate of Analysis is batch-specific documentation that may identify the material, batch number, analytical method, assay or purity result, test date and release information.</p>

<h3>How can I verify a Biotin research product?</h3>
<p>Researchers can compare the product identity, CAS number, batch number and applicable COA. The chemical identity can also be cross-checked against authoritative databases such as PubChem.</p>

<h3>How should Biotin 40mg be stored?</h3>
<p>Storage should follow the current product label and batch-specific documentation. Storage requirements should not be assumed from unrelated biotin products or formulations.</p>

<h3>Is this Biotin product for human use?</h3>
<p>No. The product is strictly for laboratory and in-vitro research and is not for human or veterinary use or consumption.</p>

<h3>Does Synedica provide batch documentation?</h3>
<p>Researchers should review the applicable batch documentation supplied for the material and ensure that the batch number on the documentation corresponds with the product received.</p>

<h3>How is research-use Biotin different from an MHRA-licensed medicine?</h3>
<p>A research-use product is supplied for laboratory or research purposes and is not presented as a medicinal product. An MHRA-authorised medicine is subject to the applicable regulatory authorisation process for its approved medicinal use. These categories should not be treated as interchangeable.</p>

<h3>Can Biotin 40mg be used in clinical research?</h3>
<p>Any proposed research involving human participants requires the appropriate regulatory, ethical and institutional approvals. This product page does not authorise human administration and the product is supplied strictly for laboratory and in-vitro research.</p>

<h3>Is the 40mg specification a dosing recommendation?</h3>
<p>No. The 40mg figure identifies the product quantity stated by the supplier. It is not a recommendation for human or veterinary administration.</p>

<h2>Research-use statement</h2>

<p><strong>The Biotin 40mg Injection Pen Kit is supplied strictly for laboratory and in-vitro research use.</strong> It is not a medicine, is not for human or veterinary use or consumption, is not licensed as a medicine under the Human Medicines Regulations 2012, and has not been assessed by the MHRA for safety or efficacy as a medicinal product.</p>

<p>No information on this page constitutes medical advice, treatment advice, dosing advice or instructions for human administration.</p>

<h2>Further research resources</h2>

<p>Researchers can review authoritative chemical information through <a href="https://pubchem.ncbi.nlm.nih.gov/compound/171548" rel="nofollow noopener">PubChem's Biotin record</a>.</p>

<p>Scientific background is available through the 2019 review by Alfonso León-Del-Río in the <em>Journal of Inherited Metabolic Disease</em>, published 19 March 2019, concerning biotin-dependent carboxylases and biotin metabolism. <a href="https://pubmed.ncbi.nlm.nih.gov/30746739/" rel="nofollow noopener">PubMed: León-Del-Río, 2019</a>.</p>

<p>Research concerning regulation of gene expression by biotin is reviewed by Rodríguez-Meléndez and Zempleni in the <em>Journal of Nutritional Biochemistry</em>. <a href="https://pubmed.ncbi.nlm.nih.gov/14690760/" rel="nofollow noopener">PubMed: Regulation of gene expression by biotin</a>.</p>

<p>For related research materials, see the <a href="[internal: Recovery research products category]">Recovery research products category</a>.</p>

<p>For complementary laboratory materials, see the <a href="[internal: NAD+ and NMN research product]">NAD+ and NMN research product</a> and <a href="[internal: BPC-157 and TB-500 research product]">BPC-157 and TB-500 research product</a>.</p>

<p>For quality documentation, see the <a href="[internal: Certificate of Analysis page]">Certificate of Analysis and quality assurance page</a>.</p>

<p><strong>Byline:</strong> Synedica Labs UK Science &amp; QA Team [author: QA lead name]</p>

<p><strong>Last updated:</strong> 28 August 2026</p>

<p><strong>Recommended refresh:</strong> Refresh statistics, scientific examples and regulatory references by 28 November 2026.</p>

<h3>Keyword tags</h3>

<p>Biotin 40mg Injection Pen Kit, Biotin 40mg UK, Biotin research UK, Biotin laboratory research, Biotin research use only, Biotin CAS 58-85-5, Biotin molecular weight, Vitamin B7 research, Biotin COA, Biotin Certificate of Analysis, Biotin research-grade, Biotin laboratory supplier, Biotin UK supplier</p>

<h3>SEO metadata</h3>

<p><strong>Meta Title:</strong> Biotin 40mg Injection Pen Kit | Synedica Labs UK</p>

<p><strong>Meta Description:</strong> Biotin 40mg Injection Pen Kit for laboratory research, with batch documentation and third-party testing. Shop research-grade Biotin today.</p>

<p><strong>Optimised Page Title:</strong> Biotin 40mg Injection Pen Kit | Research Use</p>

$seo$

where slug = 'biotin-40mg-injection-pen-kit';


-- ============================================================
-- UPDATE THE EXISTING PRODUCT SPECS
-- ============================================================

update products
set
  specs = '[
    {"label":"Research Compound","value":"Biotin"},
    {"label":"Common Name","value":"Vitamin B7 / Vitamin H"},
    {"label":"CAS Number","value":"58-85-5"},
    {"label":"Molecular Weight","value":"244.31 g/mol"},
    {"label":"Pack Size","value":"40mg"},
    {"label":"Form","value":"Injection Pen Kit"},
    {"label":"Intended Use","value":"Laboratory and in-vitro research use only"},
    {"label":"Human Use","value":"Not for human or veterinary use or consumption"},
    {"label":"Medicinal Status","value":"Not a medicine and not licensed as a medicine under the Human Medicines Regulations 2012"},
    {"label":"MHRA Status","value":"Not assessed by the MHRA for medicinal safety or efficacy"},
    {"label":"COA","value":"Refer to applicable batch Certificate of Analysis"},
    {"label":"Storage","value":"Follow current product label and batch documentation"},
    {"label":"Shelf Life","value":"Follow applicable batch documentation"}
  ]'::jsonb
where slug = 'biotin-40mg-injection-pen-kit';


-- ============================================================
-- PRODUCT SCHEMA / FAQ SCHEMA / ARTICLE SCHEMA
--
-- Stored separately so the frontend can output it inside:
-- <script type="application/ld+json">...</script>
--
-- This field is intentionally kept separate from seo_content.
-- ============================================================

alter table products add column if not exists schema_jsonld jsonb;


update products
set schema_jsonld = jsonb_build_object(
  '@context', 'https://schema.org',
  '@graph', jsonb_build_array(

    jsonb_build_object(
      '@type', 'Product',
      '@id', '[canonical-product-url]#product',
      'name', 'Biotin 40mg Injection Pen Kit',
      'description', 'Biotin 40mg Injection Pen Kit supplied strictly for laboratory and in-vitro research use. Contains biotin, also known as vitamin B7. CAS 58-85-5. Not a medicine and not for human or veterinary use or consumption.',
      'sku', 'biotin-40mg-injection-pen-kit',
      'category', 'Laboratory Research Material',
      'brand', jsonb_build_object(
        '@type', 'Brand',
        'name', 'Synedica Labs UK'
      )
    ),

    jsonb_build_object(
      '@type', 'Article',
      '@id', '[canonical-product-url]#article',
      'headline', 'Biotin 40mg Injection Pen Kit | Research Use',
      'description', 'Research-focused information covering Biotin 40mg Injection Pen Kit, chemical identity, laboratory research context, specifications, COA verification and UK research-use status.',
      'dateModified', '2026-08-28',
      'author', jsonb_build_object(
        '@type', 'Organization',
        'name', 'Synedica Labs UK Science & QA Team'
      ),
      'publisher', jsonb_build_object(
        '@type', 'Organization',
        'name', 'Synedica Labs UK'
      )
    ),

    jsonb_build_object(
      '@type', 'FAQPage',
      '@id', '[canonical-product-url]#faq',
      'mainEntity', jsonb_build_array(

        jsonb_build_object(
          '@type', 'Question',
          'name', 'What is Biotin 40mg Injection Pen Kit?',
          'acceptedAnswer', jsonb_build_object(
            '@type', 'Answer',
            'text', 'The Biotin 40mg Injection Pen Kit is a research-format product containing biotin, also known as vitamin B7. Biotin is a biochemical cofactor investigated in laboratory research involving biotin-dependent carboxylases and related molecular pathways.'
          )
        ),

        jsonb_build_object(
          '@type', 'Question',
          'name', 'What is Biotin studied for?',
          'acceptedAnswer', jsonb_build_object(
            '@type', 'Answer',
            'text', 'Biotin has been investigated in biochemical research involving enzyme cofactor activity, cellular metabolism, biotinylation and mechanisms associated with gene regulation.'
          )
        ),

        jsonb_build_object(
          '@type', 'Question',
          'name', 'What is the CAS number for Biotin?',
          'acceptedAnswer', jsonb_build_object(
            '@type', 'Answer',
            'text', 'The CAS number for biotin is 58-85-5.'
          )
        ),

        jsonb_build_object(
          '@type', 'Question',
          'name', 'What is the molecular weight of Biotin?',
          'acceptedAnswer', jsonb_build_object(
            '@type', 'Answer',
            'text', 'Biotin has a molecular weight of 244.31 g/mol according to the PubChem chemical record.'
          )
        ),

        jsonb_build_object(
          '@type', 'Question',
          'name', 'Is Biotin 40mg Injection Pen Kit a medicine?',
          'acceptedAnswer', jsonb_build_object(
            '@type', 'Answer',
            'text', 'No. It is supplied strictly for laboratory and in-vitro research. It is not a medicine and is not for human or veterinary use or consumption.'
          )
        ),

        jsonb_build_object(
          '@type', 'Question',
          'name', 'Is Biotin 40mg licensed by the MHRA?',
          'acceptedAnswer', jsonb_build_object(
            '@type', 'Answer',
            'text', 'This research product is not presented by Synedica Labs UK as an MHRA-licensed medicine and has not been assessed by the MHRA for safety or efficacy as a medicinal product.'
          )
        ),

        jsonb_build_object(
          '@type', 'Question',
          'name', 'Can I buy Biotin 40mg for research in the UK?',
          'acceptedAnswer', jsonb_build_object(
            '@type', 'Answer',
            'text', 'Research organisations should ensure that any purchase and intended use comply with applicable UK requirements. Buyers should verify the research-use status, product documentation and batch information before purchase.'
          )
        ),

        jsonb_build_object(
          '@type', 'Question',
          'name', 'What does a COA show for Biotin?',
          'acceptedAnswer', jsonb_build_object(
            '@type', 'Answer',
            'text', 'A Certificate of Analysis is batch-specific documentation that may identify the material, batch number, analytical method, assay or purity result, test date and release information.'
          )
        ),

        jsonb_build_object(
          '@type', 'Question',
          'name', 'How can I verify a Biotin research product?',
          'acceptedAnswer', jsonb_build_object(
            '@type', 'Answer',
            'text', 'Researchers can compare the product identity, CAS number, batch number and applicable COA. The chemical identity can also be cross-checked against authoritative databases such as PubChem.'
          )
        ),

        jsonb_build_object(
          '@type', 'Question',
          'name', 'How should Biotin 40mg be stored?',
          'acceptedAnswer', jsonb_build_object(
            '@type', 'Answer',
            'text', 'Storage should follow the current product label and batch-specific documentation. Storage requirements should not be assumed from unrelated biotin products or formulations.'
          )
        ),

        jsonb_build_object(
          '@type', 'Question',
          'name', 'Is this Biotin product for human use?',
          'acceptedAnswer', jsonb_build_object(
            '@type', 'Answer',
            'text', 'No. The product is strictly for laboratory and in-vitro research and is not for human or veterinary use or consumption.'
          )
        ),

        jsonb_build_object(
          '@type', 'Question',
          'name', 'Does Synedica provide batch documentation?',
          'acceptedAnswer', jsonb_build_object(
            '@type', 'Answer',
            'text', 'Researchers should review the applicable batch documentation supplied for the material and ensure that the batch number on the documentation corresponds with the product received.'
          )
        ),

        jsonb_build_object(
          '@type', 'Question',
          'name', 'How is research-use Biotin different from an MHRA-licensed medicine?',
          'acceptedAnswer', jsonb_build_object(
            '@type', 'Answer',
            'text', 'A research-use product is supplied for laboratory or research purposes and is not presented as a medicinal product. An MHRA-authorised medicine is subject to the applicable regulatory authorisation process for its approved medicinal use.'
          )
        ),

        jsonb_build_object(
          '@type', 'Question',
          'name', 'Can Biotin 40mg be used in clinical research?',
          'acceptedAnswer', jsonb_build_object(
            '@type', 'Answer',
            'text', 'Any proposed research involving human participants requires the appropriate regulatory, ethical and institutional approvals. This product is supplied strictly for laboratory and in-vitro research.'
          )
        ),

        jsonb_build_object(
          '@type', 'Question',
          'name', 'Is the 40mg specification a dosing recommendation?',
          'acceptedAnswer', jsonb_build_object(
            '@type', 'Answer',
            'text', 'No. The 40mg figure identifies the product quantity stated by the supplier. It is not a recommendation for human or veterinary administration.'
          )
        )

      )
    )
  )
)

where slug = 'biotin-40mg-injection-pen-kit';
