# 04 — Deploy

## Local
```bash
npm run dev      # http://localhost:3000 (no base path)
npm run build    # → out/
```

To test with the GitHub Pages base path locally (Git Bash needs path conversion disabled):
```bash
MSYS_NO_PATHCONV=1 PAGES_BASE_PATH=/westbridge-accessibility npm run build
mkdir -p ../wa-preview && cp -r out ../wa-preview/westbridge-accessibility
npx serve ../wa-preview   # → http://localhost:3000/westbridge-accessibility/
```

## GitHub Pages (first time)
GitHub Pages on a free account requires a **public** repository.

1. Create a public repo named `westbridge-accessibility` on GitHub.
2. `git remote add origin https://github.com/<user>/westbridge-accessibility.git` and push `main`.
3. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. The workflow `.github/workflows/deploy.yml` (adapted from [nextjs/deploy-github-pages](https://github.com/nextjs/deploy-github-pages)) builds and deploys on every push to `main`.
5. Update `SITE_URL` in `lib/siteConfig.ts` to `https://<user>.github.io/westbridge-accessibility`.

`basePath` comes from `PAGES_BASE_PATH`, set by `actions/configure-pages` in the workflow — no hard-coding needed.

## Static-export limits
No `headers()`, redirects, rewrites, server actions or request-based route handlers. The CSP is a `<meta>` tag in `app/layout.tsx` (allows `self` plus Google Fonts for runtime font loading). `public/.nojekyll` stops Pages ignoring the `_next/` folder.
