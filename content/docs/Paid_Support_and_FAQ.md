---
title: Paid Support and FAQ Guide
weight: 11
---



**Who this page is for:** Free tier users looking to resolve common questions, and professional teams who need custom setups, priority support, or assistance with difficult websites.

## Quick Answer

Pithom Labs Scraper is a free-to-use, standalone tool designed to extract web data locally. While standard sites, simple pagination, and basic sessions can be configured independently using our guides, paid support offers speed, certainty, and engineering expertise for complex projects. Before submitting a support request, assemble your target details, review your `intent.json` for private content, and ensure you are fully authorized to access the target site.

---

## Ethical Boundaries of Paid Support

We maintain a strict professional code of conduct. Paid support is available **strictly** for authorized workflows.
- **What We Support:** Legitimate business automation, extraction of publicly facing catalog data, automated integration with your internal databases, and authenticated scraping of accounts you own or are explicitly authorized to access.
- **What We Do NOT Support:** We will never assist in bypassing paywalls, evading private subscription walls, scraping websites you are unauthorized to access, or violating target sites' terms of service or applicable privacy laws. All support requests are subject to pre-screening.

---

## Pre-Support Packaging Checklist

If you are stuck on a difficult layout and need to submit a ticket, please package the following items. This allows us to diagnose your issue in seconds without requesting additional files:

1. **Target URL:** The starting URL of your scrape (if it is publicly shareable).
2. **Data Description:** A clear description of the fields you are attempting to extract.
3. **Intent Configuration (`intent.json`):**
   - *Review First:* The `intent.json` file is usually safer than `session.json`, but review it first because it may contain private URLs, field names, search paths, or recorded actions. Make sure to redact any sensitive queries or values before sharing.
4. **Forensics Log (`logs.txt`):** The execution log saved in your mission directory.
5. **Diagnostics Bundle (If available):**
   - The stashed `failure_snapshot.html` and `scrape_failure.jsonl` files located inside your timestamped `diagnostics_YYYYMMDD_HHMMSS/` folder.
6. **Safety Warning:** **Never share `session.json` or active cookies.** These contain raw credentials and browser session keys. Our support team will never ask for your cookies or password.

---

## Troubleshooting Decision Tree

Use this simple logic tree to locate the correct guide or decide if paid support is needed:

```
[Is the extracted output empty or blank?]
   ├── Yes: [Is it Exit Code 42 (Auth Required)?]
   │           ├── Yes: Open the "Login_and_Session_Guide.md" to refresh cookies.
   │           └── No:  [Check list_fields or rel_selector in "Detail_Pages_Guide.md"].
   └── No:  [Did the scrape stop after exactly one page?]
               ├── Yes: [Check max_pages or resume offsets in "Pagination_Guide.md"].
               └── No:  [Are special characters corrupted in Excel?]
                           ├── Yes: See "Output_and_Files_Guide.md" (BOM imports).
                           └── No:  Ready to use!
```

---

## Consolidated FAQs

#### Q1: What is the default output format of Pithom Labs Scraper?
**A:** The default format is CSV. You can change this to JSON using the `-format json` CLI flag.

#### Q2: Can I get both CSV and JSON output from a single run?
**A:** No. The scraper processes a single output stream. Do not use `-format both` as it is not a supported output mode. Use `-format csv` or `-format json` only; unsupported values may fail or behave differently depending on the command path.

#### Q3: Why does Excel show strange characters like "Ã©" in my CSV?
**A:** Excel is likely opening the file in a non-UTF-8 encoding. The scraper's CSV writer includes a UTF-8 BOM to help Excel recognize non-ASCII characters correctly. Try importing the CSV using **Data** → **From Text/CSV** and select **UTF-8** as the file origin.

#### Q4: What does Exit Code 3 mean?
**A:** Exit Code 3 usually means the scraper could not confirm the expected page structure, often because of structural drift, missing selectors, skeleton loading, or hydration timing. See the [Troubleshooting Guide](Troubleshooting_Guide.md).

#### Q5: What does Exit Code 42 mean?
**A:** This is the scraper's standard auth required signal. It means your login session has expired or the site is blocking access, requiring a cookie refresh. See the [Login and Session Guide](Login_and_Session_Guide.md).

#### Q6: How do I refresh an expired login session?
**A:** Navigate to your mission folder and run `scraper discover -refresh`. Log into the site in the visible window, and the scraper will save fresh cookies to `session.json` without destroying your selectors.

#### Q7: Can I manually edit cookies inside `session.json`?
**A:** It is highly discouraged. The `session.json` file binds your cookies to a specific browser User-Agent fingerprint. Manually editing it can break this parity, causing target sites to flag and block your headless runs.

#### Q8: Does Pithom Labs Scraper support infinite scroll?
**A:** If your target uses infinite scroll, configure it during discovery if the overlay offers that mode. Test with a small item/page limit first.

#### Q9: Is the detail link selector same as a regular text selector?
**A:** No. Prefer selecting the actual clickable link or anchor that leads to the detail page. Avoid decorative wrappers unless the scraper clearly captures a valid detail URL. The `is_detail_link: true` field in `intent.json` enables sub-page navigation.

#### Q10: How does the scraper handle duplicate column names between list and detail fields?
**A:** To prevent data collisions, the exporter automatically appends `_detail` to the header of the sub-page field (e.g. `price` from the list page and `price_detail` from the detail page).

#### Q11: What is `logs.txt` used for?
**A:** It is a human-readable execution log written inside your mission directory during standalone scrapes. Use it to audit request failures, timeouts, or selector drift.

#### Q12: Where are failure snapshots saved?
**A:** If a scrape fails with a critical error, a timestamped directory `diagnostics_YYYYMMDD_HHMMSS/` is created containing `failure_snapshot.html` (the DOM snapshot) and `scrape_failure.jsonl` (the JSON line error log).

#### Q13: Does the scraper automatically generate a file named `scrapelog.jsonl`?
**A:** No. The engine does *not* write a file named `scrapelog.jsonl`. This name only appears as a CLI placeholder in command examples.

#### Q14: How do I run a scrape in visible mode to debug selectors?
**A:** Run `scraper scrape -headed` (or pass `-headless=false`). This launches visible Google Chrome so you can watch the scraper navigate, click, and extract.

#### Q15: What is the `-resume-from-page` flag for?
**A:** It is a 0-indexed page skip count used to resume interrupted pagination runs. For example, passing `-resume-from-page 49` skips the first 49 successfully scraped pages and resumes directly at Page 50.

#### Q16: How do I limit Chrome's memory usage during large crawls?
**A:** Keep your render pool size low. The `-pool-size <int>` flag controls the number of parallel tabs Chrome opens. A lower value (e.g., `-pool-size 1`) uses significantly less RAM.

#### Q17: Can `-auto-diagnose` repair all selector failures?
**A:** No. While `-auto-diagnose` can attempt automatic diagnosis/repair on supported recoverable failures (such as minor CSS class updates), it is not a guaranteed self-healing mechanism and cannot automatically fix major website redesigns.

#### Q18: What is `-event-stream` used for?
**A:** With `-event-stream`, structured events are emitted to stdout as JSON Lines; automated scripts can redirect or capture that stream to feed real-time monitoring dashboards.

#### Q19: Does the scraper support automated scheduling?
**A:** The scraper does not need to manage the scheduler itself; your OS scheduler (like cron on Linux or Windows Task Scheduler) can run the public `scraper scrape` command at specified intervals.

#### Q20: How do I prevent target websites from blocking my automated scrapes?
**A:** Set polite delay rules (such as a custom `rate_limit` or stabilizing `timeout` properties) inside `intent.json` to prevent sending requests too quickly.

#### Q21: Can I manually add standard transform properties into intent.json?
**A:** No. Do not manually add `transforms` keys to your fields in `intent.json`. The engine silently ignores this key, as text modifications are computed internally based on selected attribute types.

#### Q22: Should I use `rel_selector` or `selector` in my field recipes?
**A:** Always use `rel_selector` instead of `selector` when defining field paths in your `intent.json` list configuration. `rel_selector` ensures the extraction is relative to the parent container item.

#### Q23: Why are my detail pages blank during a scrape?
**A:** This usually happens if the detail page requires JavaScript and Chrome is not rendering properly, or if the page layout changed. Try running with `-headed` to inspect the sub-page structure.

#### Q24: How does the scraper resolve relative links?
**A:** The scraping engine automatically detects relative links (such as `/product/123`) and resolves them against the target website's base URL (e.g., converting it to `https://example.com/product/123`).

#### Q25: Can I share `session.json` with technical support?
**A:** **No.** You should never share `session.json` or active cookies. Review `intent.json` first as well because it may contain private URLs or recorded search paths, but it is generally much safer to share than session cookies.

---

## When to Ask for Paid Support

Paid support helps you get from "the tool works" to "this workflow is reliable for my business." 

While individual developers can resolve standard issues using our public guides, corporate data pipelines, complex authentication patterns, custom self-healing automations, and anti-bot hardening require dedicated expert support.

*Stuck on a difficult target layout or setting up automated enterprise flows? Get in touch with our team for priority support.* [**Get Priority Support**](https://ko-fi.com/pithomlabs)

---

> **Source-Backed Verification Notes (For Internal Audit Only):**
> - *Exit Codes:* Verified `3` (Drift/Skeleton), `4` (Detail Failure), and `42` (Auth) are returned by the scraper main binary entrypoint in `scraper/cmd/scraper/main.go`.
> - *CLI Flags & subcommands:* Verified `-output` (registered in `scraper/cmd/scraper/cmd_scrape.go` line 90), `-refresh` (`scraper/cmd/scraper/cmd_discover.go` line 88), `-headed` (`scraper/cmd/scraper/cmd_scrape.go` line 97), `-resume-from-page` (`scraper/cmd/scraper/cmd_scrape.go` line 100), `-event-stream` (`scraper/cmd/scraper/cmd_scrape.go` line 108), `-session-stdin` (`scraper/cmd/scraper/cmd_scrape.go` line 99), `-auto-diagnose` (`scraper/cmd/scraper/cmd_scrape.go` line 113), and `-format` (`scraper/cmd/scraper/cmd_scrape.go` line 91) subcommands and defaults.
> - *No known blockers from inspected source paths.*
