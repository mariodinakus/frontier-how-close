# FRONTIER — How Close Are We?

An interactive bilingual (English / Greek) research atlas for humanity's biggest unsolved questions.

## What's included

- 12 evidence-based frontiers: Theory of Everything, Quantum Gravity, Cancer, Extreme Poverty, Abundant Clean Energy, Future of Capitalism, Fusion, Climate, Ageing, Dark Matter, Consciousness and AI Alignment.
- 12 animated, adjustable explanatory labs with qualitative or transparent illustrative formulas.
- Research milestones, achievements, unresolved challenges and original source links.
- Crossref paper discovery via a Next.js API endpoint, with limited query length and timeout.
- Search, 6 discipline filters, comparative view, local saved topics, responsive dark UI, Greek/English.
- No API keys required.

## Deploy to GitHub and Vercel

1. Create a repository called `frontier-how-close` on GitHub.
2. Upload **the contents of this folder**, not the outer folder, to your repo's `main` branch.
3. On Vercel, choose **Add New → Project → Import Git Repository → frontier-how-close**.
4. Framework: **Next.js** (auto-detect); Root Directory: `./`; Build Command: `next build` (default). Deploy.
5. Future commits on `main` automatically redeploy when Git integration is connected.

## Local development

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Data policy

This is a curated **October 16, 2026 research snapshot**, not an automated live news service. Research discovery fetches Crossref metadata on demand. Metrics include location and period so measurements cannot be confused with global solution percentages. Editorial milestone checklists and toy-model outputs are explicitly **not** objective progress-to-solution percentages or validated clinical/economic/physical predictions.

Some institutional sources may be updated at their original links after the snapshot. Independent source-checking is recommended for research-critical use.

## Security & privacy

No user data is transmitted by the interactive labs. Saved topics/language are stored only in browser localStorage. Paper queries are forwarded server-side to public Crossref over HTTPS with length bounds and a timeout. No advertising or trackers bundled.

## Source

See `src/lib/content.ts` for each frontier's attributed source library and research checkpoints.

## Research stream (2026)

A continuously refreshed literature-discovery view is available at the sidebar's Research Stream tab and on the overview. It queries `/api/research?topic=all` (a transparent sample of six research areas) and specific topics such as `?topic=gravity`. OpenAlex and Crossref are used as public, keyless metadata sources with a 15-minute server cache. The browser refreshes when a view opens and every 15 minutes while it stays open. Results have original destinations, dates and provider labels. The curated evidence indicators are **not** continuously verified. Indexing cannot establish peer-review status, correctness, or scientific consensus.
