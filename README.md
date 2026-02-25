# sidefyn-website

Astro static site for sidefyn GmbH.

## Structure

- `src/components/`: page sections and drawers
- `src/data/`: content data (clients, AGB)
- `src/scripts/`: client-side JS
- `src/pages/index.astro`: page composition
- `public/`: static assets

## Development

```sh
npm install
npm run dev
```

Local site runs at `http://localhost:4321` by default.

## Deployment (GitHub Pages)

The site is deployed via GitHub Actions to GitHub Pages.
Important settings:

- `astro.config.mjs` uses:
  - `site: https://dave2sidefyn.github.io/sidefyn-website`
  - `base: /sidefyn-website/`

### Deployment checklist

- GitHub repo → **Settings → Pages**: Source = **GitHub Actions**
- Push to `main` triggers the workflow in `.github/workflows/deploy.yml`

If assets (images/CSS) are broken on GitHub Pages, verify:
- `base` is `/sidefyn-website/`
- all asset URLs use `import.meta.env.BASE_URL` (already set in components)

### Custom domain later (sidefyn.ch)

When switching to a custom domain, update:

- `astro.config.mjs`
  - `site: https://sidefyn.ch`
  - `base: /`

GitHub Pages URL will no longer work unless you maintain two separate builds.

## Google Maps

The interactive map requires a browser-exposed API key:

- `.env` (local):
  - `PUBLIC_GOOGLE_MAPS_API_KEY=...`

GitHub Actions does not need the key to build, but the map will only work in the browser when the key is present.

## Contact Form (Cloudflare Worker)

The contact form posts to a Cloudflare Worker endpoint.
Set the Worker secret:

- `SLACK_WEBHOOK_URL`: Slack Incoming Webhook URL

The frontend posts directly to:

- `https://sidefyn-contact.divine-fog-e3e4.workers.dev/`

## Commands

```sh
npm run dev
npm run build
npm run preview
```
