# Approved design audit

Reference images: six PNGs in `design-references/`. These are the approved Corporate Ocean raster compositions; no editable font or layout source was supplied.

## Before implementation

| Page | Elements to preserve | Implementation plan |
| --- | --- | --- |
| Home | Navy header, globe and italic wordmark, split hero, cyan curved divider, team crop, lower network, photo caption, two work cards, service illustrations, pale cyan contact strip, network footer | Reuse original team/work images, extract supplied globe, reconstruct responsive layout, generate missing network backdrop and detailed service icons |
| Company | Same split hero with briefing image, direct-contact row, numbered office cards, meeting strip | Retain distinct replacement photographs, cyan rules, serif supporting captions and navy headings |
| Manpower | Navy text hero, curved cyan edge, alternating photo/text rows, cyan corner brackets, scope lines, project steps, three accordions | Match two original service rows and append Construction in same pattern |
| Updates | Navy hero, team feature with play control, two feed cards, gallery banner | Link every image/control to the recorded original TikTok post |
| Contact | Network hero, dark director card beside enquiry form, cyan office background, email strip | Real labels and validation; WhatsApp handoff only after user action |
| Gallery | Navy text-only hero, filter pills, 3/2/1 gallery grid, play controls on video posts, cyan caption rules | Preserve all six scenes, append a construction scene, implement keyboard-accessible filters |

## Measurements and typography

- Content approximately 90% of reference width; header 3.7rem, split hero approximately 19.6rem, text hero 14.7rem; service photos approximately 12.6rem high.
- Font visually matched with self-hosted Plus Jakarta Sans, weights 400–800; Georgia italic for the serif supporting lines. ImageGen raster lettering has no verifiable font metadata, so this is a visual match, not an identified original font file.
- Responsive root text: 18px minimum, 1.75vw fluid desktop, 38px maximum. Mobile main copy remains 18px. Small metadata has explicit readable minimums.
- Home and Company split photos use the same asymmetric cyan divider; thin lines, rounded frames and cyan brackets are retained.
- Original TikTok source photographs replace AI interpretations embedded in the design. This preserves actual source content, but means generated faces, expanded photo backgrounds and framing cannot be pixel-identical.
- Intentional changes: Construction service and gallery entry; persistent form labels; accessible mobile navigation; larger touch targets and readable phone typography; Contact link in footer.

## Asset policy

Original photographs are reused. The supplied globe is extracted with a circular alpha mask. ImageGen generated only the missing standalone navy network backdrop and three matching detailed service illustrations. Basic phone, email, location, play and WhatsApp marks are crisp SVG paths matching their depicted silhouettes.

Lossless WebP assets are verified by decoding and comparing pixel values. This avoids additional compression loss; it cannot restore detail absent from the supplied source captures. See `asset-audit.json` and `imagegen-prompts.json`.

## Screenshot review

Review evidence and final outcomes are recorded in `visual-review.md` after desktop/tablet/phone captures. No claim of pixel-perfect equivalence should be made: readable responsive reflow and the approved Construction addition intentionally change page heights.
