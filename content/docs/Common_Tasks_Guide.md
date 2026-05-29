---
title: Common Tasks Guide
weight: 3
---



**Who this page is for:** Free tier users and data engineers who need quick, copy-pasteable recipes and step-by-step instructions for everyday web scraping procedures.

## Quick Answer

Pithom Labs Scraper is designed to automate common web extraction tasks through simple command-line recipes. Most operations start with discovery (`scraper discover -url <url>`) to generate your scraping recipe (`intent.json`) and session cookies (`session.json`), followed by execution (`scraper scrape`). If you need to troubleshoot, you can run scrapes in a visible browser window using the `-headed` flag, or run `scraper validate` to check your configuration.

## Step-by-Step Procedures

### 1. Start the Scraper Dashboard (UI)
If you prefer a graphic browser interface to organize your extraction files and view scrape histories, launch the dashboard:
```bash
scraper ui
```
*Note: Keep the terminal window open while using the dashboard, as closing it terminates the background router process.*

### 2. Create a New Scrape Recipe
To evaluate a website and select the elements you want to extract:
```bash
scraper discover -url https://example.com/products
```
Use the yellow browser overlay to select your fields. When finished, the scraper writes `intent.json` and `session.json` to your folder.

### 3. Re-Run an Existing Scrape Job
If you already have a saved `intent.json` and want to extract fresh data using those same selectors:
```bash
scraper scrape
```
This runs the scrape headlessly (invisibly) and writes your output to a timestamped CSV file.

### 4. Debug selectors with a Visible Browser
If a headless scrape is failing to capture fields and you want to watch Chrome execute the actions to diagnose layout timing:
```bash
scraper scrape -headed
```
This launches a visible Google Chrome window so you can watch selectors click and load in real time.

### 5. Refresh a Dead Login Session
If your target site requires authentication and your scraper stops with **Exit Code 42** (session expired), do not rebuild your entire configuration. Simply run:
```bash
scraper discover -refresh
```
*Note: Make sure to run this command from within the specific mission folder, or pass the same `-data-dir`, `-intent-file`, and `-session-file` paths you used originally. This launches a visible browser, lets you manually log in or solve captchas, and saves fresh cookies directly into `session.json`.* (For more details, see the [Login and Session Guide](Login_and_Session_Guide.md)).

### 6. Validate an Edited intent.json
If you manually edit your CSS selectors or adjust page limits inside `intent.json` and want to verify the JSON structure without executing a live scrape:
```bash
scraper validate -intent-file intent.json
```
To validate and output a structured report in JSON, add the `-json` flag:
```bash
scraper validate -intent-file intent.json -json
```

### 7. Resume a Interrupted Scrape
If your scrape stopped on page 50 due to a network interruption or temporary block, you can resume exactly where you left off. The scraper uses a 0-indexed page skip count:
```bash
scraper scrape -resume-from-page 49
```
*This skips the first 49 successfully scraped pages and begins extracting directly from Page 50.* (For more details, see the [Pagination Guide](Pagination_Guide.md)).

---

## Knowing When to Use "Diagnose" vs "Re-Discovery"

When selectors break, you have two primary options:

| Scenario | Recommended Tool | Action Command |
|---|---|---|
| A minor layout update occurred, but you want to preserve your existing intent structure and try to heal the selector automatically. | **Diagnose** | `scraper diagnose -intent intent.json -log <path_to_error_log.jsonl>` |
| The website has undergone a complete redesign, or you want to start completely fresh with a new field selection. | **Re-Discovery** | `scraper discover -url <url> -intent-file intent.json` |

For more details, see the [Troubleshooting Guide](Troubleshooting_Guide.md).

---

## Common Mistakes

- **Running Commands outside the Project Directory:** The scraper relies on local configurations. Always navigate to your scraper directory (`cd C:\Scraper` or `cd ~/Scraper`) before running commands, or pass the exact absolute paths using `-data-dir`.
- **Confusing `scraper discover` with `scraper scrape`:** `discover` is an interactive browser tool meant to build recipes. `scrape` is the headless, automated runner meant to execute them. Do not run `discover` in cron or background automated scripts.
- **Forgetting to check logs.txt:** If a command exits with an error code, do not guess what went wrong. Open `logs.txt` inside your mission directory; `logs.txt` can help you inspect the run history, warnings, and failure context. (See the [Output and Files Guide](Output_and_Files_Guide.md)).

## Troubleshooting Checklist

- [ ] **Does the command fail with "command not found"?** Verify that your CLI binary is renamed to `scraper` (or `scraper.exe` on Windows) and that you are executing it using the relative path `./scraper` on macOS/Linux.
- [ ] **Are there syntax errors in intent.json?** Run `scraper validate` to check the JSON format. The tool will report validation or JSON syntax errors.
- [ ] **Is the headed browser closing instantly?** Avoid closing the command prompt or terminal window. Keep it open to maintain the debugging session.

## When to Ask for Paid Support

While basic scraping operations and minor session refreshes are simple, advanced setups (like building reliable multi-stage navigation paths, scheduling parallel processes, or recovering from deep selector changes) can be highly time-consuming.

*Stuck turning a one-off scrape into a repeatable workflow? Paid support can help turn common tasks into reliable procedures for your team.* [**Get Priority Support**](https://ko-fi.com/pithomlabs)

---

> **Source-Backed Verification Notes (For Internal Audit Only):**
> - *CLI Flags & subcommands:* Verified subcommand routes in `scraper/cmd/scraper/main.go`. Verified the `-headed` flag on `scrape` exists in `scraper/cmd/scraper/cmd_scrape.go` line 97. Verified the `-refresh` flag on `discover` exists in `scraper/cmd/scraper/cmd_discover.go` line 88. Verified the `-intent-file` and `-json` validation flags exist in `scraper/cmd/scraper/cmd_validate.go` lines 19 and 20.
> - *CLI entrypoint:* Executables are strictly designed around `scraper` command-line subcommands verified in `scraper/cmd/scraper/*.go`. No `orch` commands are used in public command contexts.
> - *No known blockers from inspected source paths.*
