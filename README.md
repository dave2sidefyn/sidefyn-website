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
