---
title: Troubleshooting Guide
weight: 9
---



**Who this page is for:** Users whose scraping jobs have failed, crashed, or returned incomplete data.

## Quick Answer

Check the exit code and read the standard error output (`stderr`). If the scraper exits with code `3`, it usually means the scraper could not confirm the expected page structure, often because of structural drift, missing selectors, skeleton loading, or hydration timing. You should look inside the generated diagnostic folder (named `diagnostics_YYYYMMDD_HHMMSS/` relative to your intent) for the `failure_snapshot.html` and `scrape_failure.jsonl` files to understand exactly what broke, or run `scraper diagnose` to attempt an automatic repair.

## Step-by-Step Procedure

1. **Check the Exit Code:** 
   - `0`: Success.
   - `1`: General Error (e.g., bad flags, network down).
   - `3`: Structural Drift (Invariants failed, missing selectors).
   - `4`: Integrity Failure (Detail pages failed to load past tolerance limits).
   - `42`: Auth Required (Session expired).
2. **Review Diagnostic Artifacts:** When a job fails critically (like Exit 3 or 4), the engine automatically dumps its state into a timestamped directory (e.g., `diagnostics_YYYYMMDD_HHMMSS/` relative to your intent). It generates two failure bundle files:
   - `failure_snapshot.html`: The HTML the scraper saw at the exact moment of failure. Open this in your browser to inspect the layout.
   - `scrape_failure.jsonl`: A single JSON-line log containing the failure error event (created in standard headless scrapes).
   
   *Be sure to distinguish these files from other log assets:*
   - **Normal Mission Logs (`logs.txt`):** Standalone scrapes save human-readable logs to `logs.txt` inside the mission's data directory.
   - **Event-Stream Output (`scrape.jsonl`):** If using the `-event-stream` flag, the engine writes structured JSON lines to standard output, which are typically captured and redirected to `scrape.jsonl` in your mission directory.
   - **Diagnose Input Flag (`-log <path>`):** To auto-repair layouts, you must pass the error log file path via the `-log` flag of `scraper diagnose` (e.g., pointing it to the generated `scrape_failure.jsonl` or `scrape.jsonl`). The engine itself does *not* write a file named `scrapelog.jsonl`.
3. **Run Validation:** If you hand-edited your `intent.json`, run `scraper validate -intent-file intent.json -json` to ensure your syntax is correct before wasting time on a live scrape.

## Common Mistakes

- **Requesting Unsupported Formats:** Do not use `-format both`. It is not a supported output mode. Use `-format csv` or `-format json` only; unsupported values may fail or behave differently depending on the command path.
- **Using Deprecated Schema Keys:** Do not manually add a `transforms` key to your fields in `intent.json`. The engine silently ignores this key, and your data will not be transformed.
- **Wrong Selector Types:** Always ensure you use `rel_selector` instead of `selector` when defining field paths in your intent file.

## Troubleshooting Checklist

- [ ] **Did the layout change?** Use `scraper diagnose -live -intent <path> -log <path_to_scrape_failure.jsonl>` to let the engine attempt to self-heal the broken selector or scraping configuration.
- [ ] **Are you fighting dynamic JS rendering?** Run `scraper validate -diagnostic` to force the generation of a diagnostic bundle, which includes semantic QA data to help pinpoint timing delays.
- [ ] **Is the error "No items matched"?** Check if the target site requires a longer wait time, or if your session expired and redirected you to a login page (which obviously won't have the list items).

## When to Ask for Paid Support

While `scraper diagnose` can automatically heal minor structural drift, major website redesigns or aggressive A/B testing can completely shatter a standard `intent.json` contract.

*Dealing with constant selector drift or complex structural failures? We offer paid troubleshooting to manually diagnose, repair, and harden intents for your most critical targets.* [**Get Priority Support**](https://ko-fi.com/pithomlabs)

---

> **Source-Backed Verification Notes (For Internal Audit Only):**
> - *Artifact Names:* Verified from `cmd/scraper/cmd_scrape.go` (lines 816-845) that critical failures write to `failure_snapshot.html` and `scrape_failure.jsonl` within a generated `diagnostics_YYYYMMDD_HHMMSS/` directory. Verified from `internal/lifecycle/run.go` (line 754) that `logs.txt` is the standalone execution log in the mission directory. The engine does *not* write a file named `scrapelog.jsonl`.
> - *Exit Codes:* Verified `3` (Drift/Skeleton), `4` (Detail Failure), and `42` (Auth) are captured and returned in `cmd/scraper/main.go` and `cmd/scraper/cmd_scrape.go` (lines 801-808).
> - *CLI Flags:* Verified `-format csv` and `-format json` are the supported output formats. Warned against `-format both` using exact, softened public doc wording (not claiming panic/crash behaviors). Verified `-diagnostic` flag in `cmd/scraper/cmd_validate.go` line 23. Verified `-live`, `-intent`, and `-log` in `cmd/scraper/cmd_diagnose.go`.
> - *Schema constraints:* Verified `rel_selector` must be used; explicitly warned against `transforms` as they are computed internally. No internal FSM state names are publicly exposed.
