# Visual and functional review

## Devices inspected

- All six pages at 1920 × 1080 desktop, 820 × 1180 tablet and 390 × 844 phone.
- All six pages additionally checked for overflow at 320px width.
- Homepage additionally inspected at 2560 × 1440; root text 38px and hero headline 95px.
- No horizontal overflow found. Original and generated assets loaded successfully. Phone gallery was scrolled to the bottom to verify lazy-loaded images before final capture.

## Corrections after first screenshots

- Replaced angular hero divider with a smooth scalable curve.
- Fixed duplicate circular play outlines caused by an SVG class collision.
- Restored italic supporting text and italic wordmark styling.
- Added an accessible name to the mobile icon-only WhatsApp link.
- Retained complete source photo files; used the original crane/site photograph for the Construction service rather than enlarging a small letterboxed video frame.
- Removed unnecessary lossless re-encodes where untouched source JPEGs are smaller.

## Reference matching

All six pages retain the navy/cyan/white palette, content hierarchy, section order, cyan rules, photograph blocks, rounded frames, network hero/footer imagery and pale cyan office/contact sections. Company and Manpower retain the approved distinct replacement scenes. Gallery retains the 3/2/1 desktop composition and appends Construction.

The delivered website is a close responsive interpretation, not a pixel-identical raster reproduction. The mockup contains AI-reinterpreted photographs and no actual font metadata. The website uses authentic captured source photos, Plus Jakarta Sans as a visual match, larger touch targets, readable phone reflow, and the owner-requested Construction addition. These differences are visible in the supplied side-by-side comparisons.

## Behavior checks

- Browser: mobile menu opens and closes with Escape; Construction filter shows one scene; All restores seven; native FAQ expands; empty form submission remains on Contact and focuses Name.
- Automated: clean route redirects, query-string preservation, unique page metadata, one h1 per page, local asset/link existence, structured data parsing, canonical origin replacement, sitemap/robots, method restriction and security headers.
- WhatsApp message assembly and encoding tested in an isolated JavaScript context with a captured navigation target; no message was sent and no real enquiry data was entered.
- Seven automated tests passed locally with Node test isolation disabled because the Windows sandbox blocks subprocess spawning.

## Deployment validation

Local static build and browser preview succeeded. Local Wrangler dry-run could not execute because the Windows sandbox rejects its esbuild subprocess (`spawn EPERM`). The repository includes an Ubuntu GitHub Actions job that runs npm ci, build, tests and Wrangler dry-run. Check the Actions result before production deployment.

No Cloudflare production deployment was performed; the owner requested repository delivery for their own installation.
