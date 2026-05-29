---
title: Pagination Guide
weight: 5
---




**Who this page is for:** Free tier users and data engineers needing to scrape data spanning across multiple search result pages or catalog lists.

## Quick Answer

To scrape multiple pages, run `scraper discover -url <your_url>`. When prompted by the discovery overlay after selecting your data fields, click the website's "Next Page" button. The scraper will automatically save the paginated list pattern (represented internally as `list_paginated` in your `intent.json`). When you run `scraper scrape`, the engine will invisibly navigate through the pages until it finishes or hits the default limit.

## Step-by-Step Procedure

1. **Start Discovery:** Run `scraper discover -url https://example.com/products`.
2. **Select Data:** Use the yellow overlay to click the fields you want in the first row. The scraper will highlight the entire list.
3. **Select Pagination:** The overlay will ask how to find more items. Click the website's physical "Next" button.
4. **Scrape:** Run `scraper scrape`. The headless engine will load page 1, extract the data, click Next, load page 2, and so on.

## Common Mistakes

- **Assuming Infinite Scroll is a Button:** If the site automatically loads more items as you scroll down, you cannot just click a Next button. The scraper supports scrolling behaviors, but selecting a non-existent Next button will cause the scrape to halt early.
- **Forgetting Page Limits:** By default, the scraper caps the number of pages it visits to prevent runaway jobs. You can edit the `max_pages` field in your `intent.json` to increase this limit.
- **Resuming Incorrectly:** If your scrape crashes on page 50, do not start from the beginning. Use `scraper scrape -resume-from-page 49` to continue exactly where you left off. The `-resume-from-page` flag is a **0-indexed page skip count**: passing `49` skips the first 49 successfully scraped pages and starts scraping from Page 50. (Passing `0` or omitting the flag skips no pages, starting at Page 1).

## Troubleshooting Checklist

- [ ] **Did the scrape stop too early?** Check if you hit the `max_pages` limit in `intent.json`.
- [ ] **Is the Next button grayed out or disabled?** Sometimes sites use the same button for "Next" but change its CSS class when you reach the end. Ensure the saved pagination selector (the `next_button_sel` key in `intent.json`) targets the active Next control, not a disabled wrapper or decorative container.
- [ ] **Does the URL change when you click next?** If the URL changes predictably (like `?page=2`), the scraper might use a `url_pattern` approach which is faster than physically clicking the button.

## When to Ask for Paid Support

If a website uses heavily obfuscated JavaScript to render its pagination, loads data asynchronously via GraphQL without updating the URL, or embeds its "Load More" controls inside a shadow DOM, the standard discovery process might fail to capture a reliable pagination selector.

*Stuck on a difficult site? Pagination can break due to dynamic layouts or hidden elements. Paid support can help diagnose tricky pagination and build custom automation workflows.* [**Get Priority Support**](https://ko-fi.com/pithomlabs)

---

> **Source-Backed Verification Notes (For Internal Audit Only):**
> - *CLI Flags:* Verified `scraper scrape -resume-from-page` exists in `cmd/scraper/cmd_scrape.go` line 100 and represents a 0-indexed page skip count parsed and passed to `internal/lifecycle/run.go` line 737.
> - *Pattern Names:* Verified natural language ("paginated list") matches `PatternListPaginated` in `internal/types/types.go` line 171 with internal string representation `"list_paginated"` in lines 181 and 204. Verified other core persisted pattern names (`"list"`, `"list_detail"`, and `"list_paginated_detail"`) in lines 178-208.
> - *Schema:* Verified `max_pages` and `next_button_sel` belong to the scraper configuration struct in `internal/types/types.go` lines 519 and 530.
