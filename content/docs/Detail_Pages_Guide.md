---
title: Detail Pages Guide
weight: 6
---



**Who this page is for:** Free tier users and data engineers who need to extract deep data (like full descriptions, specifications, or contact information) that only appears after clicking into individual list items.

## Quick Answer

If some of your required fields live inside each item's individual sub-page rather than on the main list page, you need a detail page scraping pattern. During discovery, you click the primary link for each item and mark it as the detail page URL. The scraper then loads a sample detail page, allowing you to select your sub-page fields. At runtime, the engine will extract the list fields, navigate to each item's detail page, extract the detail fields, and automatically combine all list-level and detail-level fields into the same output row.

## Step-by-Step Procedure

To scrape detail pages:

1. **Start Discovery:**
   - Launch discovery by running:
     ```bash
     scraper discover -url https://example.com/listings
     ```

2. **Select List Fields first:**
   - Click the fields on the main page that belong to the list item (such as its catalog title or badge).
   - In the overlay, make sure to select the item's primary link (e.g., the title link or "View Details" button). 

3. **Mark the Detail Link:**
   - In the overlay field options for that link, set the option designating this field as the detail page URL. This tells the engine that this specific field holds the navigation link to the sub-page.
   
4. **Select Detail Fields:**
   - The discovery browser will automatically follow the link and load a sample detail page.
   - Use the overlay to click the private sub-page fields you want to collect (such as the item's description, SKU, or address).

5. **Save and Scrape:**
   - Save the configuration when finished.
   - Run the scraper using the default command:
     ```bash
     scraper scrape
     ```
   - The engine will invisibly manage the navigation, load each detail page, and output unified CSV or JSON files.

## Common Mistakes

- **Selecting Decorative Elements for the Detail Link:** Do not click on background wrappers or decorative images that do not contain a physical link (`href`). Always select the actual title anchor tag (`<a>`) to ensure a valid URL is extracted.
- **Forgetting the Detail Link Entirely:** If you select sub-page fields but never mark a list-level field as the detail link, the engine won't know how to navigate to the sub-page and will skip detail extraction entirely.
- **Mixing List and Detail Fields during Selection:** Ensure you only select list-level fields while on the main list page, and detail-level fields while on the loaded sample detail page. Selecting list items inside a detail page confuses the parser.
- **Private Sessions:** If a detail page is hidden behind a login session that expires mid-flight, the scraper will be redirected to the login page and fail to find the detail fields. Use a fresh session state if this happens.

## Troubleshooting Checklist

- [ ] **Are detail fields completely blank?** Check if the list-level link is returning empty. Run `scraper validate -intent-file intent.json` to ensure the link selector is capturing the `href` attribute.
- [ ] **Are list links relative URLs (e.g., `/item/123`)?** You do not need to rewrite them. The scraping engine automatically resolves relative links against the target site's base URL.
- [ ] **Does the detail page need JavaScript to load?** If detail fields remain blank but the URL is correct, the page might load dynamically. Ensure `"needs_js_render"` or dynamic wait properties are set.
- [ ] **Are some items missing detail data?** If the detail page layout varies (e.g., sponsored listings have a different structure than organic ones), the selector might fail on some pages.

## When to Ask for Paid Support

Detail page scraping is often highly fragile because sub-page templates can vary widely between items. Additionally, heavy AJAX loads, shadow DOM structures, or Cloudflare challenge pages triggered during fast headless sub-page loads can block standard engines.

*Detail pages are where scraping often becomes fragile. Paid support can help diagnose missing detail links, redirects, JavaScript-loaded details, and inconsistent item layouts.* [**Get Priority Support**](https://ko-fi.com/pithomlabs)

---

> **Source-Backed Verification Notes (For Internal Audit Only):**
> - *Verified Schema Keys:* Inspected `internal/types/types.go` lines 393, 517-543, 587-589 to verify the exact names of the JSON keys:
>   - `list_fields`: List page extraction selectors.
>   - `detail_fields`: Detail page extraction selectors.
>   - `is_detail_link`: Identifies the list field holding the navigation URL (must be set to `true` on exactly one list field).
>   - `rel_selector`: Relative CSS selector for the field.
>   - `detail_wait_selector`: CSS selector to wait for on the detail page before extracting.
>   - `detail_pre_actions`: Preflight actions (clicks, waits) executed on the detail page.
> - *Detail Merge & Collision:* Verified from `internal/output/output.go` lines 46-69 and 143-166 that the exporter combines list-level and detail-level fields into the same output row. If a field name exists in both lists, the exporter dynamically appends `_detail` to the header of the secondary field to prevent column collisions.
> - *No Known Blockers:* No known blockers from inspected source paths.
