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

## Deployment (Plesk)

The site is hosted on the Plesk server `avitus.sui-inter.net` (webspace `sidefyn.ch`, document root `site/`).
Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and uploads `dist/` via FTPS.

Required GitHub secrets:

- `FTP_USERNAME` / `FTP_PASSWORD`: FTP account of the sidefyn.ch webspace
- `PUBLIC_GOOGLE_MAPS_API_KEY`: see below

`public/.htaccess` redirects every other hostname (www.sidefyn.ch, davidwiedmer.ch) to `https://sidefyn.ch`
and leaves `/.well-known/acme-challenge/` alone so Let's Encrypt can renew the certificate automatically.

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
