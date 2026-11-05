# Blog and gallery update — 6 November 2026

The approved Corporate Ocean blog listing and detail compositions are implemented as `/blog` plus ten complete, crawlable article routes. Articles cover quotation preparation, offshore cost factors, shutdown planning, construction enquiries, offshore/onshore differences, supplier selection, document checks, welding, short-term maintenance and workforce estimation.

Search supports multiple words and category filtering. Four cards appear per page; the featured guide is shown separately on the first unfiltered page. All ten article links and content exist in server-rendered HTML without JavaScript. Detail pages include a contents navigation, related reading, enquiry links, unique metadata, canonical URLs, BlogPosting schema and sitemap entries. No fabricated prices, accreditations or promises of availability are included. CIDB and OPITO are linked where relevant; requirements must be checked for each project.

The featured photo was recreated separately with ImageGen at 1536 × 1024 and exported as lossless 768px and 1536px WebP. AI imagery is identified in captions. Existing high-quality original masters were reused elsewhere.

Gallery scenes 06 and 07 now each occupy half the desktop grid instead of a thin full-width banner. Images use a 1.7 aspect ratio (1.5 on phones), correct responsive source sizing and focal placement. On a 2560px screen each large card is about 1103px wide and selects the 1536px source. This avoids stretching a 1536px asset across a 2200px banner. Gallery descriptions have an 18px minimum.

Visual checks covered 390px phone, 820px tablet, 1440px desktop and 2560px large desktop. No horizontal overflow or broken images were found. Article body copy is 19px on phone/tablet and approximately 33px at 2560px. Functional browser checks covered search, filters, pagination and empty-state reset. Ten automated checks cover all 17 pages, schema, links, routing, sitemap, search, pagination and WhatsApp handoff. Full-page screenshots and approved-versus-built comparisons are supplied separately in the delivery folder.

Intentional differences from raster mockups: full readable article text makes detail pages longer; the featured image is an individual high-quality generated photo; real article titles and counts replace sample design copy. No pixel-perfect or ranking guarantee is claimed.

To edit articles use `src/blog.mjs`; layouts are in `scripts/blog-views.mjs`, styles in `public/blog.css`, and filtering in `public/blog.js` / `public/blog-state.js`.
