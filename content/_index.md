---
title: "Point-and-Click Web Scraping Made Simple"
layout: "hextra-home"
---

<style>
  /* ── Design System (preserved) ── */
  .scraper-home {
    position: relative;
    isolation: isolate;
    width: 100%;
    overflow: hidden;
  }

  .scraper-home::before,
  .scraper-home::after {
    content: "";
    position: absolute;
    z-index: -1;
    pointer-events: none;
    border-radius: 999px;
    filter: blur(6px);
  }

  .scraper-home::before {
    top: -9rem;
    left: 50%;
    width: min(52rem, 92vw);
    height: 28rem;
    transform: translateX(-50%);
    background: radial-gradient(circle, rgba(79, 195, 247, 0.18), transparent 68%);
  }

  .scraper-home::after {
    top: 30rem;
    right: -14rem;
    width: 32rem;
    height: 32rem;
    background: radial-gradient(circle, rgba(45, 212, 191, 0.1), transparent 68%);
  }

  /* ── Hero ── */
  .scraper-hero {
    position: relative;
    padding-top: clamp(4rem, 9vw, 7rem);
    padding-bottom: clamp(3rem, 6vw, 5rem);
  }

  .scraper-hero-title {
    margin-inline: auto;
    max-width: 58rem;
    color: var(--text-primary);
    text-wrap: balance;
  }

  .scraper-title-accent {
    display: block;
    background: linear-gradient(120deg, var(--accent), #2dd4bf 46%, var(--accent-hover));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .scraper-hero-subtitle {
    max-width: 38rem;
    margin-inline: auto;
    line-height: 1.6;
  }

  .scraper-hero-cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--border);
    border-radius: 999px;
    background: var(--glass-bg);
    color: var(--text-primary) !important;
    box-shadow: var(--shadow-sm);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    padding-block: 1rem;
    padding-inline: clamp(2.5rem, 5vw, 4.5rem);
    min-height: 3.25rem;
    transition: all 0.22s ease;
  }

  .scraper-hero-cta:hover {
    border-color: var(--border-hover);
    color: var(--accent-hover) !important;
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }

  .scraper-cta-row {
    column-gap: clamp(2.5rem, 6vw, 5rem);
    flex-wrap: wrap;
    row-gap: 1rem;
  }

  /* ── Panels (glassmorphism containers) ── */
  .scraper-panel,
  .scraper-demo-frame {
    position: relative;
    border: 1px solid var(--border);
    background: var(--glass-bg);
    box-shadow: var(--shadow-lg);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
  }

  .scraper-panel::after,
  .scraper-demo-frame::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    border-radius: inherit;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.28);
  }

  .scraper-panel {
    overflow: hidden;
  }

  .scraper-panel::before {
    content: "";
    position: absolute;
    inset: 0 auto 0 0;
    width: 0.25rem;
    background: linear-gradient(180deg, var(--accent), #2dd4bf);
  }

  .scraper-demo-frame {
    padding: 0.55rem;
  }

  .scraper-demo-frame .slideshow-container {
    border-radius: 1.15rem;
  }

  /* ── Section headings ── */
  .scraper-section-heading {
    color: var(--text-primary);
    text-wrap: balance;
  }

  .scraper-section-copy {
    max-width: 42rem;
    margin-inline: auto;
  }

  /* ── Terminal block ── */
  .scraper-terminal {
    position: relative;
    border: 1px solid var(--border);
    border-radius: 1.25rem;
    background: #0d1117;
    box-shadow: var(--shadow-lg), 0 0 40px rgba(79, 195, 247, 0.06);
    overflow: hidden;
    font-family: 'SF Mono', 'Fira Code', 'JetBrains Mono', 'Cascadia Code', monospace;
  }

  .scraper-terminal-bar {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    background: rgba(255, 255, 255, 0.04);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  .scraper-terminal-dot {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
  }

  .scraper-terminal-dot:nth-child(1) { background: #ff5f57; }
  .scraper-terminal-dot:nth-child(2) { background: #febc2e; }
  .scraper-terminal-dot:nth-child(3) { background: #28c840; }

  .scraper-terminal-body {
    padding: 1.5rem 1.5rem 2rem;
    font-size: 0.9rem;
    line-height: 2;
    color: #c9d1d9;
  }

  .scraper-terminal-body .cmd-prompt {
    color: #2dd4bf;
    user-select: none;
  }

  .scraper-terminal-body .cmd-text {
    color: #f0f6fc;
  }

  .scraper-terminal-body .cmd-flag {
    color: #79c0ff;
  }

  .scraper-terminal-body .cmd-comment {
    color: #6e7681;
    font-style: italic;
  }

  .scraper-terminal-caption {
    padding: 1rem 1.5rem 1.25rem;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    font-size: 0.8rem;
    color: #6e7681;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.5;
  }

  /* ── Split layout (terminal + slideshow) ── */
  .scraper-split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(1.5rem, 3vw, 2.5rem);
    align-items: start;
  }

  .scraper-split .scraper-terminal {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .scraper-split .scraper-terminal .scraper-terminal-body {
    flex: 1;
  }

  .scraper-split .scraper-demo-frame {
    height: 100%;
  }

  /* ── 4-Pattern matrix ── */
  .scraper-matrix {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    font-size: 0.95rem;
    margin-top: 1.5rem;
  }

  .scraper-matrix th {
    padding: 0.75rem 1rem;
    text-align: left;
    font-weight: 600;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-secondary, #6b7280);
    border-bottom: 2px solid var(--border);
  }

  .scraper-matrix td {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--border);
    color: var(--text-primary);
  }

  .scraper-matrix tr:last-child td {
    border-bottom: none;
  }

  .scraper-matrix td:first-child {
    font-weight: 600;
  }

  .scraper-matrix .check {
    color: #2dd4bf;
    font-size: 1.1rem;
  }

  .scraper-matrix .dash {
    color: var(--text-secondary, #6b7280);
    opacity: 0.4;
  }

  /* ── Philosophy section ── */
  .scraper-philosophy {
    text-align: center;
    max-width: 42rem;
    margin-inline: auto;
  }

  .scraper-philosophy p {
    line-height: 1.8;
  }

  /* ── Final CTA ── */
  .scraper-final-cta {
    text-align: center;
    padding-top: 1rem;
    padding-bottom: 2rem;
  }

  .scraper-final-cta-links {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: clamp(2rem, 5vw, 4rem);
    flex-wrap: wrap;
  }

  .scraper-final-cta-links a {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-weight: 600;
    color: var(--text-primary) !important;
    transition: color 0.2s ease;
  }

  .scraper-final-cta-links a:hover {
    color: var(--accent-hover) !important;
  }

  /* ── Blockquote override for the mental model ── */
  .scraper-insight-quote {
    position: relative;
    border-left: 3px solid #2dd4bf;
    padding: 1.25rem 1.5rem;
    margin: 1.5rem auto;
    max-width: 36rem;
    background: rgba(45, 212, 191, 0.04);
    border-radius: 0 1rem 1rem 0;
    font-size: 1.15rem;
    line-height: 1.7;
    color: var(--text-primary);
  }

  .scraper-insight-quote strong {
    color: var(--text-primary);
  }

  .scraper-insight-footnote {
    font-size: 0.9rem;
    color: var(--text-secondary, #6b7280);
    font-style: italic;
    margin-top: 0.75rem;
  }

  /* ── Dark mode overrides ── */
  .dark .scraper-home::before {
    background: radial-gradient(circle, rgba(79, 195, 247, 0.22), transparent 68%);
  }

  .dark .scraper-home::after {
    background: radial-gradient(circle, rgba(167, 139, 250, 0.13), transparent 68%);
  }

  .dark .scraper-terminal {
    background: #0d1117;
    border-color: rgba(255, 255, 255, 0.08);
  }

  .dark .scraper-insight-quote {
    background: rgba(45, 212, 191, 0.06);
  }

  /* ── Responsive ── */
  @media (max-width: 840px) {
    .scraper-split {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 640px) {
    .scraper-home::after {
      display: none;
    }

    .scraper-cta-row {
      align-items: stretch;
      flex-direction: column;
    }

    .scraper-cta-row .scraper-hero-cta {
      width: 100%;
      justify-content: center;
    }

    .scraper-panel {
      border-radius: 1.5rem;
    }

    .scraper-matrix th,
    .scraper-matrix td {
      padding: 0.6rem 0.65rem;
      font-size: 0.85rem;
    }

    .scraper-final-cta-links {
      flex-direction: column;
      gap: 1.25rem;
    }
  }
</style>

<div class="scraper-home">

<!-- ═══════════════════════════════════════════════════════════
     SECTION 1 — HERO
     ═══════════════════════════════════════════════════════════ -->
<div class="scraper-hero hx-mx-auto hx-w-full hx-max-w-6xl hx-text-center hx-px-6">

<h1 class="scraper-hero-title hx-text-4xl hx-font-extrabold hx-leading-tight hx-tracking-tight sm:hx-text-6xl">
<span class="scraper-title-accent">Point. Click. Extract.</span>
</h1>

<p class="scraper-hero-subtitle hx-mt-6 hx-text-lg hx-text-slate-600 dark:hx-text-neutral-400">
Build web scrapers in minutes. No code. No cloud. Just your machine.
</p>

<div class="scraper-cta-row hx-mt-10 hx-flex hx-items-center hx-justify-center">
<a href="https://github.com/PithomLabs/extract.github.io/releases" target="_blank" rel="noopener noreferrer" class="scraper-hero-cta hx-text-base hx-font-semibold hx-text-center">
Download for Windows, Mac & Linux ↗
</a>
<a href="/docs" class="scraper-hero-cta hx-text-base hx-font-semibold hx-text-center">
Explore the Docs <span aria-hidden="true">→</span>
</a>
</div>

</div>

<!-- ═══════════════════════════════════════════════════════════
     SECTION 2 — CORE MENTAL MODEL + 4-PATTERN MATRIX
     ═══════════════════════════════════════════════════════════ -->
<div class="hx-mx-auto hx-w-full hx-max-w-4xl hx-px-6 hx-mt-20 hx-mb-24">

<div class="hx-text-center hx-mb-8">
<h2 class="scraper-section-heading hx-text-3xl sm:hx-text-4xl hx-font-bold hx-tracking-tight">
Every website follows one pattern.
</h2>
</div>

<div class="scraper-panel hextra-card hx-rounded-3xl hx-p-8 sm:hx-p-10">

<div class="scraper-insight-quote">
<strong>Find a list → handle pages → get details.</strong><br />
That's it. Every website you'll ever scrape is a variation of this.
</div>

<p class="scraper-insight-footnote hx-text-center">
You don't choose a pattern — the scraper figures it out from your clicks.
</p>

<table class="scraper-matrix">
<thead>
<tr>
<th>Pattern</th>
<th>List</th>
<th>Pagination</th>
<th>Detail Pages</th>
</tr>
</thead>
<tbody>
<tr>
<td>Simple</td>
<td><span class="check">✓</span></td>
<td><span class="dash">—</span></td>
<td><span class="dash">—</span></td>
</tr>
<tr>
<td>Paginated</td>
<td><span class="check">✓</span></td>
<td><span class="check">✓</span></td>
<td><span class="dash">—</span></td>
</tr>
<tr>
<td>Detail</td>
<td><span class="check">✓</span></td>
<td><span class="dash">—</span></td>
<td><span class="check">✓</span></td>
</tr>
<tr>
<td>Full</td>
<td><span class="check">✓</span></td>
<td><span class="check">✓</span></td>
<td><span class="check">✓</span></td>
</tr>
</tbody>
</table>

</div>

</div>

<!-- ═══════════════════════════════════════════════════════════
     SECTION 3 — TERMINAL + SLIDESHOW (SPLIT LAYOUT)
     ═══════════════════════════════════════════════════════════ -->
<div class="hx-mx-auto hx-w-full hx-max-w-6xl hx-px-6 hx-mb-24">

<div class="hx-text-center hx-mb-10">
<h2 class="scraper-section-heading hx-text-3xl sm:hx-text-4xl hx-font-bold hx-tracking-tight">
Three commands. That's the whole workflow.
</h2>
<p class="scraper-section-copy hx-mt-4 hx-text-lg hx-text-slate-600 dark:hx-text-neutral-400">
Discovery is point-and-click. Execution is one command.
</p>
</div>

<div class="scraper-split">

<!-- Terminal -->
<div class="scraper-terminal">
<div class="scraper-terminal-bar">
<span class="scraper-terminal-dot"></span>
<span class="scraper-terminal-dot"></span>
<span class="scraper-terminal-dot"></span>
</div>
<div class="scraper-terminal-body">
<div>
<span class="cmd-prompt">$ </span><span class="cmd-text">scraper </span><span class="cmd-flag">ui</span>
<span class="cmd-comment"> # Launch Mission Control</span>
</div>
<div>
<span class="cmd-prompt">$ </span><span class="cmd-text">scraper </span><span class="cmd-flag">scrape</span>
<span class="cmd-comment"> # Run your saved recipe</span>
</div>
<div>
<span class="cmd-prompt">$ </span><span class="cmd-text">scraper scrape </span><span class="cmd-flag">-headed</span>
<span class="cmd-comment"> # Watch it work</span>
</div>
</div>
<div class="scraper-terminal-caption">
Save recipes as intent JSON files. Schedule with cron. Build production pipelines.
</div>
</div>

<!-- Slideshow Demo -->
<div class="scraper-demo-frame hx-rounded-3xl hx-overflow-hidden">
{{< slideshow path="images/extract" root="true" >}}
</div>

</div>

</div>

<!-- ═══════════════════════════════════════════════════════════
     SECTION 4 — LOCAL-FIRST PHILOSOPHY (DISTILLED)
     ═══════════════════════════════════════════════════════════ -->
<div class="hx-mx-auto hx-w-full hx-max-w-6xl hx-px-6 hx-mb-20">

<div class="scraper-philosophy">
<h2 class="scraper-section-heading hx-text-3xl sm:hx-text-4xl hx-font-bold hx-tracking-tight hx-mb-6">
Local-First. No Lock-in.
</h2>
<p class="hx-text-lg hx-text-slate-600 dark:hx-text-neutral-400">
Runs entirely on your machine. No accounts, no cloud dependency, no API lock-in.<br />
Your data stays yours. Always.
</p>
</div>

</div>

<!-- ═══════════════════════════════════════════════════════════
     SECTION 5 — FINAL CTA
     ═══════════════════════════════════════════════════════════ -->
<div class="scraper-final-cta hx-mx-auto hx-w-full hx-max-w-6xl hx-px-6 hx-pb-16">

<div class="scraper-final-cta-links hx-mb-4">
<a href="https://ko-fi.com/pithomlabs" target="_blank" rel="noopener noreferrer" class="hx-text-lg">
Get Expert Support ↗
</a>
<a href="/docs" class="hx-text-lg">
Read the Full Docs <span aria-hidden="true">→</span>
</a>
</div>

<p class="hx-text-sm hx-text-slate-500 dark:hx-text-neutral-500">
One-off help or ongoing engineering backup — your choice.
</p>

</div>

</div>
