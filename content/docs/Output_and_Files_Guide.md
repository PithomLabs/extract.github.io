---
title: Output and Files Guide
weight: 8
---




**Who this page is for:** Free tier users and data engineers who need to manage scraped files, understand output formats, and integrate extracted data into spreadsheet software or automation databases.

## Quick Answer

When you start a scraping job, Pithom Labs Scraper creates a dedicated mission data directory that contains all the files needed for extraction. By default, your final extracted data is saved to a spreadsheet-compatible CSV file (pre-configured with a UTF-8 Byte Order Mark to ensure special characters open correctly in Excel and Google Sheets). The engine also supports exporting data as a standard JSON array using the `-format json` flag.

## Step-by-Step Procedure

### 1. Locate Your Mission Folder
All scraping operations are organized inside a data directory (defaulting to the `missions/` folder). A standard mission folder contains:
- `intent.json`: The "recipe" file containing your target URL, CSS selectors, pagination controls, and active settings.
- `session.json`: Active login cookies and browser fingerprint state used to authenticate scrapes.
- `logs.txt`: A detailed, human-readable execution log showing real-time network and extraction events.

### 2. Export to Your Preferred Format
Choose your output format using the `-format` command flag when starting a scrape:
- **Exporting to CSV (Default):**
  ```bash
  scraper scrape -format csv
  ```
  This creates a spreadsheet-ready file named `output_YYYYMMDD_HHMMSS.csv` in your mission directory (or a custom path passed via `-output`).
- **Exporting to JSON:**
  ```bash
  scraper scrape -format json
  ```
  This exports a clean, indented JSON array containing all extracted rows.

### 3. Open CSV Files in Excel or Google Sheets
- **Google Sheets:** Select **File** → **Import** → **Upload** and drop your CSV file. Google Sheets will automatically read the columns.
- **Microsoft Excel:** Double-click the file. The CSV writer includes a UTF-8 BOM to help Excel recognize non-ASCII characters correctly. If columns are not split, use **Data** → **From Text/CSV** and select **comma** as the delimiter.

### 4. Share Files Safely
If you need to share mission files with support or colleagues:
- **Review Recipe First:** `intent.json` is usually safer than `session.json`, but review it first because it may contain private URLs, field names, search paths, or recorded actions.
- **Keep Sessions Private:** **Never share `session.json` publicly.** It contains raw active cookies and security tokens that could allow others to access your accounts. Redact or exclude it when posting logs in public forums.

## Common Mistakes

- **Requesting Unsupported Format Combinations:** Do not use `-format both`. It is not a supported output mode. Use `-format csv` or `-format json` only; unsupported values may fail or behave differently depending on the command path.
- **Opening JSON in Spreadsheet Tools:** Trying to force Excel or Google Sheets to open a raw JSON array will result in formatting errors. Always use CSV for spreadsheets, and reserve JSON for database scripts.
- **Manually Editing session.json:** Modifying user-agent fields or cookie strings inside `session.json` breaks the fingerprint signature, causing target sites to flag the browser as a suspicious bot.
- **Losing Track of Output Paths:** If you run multiple scrapes in a row without specifying a custom name via the `-output` flag, the scraper will generate new timestamped filenames (e.g. `output_20260529_120000.csv`) to prevent overwriting your previous data. Keep an eye on your mission folder to locate the latest file.

## Troubleshooting Checklist

- [ ] **Are special characters corrupted (e.g. "Ã©" instead of "é")?** Ensure your spreadsheet reader is set to UTF-8 encoding. The scraper's built-in UTF-8 BOM is designed to help Excel recognize these characters instantly.
- [ ] **Is the output JSON not a single array?**
  - If you capture the progressive streaming logs, the engine writes in **JSON Lines** format (`.jsonl`) for crash safety, writing one independent JSON object per line.
  - The final export file generated at the end of a successful run is written as a standard **JSON array** (`.json`).
- [ ] **Are there duplicate columns (like price and price_detail)?** This is expected. If you scraped the same field name on both the list page and detail page, the detail field will have `_detail` appended to prevent columns from overwriting.

## When to Ask for Paid Support

Integrating scraping outputs into corporate data pipelines, setting up auto-sync scripts to push CSVs directly to Google Drive, converting JSON Line streams into real-time SQL database feeds, or managing automated file rotators can become technically complex.

*Need help turning scraper output into a reliable workflow? Paid support can help organize mission folders, automate recurring runs, and integrate CSV/JSON output into your business process.* [**Get Priority Support**](https://ko-fi.com/pithomlabs)

---

> **Source-Backed Verification Notes (For Internal Audit Only):**
> - *Supported Formats:* Verified from `cmd/scraper/helpers.go` lines 301-328 that the supported output formats are strictly `"csv"` and `"json"`.
> - *Excel BOM:* Verified from `internal/output/output.go` line 17 (`utf8BOM = []byte("\xEF\xBB\xBF")`) and line 40 that the CSV writer writes a UTF-8 BOM directly to the output stream.
> - *JSON Array vs Lines:* Verified from `internal/output/output.go` line 121 and `StreamWriter` lines 217-230 that standard JSON exports are formatted as indented JSON arrays, while streaming runs progressively output JSON Lines.
> - *Mission Folders & Diagnostics:* Verified from `cmd/scraper/cmd_scrape.go` lines 816-845 that critical failures write a `failure_snapshot.html` and `scrape_failure.jsonl` inside a generated `diagnostics_YYYYMMDD_HHMMSS/` folder. Verified from `internal/lifecycle/run.go` line 754 that `logs.txt` is the default execution log in the mission directory.
> - *No Known Blockers:* No known blockers from inspected source paths.
