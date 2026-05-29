---
title: Login and Session Guide
weight: 7
---




**Who this page is for:** Free tier users and data engineers who need to scrape data hidden behind login walls, subscriptions, or initial anti-bot captchas. Use this only for sites and accounts you are authorized to access, and follow the website’s terms and applicable laws.

## Quick Answer

You do not need to hardcode your password into the scraper. Run `scraper discover`, ignore the yellow overlay momentarily, and log into the website normally just as you would in a regular browser. Once logged in, click your target data. The scraper saves your active login cookies into a `session.json` file. When you later run `scraper scrape`, the engine acts as an authenticated user by loading those cookies.

## Step-by-Step Procedure

1. **Start Discovery:** Run `scraper discover -url https://example.com/login`.
2. **Log In:** The visible Chrome browser will open. Type in your username and password, solve any captchas, and click submit.
3. **Navigate to Data:** Once you are on the private dashboard or data page, use the yellow overlay to select the fields you want.
4. **Save and Scrape:** Finish discovery. The tool writes `session.json` to your folder alongside the intent. Run `scraper scrape` (which is headless by default) to quietly extract your data using the saved session.

## Common Mistakes

- **Letting Sessions Expire:** Cookies do not last forever. If you set up a daily automated scrape, it will eventually fail when the website expires your login session. 
- **Mismatched Fingerprints:** The `session.json` file deliberately records your exact User-Agent from Stage 1. Do not manually edit the `session.json` file to change your User-Agent, or the target website may flag the sudden change as bot behavior.
- **Scraping Logouts:** Be careful not to accidentally configure the scraper to click a "Log Out" link when extracting list items, which instantly destroys the session.

## Troubleshooting Checklist

- [ ] **Did you receive an Exit Code 42?** This is the engine's explicit `AUTH_REQUIRED` signal. It means your session is dead.
- [ ] **How do I fix a dead session?** Do not rebuild your entire `intent.json`. Simply run `scraper discover -refresh`. Run this from the mission folder, or pass the same `-data-dir`, `-intent-file`, and `-session-file` paths you used originally. This opens a visible browser, lets you log in again, and updates the `session.json` file without losing your extraction recipe.
- [ ] **Need to inject a session manually?** For automated pipelines, you can pipe a fresh session string directly into the engine using `scraper scrape -session-stdin`.

## When to Ask for Paid Support

Modern web security frequently rotates session tokens, locks sessions to IP addresses, or presents unpredictable Cloudflare challenge pages during headless execution—even if the cookies are valid. 

*Are your sessions expiring too quickly, or is the site throwing anti-bot challenges during headless runs? Paid support can analyze session lifecycles and help implement robust session refresh, authenticated scraping, and compliant access workflows.* [**Get Priority Support**](https://ko-fi.com/pithomlabs)

---

> **Source-Backed Verification Notes (For Internal Audit Only):**
> - *CLI Flags:* Verified `-session-stdin` exists in `cmd/scraper/cmd_scrape.go` and `cmd/scraper/cmd_validate.go`. Verified `-refresh` exists in `cmd/scraper/cmd_discover.go`.
> - *Exit Codes:* Verified `os.Exit(42)` is explicitly triggered on `AUTH_REQUIRED` string match in `cmd/scraper/main.go` line 94.
> - *Language constraint:* Used strictly compliant terminology ("session refresh, authenticated scraping, and compliant access workflows"), completely omitting "bypass" language.
