# JF Borneo Global

Six-page Corporate Ocean website based on the approved ImageGen designs, with an added Construction manpower service. Built as crawlable static HTML with a small Cloudflare Worker for clean URLs, canonical origin replacement, sitemap and security headers. No database or API key is needed.

## Run locally

Requires Node.js 24 or later.

```sh
npm ci
npm run build
npm test
npm run dev
```

Open `http://127.0.0.1:4173`. This preview uses the same page content and clean route names. `npm run preview:worker` runs the Cloudflare runtime locally.

## Deploy on Cloudflare Workers

Connect this GitHub repository in **Workers & Pages → Create application → Import a repository**.

| Setting | Value |
| --- | --- |
| Root directory | Repository root |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Worker name | `jf-borneo-global` |
| Node version | `24` |

The project configuration is `wrangler.jsonc`. Assets are built into `dist/`; the Worker entry is `src/worker.mjs`. No secrets are required for the website. Cloudflare's repository connection handles deployment authentication. The GitHub workflow checks the build, behavior tests and a Wrangler dry-run; it does not deploy production.

For CLI deployment, authenticate your own Cloudflare account with `npx wrangler login`, then run `npm run deploy`.

Canonical URLs, social image URLs, robots.txt and sitemap.xml use the actual request origin automatically. When you attach a custom domain, use it as the primary site and redirect any alternate public host in Cloudflare. Submit the final domain's `/sitemap.xml` to Search Console.

## Pages and interactions

- `/` — homepage, work preview, three service categories.
- `/company` — director and Johor/Sarawak offices.
- `/manpower` — offshore, onshore and construction services; accessible FAQs.
- `/updates` — selected original TikTok posts.
- `/our-work` — filterable seven-scene gallery with original source links.
- `/contact` — labelled enquiry form, WhatsApp handoff and office addresses.

`.html` and trailing-slash page URLs redirect to their clean equivalents. Unknown URLs return a real 404. Form submission only opens a prepared WhatsApp message for the visitor to review; this website does not send, store or email enquiries.

## Design and accessibility

- Self-hosted Plus Jakarta Sans; Georgia for serif captions. The raster designs have no font metadata, so the sans face is a visual match.
- Fluid desktop typography: 18px minimum root, 33.6px at 1920px and 38px at 2560px. Mobile main body copy is 18px.
- AI-enhanced photo recreations, extracted original globe, ImageGen network background and detailed service illustrations.
- Hero parallax, hover zoom, illustrated icon motion, scroll reveals and progressive browser page transitions. Reduced-motion preferences disable these animations. Unsupported view transitions fall back to normal navigation.
- Keyboard menu, Escape dismissal, visible focus, accessible filter status, persistent field labels and native validation.

## Editing

Business details, metadata, source links and FAQs live in `src/content.mjs`. Page markup is generated in `scripts/build.mjs`; visual styling lives in `public/styles.css`, and browser interactions in `public/site.js`.

`docs/seo-research.md` contains keyword and competitor research. `docs/design-audit.md` and `docs/visual-review.md` document the reference comparison and known intentional differences. `design-references/` holds the approved artwork. Photo provenance and ImageGen prompts are in `docs/`.

All 12 displayed photos and video posters now use individually recreated ImageGen masters at 1536 × 1024. Responsive 768px and 1536px lossless WebP variants preserve the exact pixels at each exported size; smaller variants are intentionally resized. The full-size exports are pixel-verified against the PNG masters. These are AI interpretations, not restored documentary evidence or exact identity reproductions. The original source links remain available. Earlier JPEG files are retained for provenance. Backgrounds and icons retain their existing lossless exports. See `docs/image-quality-upgrade.md` and `src/enhanced-media.json`. There is no claim of 100% pixel equivalence or guaranteed search/AI rankings.
