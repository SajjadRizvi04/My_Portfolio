# Sajjad Ali, portfolio

React + JavaScript + Tailwind CSS v4 (Vite).

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs dist/
```

## Fill in

Open `src/data.js` and set:

- `leetcode`: your LeetCode username (turns on live stats and the submission heatmap)
- `email`, `linkedin`, `resume` (put the PDF in `public/`)
- `demo` on PactPay only if a working deployment exists; empty links are hidden

Colors and fonts live in the `@theme` block of `src/index.css`. Change `--color-accent` to retheme.

## Live data

Stats are fetched at build time, not in the browser. `scripts/fetch-stats.mjs` runs before
`npm run dev` and `npm run build` and writes `public/stats.json`; the site only reads that file.
No visitor ever hits a rate-limited API.

- GitHub heatmap: `github-contributions-api.jogruber.de`, recent commits: GitHub public events API
  (set a `GITHUB_TOKEN` env var if you ever hit GitHub's rate limit)
- LeetCode stats and heatmap: LeetCode's GraphQL endpoint

If a fetch fails, the script keeps the previous values and the build still succeeds.
Refresh manually with `npm run stats`.

To keep the numbers fresh after deploying, create a Deploy Hook on Vercel/Netlify and add its URL
as the GitHub secret `DEPLOY_HOOK_URL`. `.github/workflows/refresh.yml` then redeploys daily.

## Deploy

Push to GitHub, import the repo on Vercel or Netlify. Build command `npm run build`, output directory `dist`.
