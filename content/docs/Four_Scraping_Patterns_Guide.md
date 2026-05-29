---
title: Four Scraping Patterns Guide
weight: 4
---




**Who this page is for:** Free tier users and data engineers who need to understand how to structure their web scraping recipes to match a website's layout.

## Quick Answer

Pithom Labs Scraper recognizes four common patterns of web layout. When you run `scraper discover`, the choices you make on our overlay automatically assign one of these shapes to your scrape recipe. Choosing the correct pattern ensures the engine knows whether to collect a single page, navigate across multiple pages, click into detailed item sub-pages, or do both. If your scraped rows are empty or cut off too early, you likely selected the wrong shape during discovery.

## Step-by-Step Procedure

To choose and configure the right pattern for your target site:

1. **Evaluate the Target Website:**
   - **Is it a single flat list?** If all your items fit on one page without clicking "Next" or navigating to sub-pages (e.g., a simple today's weather list), you need a **simple list**.
   - **Does the list span multiple pages?** If the items are spread across page numbers or have a "Next" button (e.g., standard search results), you need a **paginated list**.
   - **Is critical data hidden inside each item's page?** If you need detailed descriptions, specifications, or contact info that only appears after clicking an item (e.g., a property listing directory), you need a **list with detail pages**.
   - **Does it have both?** If you have multiple pages of results AND need to click into every item's sub-page (e.g., a complete product catalog), you need a **paginated list with detail pages**.

2. **Run Discovery:**
   - Launch the interactive discovery tool by running `scraper discover -url <your_target_url>`.

3. **Select Your Elements in the Overlay:**
   - **For a Simple List:** Select your target fields on the list page. When the overlay asks how to find more items, select "No Pagination."
   - **For a Paginated List:** Select your fields, then click the website's physical "Next" button when prompted by the pagination setup.
   - **For Detail Pages:** Select your fields on the list page, making sure to select the item's main link (e.g., the title link). In the overlay, mark this field as the detail page URL. The overlay will then navigate to a sample detail page so you can select the additional sub-page fields.
   - **For Paginated Detail Pages:** Complete both the pagination "Next" button selection and mark the detail page URL link as described above.

4. **Verify and Run:**
   - Run `scraper validate -intent-file intent.json` to check your configuration.
   - Run `scraper scrape` to execute the extraction.

## Common Mistakes

- **Selecting a Simple List for Paginated Sites:** If you select "No Pagination" during discovery on a search results page, the scraper will only collect the first page of items and immediately exit successfully with Code 0.
- **Forgetting the Detail Link:** If you need sub-page data but fail to click and mark the item's link as the detail page URL during discovery, the scraper will only extract the shallow list-level fields and will never navigate to the sub-pages.
- **Using Pagination on Static Single Pages:** Do not click unrelated buttons (like "View More Products" that just link to a different section) as a pagination "Next" button. This will cause the scraper to navigate away or halt with timing errors.
- **Overlooking Dynamic Items:** If list items load dynamically via infinite scroll, selecting a traditional Next button is a mistake. Set up dynamic scroll boundaries in discovery instead.

## Troubleshooting Checklist

- [ ] **Are your output rows empty?** Check if you ran a detail page pattern but the link selector returned empty strings. The scraper cannot navigate to detail pages without a valid link.
- [ ] **Did the scrape stop after exactly one page?** Open your saved `intent.json` and verify if the pattern is configured for pagination. If it is set to a simple list shape, it will exit after page 1.
- [ ] **Is the engine clicking unrelated links?** Re-run discovery. Make sure the detail link strictly targets the primary anchor tag (`<a>`) of each row rather than decorative wrappers.
- [ ] **Are detailed fields missing?** Check if you mixed list-level fields and detail-level fields incorrectly without setting up the sub-page navigation path.

## When to Ask for Paid Support

Selecting the right layout pattern is straightforward for standard catalogs, but modern web applications often mix shapes in complex ways. Sites may load search results dynamically via AJAX while embedding hidden detail cards, or they may lock detail pages behind IP-sensitive tokens. 

*Not sure which pattern your site uses? Paid support can help classify the site, avoid wrong setup decisions, and build a reliable scraping workflow.* [**Get Priority Support**](https://ko-fi.com/pithomlabs)

---

> **Source-Backed Verification Notes (For Internal Audit Only):**
> - *Pattern Mappings:* Verified from `internal/types/types.go` lines 170-174 and 176-188 that the scraper supports four core shapes represented by `ScrapePattern` constants, which serialize to the following exact string values in the saved `intent.json` configuration:
>   - Simple List: `"list"`
>   - Paginated List: `"list_paginated"`
>   - List with Detail Pages: `"list_detail"`
>   - Paginated List with Detail Pages: `"list_paginated_detail"`
> - *CLI entrypoint:* Executables are strictly designed around `scraper` command-line subcommands verified in `cmd/scraper/*.go`. No `orch` commands are used in public command contexts.
> - *No Known Blockers:* No known blockers from inspected source paths.
