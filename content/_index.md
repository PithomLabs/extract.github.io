---
title: "Point-and-Click Web Scraping Made Simple"
layout: "hextra-home"
---

<style>
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

  .scraper-hero {
    position: relative;
    padding-top: clamp(4rem, 9vw, 7rem);
    padding-bottom: clamp(4rem, 8vw, 6.5rem);
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

  .scraper-download-link,
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
  }

  .scraper-hero-cta {
    padding-block: 1rem;
    padding-inline: clamp(2.5rem, 5vw, 4.5rem);
  }

  .scraper-download-link {
    min-height: 2.75rem;
  }

  .scraper-download-link:hover,
  .scraper-hero-cta:hover {
    border-color: var(--border-hover);
    color: var(--accent-hover) !important;
    box-shadow: var(--shadow-md);
  }

  .scraper-cta-row {
    column-gap: clamp(2.5rem, 6vw, 5rem);
    flex-wrap: wrap;
    row-gap: 1rem;
  }

  .scraper-primary-cta,
  .scraper-secondary-cta {
    min-height: 3.25rem;
  }

  .scraper-showcase,
  .scraper-panel,
  .scraper-demo-frame {
    position: relative;
    border: 1px solid var(--border);
    background: var(--glass-bg);
    box-shadow: var(--shadow-lg);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
  }

  .scraper-showcase {
    padding: 0.55rem;
  }

  .scraper-showcase img {
    display: block;
    border-radius: 1.15rem;
  }

  .scraper-showcase::after,
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

  .scraper-philosophy-body {
    max-width: 56rem;
    margin-inline: auto;
  }

  .scraper-icon {
    display: grid;
    place-items: center;
    flex: 0 0 auto;
    width: 3rem;
    height: 3rem;
    border: 1px solid var(--border);
    border-radius: 1rem;
    background: var(--bg-tertiary);
    box-shadow: var(--shadow-sm);
  }

  .scraper-section-heading {
    color: var(--text-primary);
    text-wrap: balance;
  }

  .scraper-section-copy {
    max-width: 42rem;
    margin-inline: auto;
  }

  .scraper-feature-shell {
    padding: clamp(1rem, 3vw, 1.5rem);
    border: 1px solid var(--border);
    border-radius: 1.75rem;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 0.2)),
      var(--glass-bg);
    box-shadow: var(--shadow-md);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
  }

  .scraper-feature-shell .hextra-feature-grid {
    background: transparent !important;
  }

  .scraper-feature-shell .hextra-feature-card {
    min-height: 11rem;
    border-radius: 1.25rem !important;
    border-color: var(--border) !important;
    background: rgba(255, 255, 255, 0.58);
    box-shadow: var(--shadow-sm);
    transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease, background-color 0.22s ease;
  }

  .scraper-feature-shell .hextra-feature-card:hover {
    transform: translateY(-4px);
    border-color: var(--border-hover) !important;
    box-shadow: var(--shadow-md), 0 0 24px var(--accent-glow);
  }

  .scraper-feature-shell .hextra-feature-card h3 {
    font-size: 1.125rem;
    line-height: 1.35;
    color: var(--text-primary);
  }

  .scraper-feature-shell .hextra-feature-card p {
    color: var(--text-secondary) !important;
  }

  .scraper-demo-frame {
    padding: 0.55rem;
  }

  .scraper-demo-frame .slideshow-container {
    border-radius: 1.15rem;
  }

  .dark .scraper-home::before {
    background: radial-gradient(circle, rgba(79, 195, 247, 0.22), transparent 68%);
  }

  .dark .scraper-home::after {
    background: radial-gradient(circle, rgba(167, 139, 250, 0.13), transparent 68%);
  }

  .dark .scraper-feature-shell {
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.045), rgba(255, 255, 255, 0.015)),
      var(--glass-bg);
  }

  .dark .scraper-feature-shell .hextra-feature-card {
    background: rgba(18, 18, 26, 0.74);
  }

  @media (max-width: 640px) {
    .scraper-home::after {
      display: none;
    }

    .scraper-cta-row {
      align-items: stretch;
      flex-direction: column;
    }

    .scraper-primary-cta,
    .scraper-secondary-cta {
      width: 100%;
      justify-content: center;
    }

    .scraper-panel {
      border-radius: 1.5rem;
    }
  }
</style>

<div class="scraper-home">
<!-- Hero Showcase Container -->
<div class="scraper-hero hx-mx-auto hx-w-full hx-max-w-6xl hx-text-center hx-px-6">
<a href="https://github.com/PithomLabs/extract.github.io/releases" target="_blank" rel="noopener noreferrer" class="scraper-download-link hx-px-6 hx-py-2 hx-text-sm hx-font-semibold hx-transition-all">
Download for Windows, Mac and Linux ↗
</a>
<!-- Main Title -->
<h1 class="scraper-hero-title hx-mt-8 hx-text-4xl hx-font-extrabold hx-leading-tight hx-tracking-tight sm:hx-text-6xl">
<span>Reclaim your hours.</span>
<span class="scraper-title-accent">Build point-and-click web scrapers     in seconds.</span>
</h1>
<!-- Call to Actions -->
<div class="scraper-cta-row hx-mt-10 hx-flex hx-items-center hx-justify-center">
<a href="https://ko-fi.com/pithomlabs" target="_blank" rel="noopener noreferrer" class="scraper-hero-cta scraper-primary-cta hx-text-base hx-font-semibold hx-text-center hx-transition-all">
Buy Support Plan ↗
</a>

<a href="/docs" class="scraper-hero-cta scraper-secondary-cta hx-text-base hx-font-semibold hx-leading-6 hx-transition-all">
Explore the Docs <span aria-hidden="true">→</span>
</a>
</div>
<!-- Hero Showcase Graphic (Support Plan Banner & Virtues) -->
<div class="scraper-showcase hx-mt-14 hx-mx-auto hx-w-full hx-max-w-4xl hx-rounded-3xl hx-overflow-hidden hover:hx-scale-[1.01] hx-transition-all hx-duration-300">
<a href="https://ko-fi.com/pithomlabs" target="_blank" rel="noopener noreferrer" class="hx-block">
<img src="/support_plan_banner.png" alt="Scraper Support Plan - Click Visual Selector, Active Maintenance, Developer Bypasses" class="hx-w-full hx-h-auto" />
</a>
</div>
</div>
<!-- Philosophy section (Native Hextra Card with automatic light/dark glassmorphism and hover cyan glows) -->
<div class="scraper-panel hextra-card hx-mx-auto hx-w-full hx-max-w-6xl hx-rounded-3xl hx-p-8 sm:hx-p-10 hx-mb-24 hx-px-8">
<div class="hx-flex hx-items-center hx-gap-4 hx-mb-6">
<span class="scraper-icon hx-text-3xl">💡</span>
<h2 class="scraper-section-heading hx-text-2xl sm:hx-text-3xl hx-font-bold hx-tracking-tight">Our Philosophy: Local-First and No-Pressure</h2>
</div>
<div class="scraper-philosophy-body hx-space-y-4 hx-text-slate-600 dark:hx-text-neutral-300 hx-leading-relaxed hx-text-base sm:hx-text-lg">
<p>
We believe that your data belongs to you. That's why the <strong>Point-and-Click Scraper</strong> runs entirely on your local machine. It doesn't upload your data to our servers, require expensive API keys, or lock you into monthly subscription traps. It's completely free to try our scraper program using the command <code>scraper ui</code> and build your scraping flows.
</p>
<p>
<strong>But we also know that scraping is hard.</strong> Websites change layouts, put up anti-bot protections, or require complex session management. When you're using web scraping for your business, a broken scraper is not just an inconvenience—it's lost revenue.
</p>
<p class="hx-font-medium hx-text-slate-950 dark:hx-text-white">
That is where our <strong>Support Plan</strong> comes in.
</p>
<p>
By buying our Support Plan via Ko-Fi, you get direct access to our core engineers. We will write custom scraping configs (intents) for your target sites, help troubleshoot anti-bot bypasses, and ensure your data pipelines remain rock-solid.
</p>
<p class="hx-pt-4 hx-font-semibold hx-text-primary-600 dark:hx-text-primary-400">
No sales calls, no subscription contracts. Just expert backup when you need it most.
</p>
</div>
<!-- Big Center Button to buy Support Plan -->
<div class="hx-mt-9 hx-text-center">
<a href="https://ko-fi.com/pithomlabs" target="_blank" rel="noopener noreferrer" class="scraper-primary-cta hx-btn hx-btn-primary hx-rounded-full hx-px-10 hx-py-5 hx-text-lg hx-font-extrabold hx-text-center hx-inline-flex hx-items-center hx-justify-center">
Get Expert Support via Ko-Fi ↗
</a>
<p class="hx-mt-4 hx-text-xs hx-text-slate-500 dark:hx-text-neutral-500">
Opens in a new browser tab. A one-off support contribution or a monthly backup—you choose.
</p>
</div>
</div>
<!-- Features Section (Virtues of Point-and-Click Scraping) -->
<div class="hx-mx-auto hx-w-full hx-max-w-6xl hx-px-6 hx-mb-24">
<div class="hx-text-center hx-mb-12">
<h2 class="scraper-section-heading hx-text-3xl sm:hx-text-4xl hx-font-bold hx-tracking-tight">
Built for Speed. Designed for Simplicity.
</h2>
<p class="scraper-section-copy hx-mt-4 hx-text-lg hx-text-slate-600 dark:hx-text-neutral-400">
Say goodbye to brittle scraping.
</p>
</div>
<div class="scraper-feature-shell">
<div class="hextra-feature-grid hx-grid sm:max-lg:hx-grid-cols-2 max-sm:hx-grid-cols-1 hx-gap-4 hx-w-full not-prose" style="--hextra-feature-grid-cols: 3;">
<article class="hextra-feature-card not-prose hx-block hx-relative hx-overflow-hidden hx-rounded-3xl hx-border hx-border-gray-200 dark:hx-border-neutral-800">
<div class="hx-relative hx-w-full hx-p-6">
<h3 class="hx-text-2xl hx-font-medium hx-leading-6 hx-mb-2 hx-flex hx-items-center">
<span>🖱️ Point-and-Click Selection</span>
</h3>
<p class="hx-text-gray-500 dark:hx-text-gray-400 hx-text-sm hx-leading-6">Click any text, image, or link on a page. Map your fields instantly in an intuitive visual overlay.</p>
</div>
</article>
<article class="hextra-feature-card not-prose hx-block hx-relative hx-overflow-hidden hx-rounded-3xl hx-border hx-border-gray-200 dark:hx-border-neutral-800">
<div class="hx-relative hx-w-full hx-p-6">
<h3 class="hx-text-2xl hx-font-medium hx-leading-6 hx-mb-2 hx-flex hx-items-center">
<span>🔄 Smart Auto-Pagination</span>
</h3>
<p class="hx-text-gray-500 dark:hx-text-gray-400 hx-text-sm hx-leading-6">Handles 'Next' buttons, infinite scroll, numbered page links, and URL sequence patterns seamlessly.</p>
</div>
</article>
<article class="hextra-feature-card not-prose hx-block hx-relative hx-overflow-hidden hx-rounded-3xl hx-border hx-border-gray-200 dark:hx-border-neutral-800">
<div class="hx-relative hx-w-full hx-p-6">
<h3 class="hx-text-2xl hx-font-medium hx-leading-6 hx-mb-2 hx-flex hx-items-center">
<span>🧠 Omni-Agent Suggester</span>
</h3>
<p class="hx-text-gray-500 dark:hx-text-gray-400 hx-text-sm hx-leading-6">Heuristic selector engine finds the most resilient selectors automatically so your scraper doesn't break.</p>
</div>
</article>
<article class="hextra-feature-card not-prose hx-block hx-relative hx-overflow-hidden hx-rounded-3xl hx-border hx-border-gray-200 dark:hx-border-neutral-800">
<div class="hx-relative hx-w-full hx-p-6">
<h3 class="hx-text-2xl hx-font-medium hx-leading-6 hx-mb-2 hx-flex hx-items-center">
<span>⚡ Local-First Security</span>
</h3>
<p class="hx-text-gray-500 dark:hx-text-gray-400 hx-text-sm hx-leading-6">Runs entirely on your machine. Complete privacy, full network speed, and zero reliance on third-party cloud APIs.</p>
</div>
</article>
<article class="hextra-feature-card not-prose hx-block hx-relative hx-overflow-hidden hx-rounded-3xl hx-border hx-border-gray-200 dark:hx-border-neutral-800">
<div class="hx-relative hx-w-full hx-p-6">
<h3 class="hx-text-2xl hx-font-medium hx-leading-6 hx-mb-2 hx-flex hx-items-center">
<span>📂 Spreadsheet-Ready Exports</span>
</h3>
<p class="hx-text-gray-500 dark:hx-text-gray-400 hx-text-sm hx-leading-6">Instantly export clean, structured CSV files (perfect for Excel or Sheets) and developer-friendly JSON.</p>
</div>
</article>
<article class="hextra-feature-card not-prose hx-block hx-relative hx-overflow-hidden hx-rounded-3xl hx-border hx-border-gray-200 dark:hx-border-neutral-800">
<div class="hx-relative hx-w-full hx-p-6">
<h3 class="hx-text-2xl hx-font-medium hx-leading-6 hx-mb-2 hx-flex hx-items-center">
<span>🤖 Developer-Friendly Automation</span>
</h3>
<p class="hx-text-gray-500 dark:hx-text-gray-400 hx-text-sm hx-leading-6">Save scraping flows as simple 'intent' JSON files. Run them from your command line or automate with cron.</p>
</div>
</article>
</div>
</div>
</div>
<!-- Interactive Slideshow Demo -->
<div class="hx-mx-auto hx-w-full hx-max-w-6xl hx-px-6 hx-pb-24">
<div class="hx-text-center hx-mb-12">
<h2 class="scraper-section-heading hx-text-3xl sm:hx-text-4xl hx-font-bold hx-tracking-tight">
Try It: From URL to CSV in no time!
</h2>
<p class="scraper-section-copy hx-mt-4 hx-text-lg hx-text-slate-600 dark:hx-text-neutral-400">
Take a virtual walkthrough below of mapping lists, pagination, and detail data.
</p>
</div>
<div class="scraper-demo-frame hx-rounded-3xl hx-overflow-hidden">
{{< slideshow path="images/extract" root="true" >}}
</div>
</div>
</div>
