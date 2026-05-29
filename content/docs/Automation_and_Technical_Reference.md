---
title: Automation Guide
weight: 10
---



**Who this page is for:** Data engineers, system administrators, and technical integrations team who need to run Pithom Labs Scraper inside automated pipelines, write scheduler scripts, or configure advanced scraping parameters.

## Quick Answer

Pithom Labs Scraper provides a robust, developer-aligned command-line interface. By combining flags for headless execution, session streaming, and quality gates, developers can integrate the scraper into standard automation frameworks like `cron` or Windows Task Scheduler. The public CLI is file-based: it runs from local `intent.json` and `session.json` files and does not require users to manage a separate public daemon for ordinary workflows.

## Command Line Interface (CLI) Reference

The public user-facing CLI is `scraper`. Below is the verified matrix of command subcommands and core flags:

### 1. `scraper discover`
Launches the visible browser overlay to create or refresh a scraping recipe.
- `-url <string>`: Target website URL (Required).
- `-data-dir <string>`: Directory to write output files (Default: current directory `.`).
- `-intent-file <string>`: Output recipe filename (Default: `intent.json`).
- `-session-file <string>`: Output session cookies filename (Default: `session.json`).
- `-refresh`: Fast Path session validation. Saves fresh cookies and exits immediately after solving initial anti-bot/login screens.
- `-debug-port <int>`: Chrome DevTools debugging port (Default: `9222`).
- `-profile-dir <string>`: Path to a specific Chrome profile directory.
- `-scrape-now`: Transition directly to headless scraping immediately after closing the discovery overlay.

### 2. `scraper scrape`
Executes an automated, headless scrape using a saved recipe and session.
- `-intent-file <string>`: Path to input intent JSON (Default: `intent.json`).
- `-session-file <string>`: Path to input session JSON (Default: `session.json`).
- `-format <string>`: Output format: `csv` or `json`.
- `-output <string>`: Output file path (Default: `output_YYYYMMDD_HHMMSS.csv`).
- `-headless`: Run Chrome in headless mode (Default: `true`). Set to `false` (or use `-headed` flag) to make the browser visible for debugging.
- `-session-stdin`: Read session JSON directly from standard input (useful for piping tokens in serverless/CI environments).
- `-event-stream`: Emit real-time JSON Line events on `stdout` (useful for supervisor logging).
- `-pool-size <int>`: Concurrency limit. Controls the number of parallel tabs Chrome allocates for scraping detail pages.
- `-resume-from-page <int>`: 0-indexed page skip count for resuming interrupted pagination runs.
- `-quality-gate`: Abort the scrape execution if the confidence score of extracted data falls below the threshold.
- `-quality-threshold <float>`: Confidence threshold limit for the quality gate (0.0 to 1.0, Default: `0.50`).
- `-auto-diagnose`: If set to `true`, the scraper can attempt automatic diagnosis/repair on supported recoverable failures using our built-in offline rules.
- `-diagnose-max-attempts <int>`: Max repair attempts if `-auto-diagnose` is active (Cap: `3`, Default: `3`).

### 3. `scraper validate`
Audits intent configurations for structural syntax and schema compliance.
- `-intent-file <string>`: Recipe file to validate (Default: `intent.json`).
- `-json`: Output a structured validation report in JSON.
- `-session-stdin`: Read session JSON from stdin for a live validation check.
- `-diagnostic`: Force generation of a diagnostic bundle for semantic QA testing.

### 4. `scraper diagnose`
Attempts offline selector repair based on failure logs and stashed HTML evidence.
- `-intent <string>`: Path to intent JSON (Required).
- `-log <string>`: Path to the JSON Line error log file (Required).
- `-evidence <string>`: Path to stashed `failure_snapshot.html` (Optional).
- `-baseline <string>`: Path to an original baseline configuration (Optional).

### 5. `scraper replay`
Replays extraction rules locally against stashed HTML snapshots to verify selectors.
- `-intent-file <string>`: Input recipe JSON (Default: `intent.json`).
- `-list-html <string>`: Path to the stashed list page HTML snapshot (Required).
- `-detail-html <slice>`: Path to stashed detail HTML file(s) (Optional).

---

## Programmatic Piping and Event Streaming

For advanced pipeline integration, you can automate session sharing and parse real-time events without writing to temporary files:

### Session Injection (`-session-stdin`)
If your automation already obtains session JSON from a secure secret store or another process, pipe it to stdin instead of passing a session file path.
```bash
your-secret-command | scraper scrape -session-stdin
```
*Note: Ensure the session string is a valid JSON matching the schema of `session.json`.*

### Event Streaming (`-event-stream`)
With `-event-stream`, structured events are emitted to stdout as JSON Lines. Event fields vary by event type; inspect the stream your workflow receives before building strict parsers. This is ideal for logging dashboards:
```bash
scraper scrape -event-stream > pipeline.jsonl
```

---

## Operating System Scheduling Examples

The scraper does not need to manage the scheduler itself; your OS scheduler can run the public CLI command.

### Linux/macOS Cron
To run a scrape daily at 2:00 AM, add this entry to your system `crontab`:
```cron
0 2 * * * cd /home/user/scraper && ./scraper scrape -intent-file intent.json -data-dir missions/example -format csv >> cron.log 2>&1
```

### Windows Task Scheduler
You can run the scraper from a standard `.bat` batch script:
```batch
@echo off
cd C:\Scraper
scraper.exe scrape -intent-file intent.json -data-dir missions\example -format csv >> task_log.txt 2>&1
```
Configure Windows Task Scheduler to run this batch file at your desired intervals.

---

## Concurrency and Rate Limiting

To maintain scraping stability and follow resource safety best practices:
- **Chrome Concurrency (`-pool-size`):** Controls the size of the render pool. For detail-heavy scrapes, increasing the pool size speeds up sub-page extractions. However, higher pools use significantly more system RAM and CPU. Guard pool sizes to prevent system bottlenecks.
- **Polite Delay Rules:** When configuring `rate_limit` or timeouts inside `intent.json`, add sufficient delay periods. Making requests too rapidly risks triggering IP bans, rate limits, or automated Cloudflare blocks on the target site.

---

## Common Mistakes

- **Advertising `-format both`:** The `-format` flag strictly only supports `csv` or `json`. Requesting `both` is unsupported and will fail or behave differently depending on the command path.
- **Piping Bad Stdin:** When using `-session-stdin`, ensuring the piped stream is fully loaded before launching the scraper process is critical. Empty or interrupted stdin pipes will cause validation or scraping to fail.
- **Assuming `-auto-diagnose` is a Universal Healer:** While `-auto-diagnose` can attempt automatic diagnosis/repair on supported recoverable failures (such as minor selector changes), it is not a guaranteed self-healing mechanism and cannot automatically recover from major website redesigns.

## Troubleshooting Checklist

- [ ] **Does `-event-stream` pollute stdout?** Yes, by design. If you need clean stdout, redirect the event stream using standard bash redirects (`> events.jsonl`) or use regular logs via `logs.txt`.
- [ ] **Are parallel tasks locking Chrome?** If running multiple instances of the scraper simultaneously, make sure to isolate their DevTools debug ports using `-debug-port` (e.g. instance 1 on `9222`, instance 2 on `9223`) to avoid process collisions.
- [ ] **Is the quality gate aborting healthy runs?** If `-quality-gate` aborts with false positives, check your `-quality-threshold`. Lower the threshold slightly (e.g. to `-quality-threshold 0.35`) or run validation with `-diagnostic` to adjust your confidence parameters.

## When to Ask for Paid Support

Integrating parallel execution routines, hooking event streams into real-time database inputs, running multi-container Docker deployments on serverless clusters, or configuring high-availability scrapers that scale dynamically requires advanced engineering.

*Need production-grade automation? Paid support can help set up recurring runs, monitoring, session refresh procedures, output integration, and failure handling.* [**Get Priority Support**](https://ko-fi.com/pithomlabs)

---

> **Source-Backed Verification Notes (For Internal Audit Only):**
> - *CLI Flags & subcommands:* Verified all flag registrations and parameter parsing blocks, including the `-output` flag registered in `scraper/cmd/scraper/cmd_scrape.go` (line 90), in:
>   - `scraper/cmd/scraper/cmd_discover.go` (lines 78-90)
>   - `scraper/cmd/scraper/cmd_scrape.go` (lines 90-120)
>   - `scraper/cmd/scraper/cmd_validate.go` (lines 19-25)
>   - `scraper/cmd/scraper/cmd_diagnose.go` (lines 17-38)
>   - `scraper/cmd/scraper/cmd_replay.go` (lines 77-86)
> - *Piping & Streams:* Checked `-session-stdin` and `-event-stream` implementation details inside `scraper/cmd/scraper/cmd_scrape.go`.
> - *No known blockers from inspected source paths.*
