# UI Design Spec — Project v2

> Structural and layout reference for Next.js rebuild. Content below describes the generic page structure, component patterns, and design tokens only. All product-specific copy has been replaced with neutral placeholders — swap in real content and images later.

## Design Tokens

**Typography**
- Headings: `Montserrat`, bold (700)
  - H1: ~27px
  - H2: ~26px (used on colored backgrounds, white text)
  - H3: ~20px
- Body: `Inter`, regular (400), 16px
- Link color: `#334862` (dark navy-gray)

**Color Palette**
- Primary accent (buttons, highlights): `#55B80D` (green)
- Secondary accent (CTA banner background): `#237C75` (teal)
- Tertiary accent (secondary buttons/badges): `#E87349` (orange)
- Text (body): `#777777`
- Text (headings): `#555555`
- Background (sections): `#FFFFFF` / `#F1F1F1` (light gray divider sections)

**Buttons**
- Rectangular-to-pill shaped, uppercase bold text
- Variants: solid (primary green), outline (white/transparent), text link, pill-shaped (CTA banner)

---

## Page Structure (top to bottom)

### 1. Top Utility Bar
- Language selector (flag icon + dropdown) — far left
- Social icons — far left edge
- Phone number + "Free shipping" message — centered

### 2. Header
- Logo — left
- Search bar — center (rounded input, icon button)
- Account icon + Cart icon with running total — right

### 3. Primary Navigation
- Horizontal menu bar below header
- Light gray background, uppercase links
- Items: Products, My Account, Contact, How to Pay, Privacy Policy, Wholesale

### 4. Trust Strip
- Full-width dark teal banner
- Three columns: company/location tag | star rating + review count | shipping/returns message

### 5. Alert Banner (reusable component)
- Rounded card, colored background
- Bold warning-style headline
- 1–2 lines body text
- Small subtext/link below

### 6. Hero Section
- Two-column layout
  - Left: eyebrow tag, large bold headline, one paragraph, three CTA buttons (primary solid, outline, text link)
  - Right: large lifestyle photo with a floating smaller image overlapping the bottom corner

### 7. Category Tabs
- Section heading + subtext
- Horizontal row of 4 rounded-corner cards (image + label)

### 8. Feature/Benefit Block
- Section heading + horizontal divider line
- 2-column layout of subheading + paragraph blocks (repeated twice, alternating)

### 9. Product Carousel ("Latest on Sale")
- Section header with "Browse all" link
- 5-across product card grid
- Each card: category tag, thumbnail image, title, price/price-range, action button ("Select Options" / "Add to Cart")

### 10. Alternating Text/Image Feature Rows
- Repeated 2-column sections, image alternates left/right
- Each: heading, paragraph(s), "Explore" link/button

### 11. CTA Banner
- Full-width teal background
- Centered bold headline + subtext
- Two pill-shaped buttons side by side (white/outline + orange)

### 12. FAQ Section
- 2-column layout
  - Left: decorative graphic/label
  - Right: accordion list (heading + expandable Q&A rows with chevron icons)

### 13. Blog/Articles Carousel
- Section heading
- 3-across card carousel with prev/next arrows
- Each card: date badge overlay on image, title, excerpt text

### 14. Footer
- Small payment-method badge row
- Simple horizontal link list (mirrors primary nav)
- Centered copyright line

---

## Image Placeholders (to be replaced later)

- `hero-main.jpg`
- `hero-secondary.jpg`
- `category-1.jpg` … `category-4.jpg`
- `feature-1.jpg`
- `feature-2.jpg`
- `product-thumb-1.jpg` … `product-thumb-5.jpg`
- `blog-1.jpg` … `blog-3.jpg`
- `logo.svg`
- Payment badge icons (e.g. `payment-badge-1.svg`, `payment-badge-2.svg`)

---

## Notes for Implementation (Next.js)

- Suggested component breakdown: `Header`, `TopBar`, `NavBar`, `TrustStrip`, `AlertBanner`, `Hero`, `CategoryTabs`, `FeatureBlock`, `ProductCarousel`, `ProductCard`, `FeatureRow`, `CTABanner`, `FAQAccordion`, `BlogCarousel`, `BlogCard`, `Footer`
- All copy in this document is placeholder/structural only — replace with your own product content
- Consider mobile breakpoints: stack all 2-column sections to single column, collapse product/blog carousels to horizontal scroll or 1–2 per view
