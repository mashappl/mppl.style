# mppl.style

Personal site: personal stylist course homework now, portfolio later.
Built with [Astro](https://astro.build), hosted free on GitHub Pages at https://mppl.style.

## Run it on your computer

```
npm install
npm run dev
```
Then open http://localhost:4321.

## Add a homework assignment

1. Copy `src/content/homework/_TEMPLATE.md` and rename it, e.g. `01-colour-analysis.md`.
   The filename becomes the page address: `mppl.style/homework/01-colour-analysis/`.
2. Put the images in `src/assets/homework/` (JPG/PNG straight from your phone is fine; the site resizes them).
3. Fill in the title, date and text. Delete the `draft: true` line when it's ready to show.
4. Commit and push. The site updates by itself in about a minute.

## Project layout

| Path | What it is |
| --- | --- |
| `src/content/homework/` | One Markdown file per assignment |
| `src/assets/homework/` | Images for the assignments |
| `src/pages/` | Home, About, Homework pages |
| `src/styles/global.css` | Colours and fonts |
| `public/CNAME` | Tells GitHub Pages to serve the site on mppl.style |

## Hosting setup (one time)

1. Push this repo to GitHub.
2. Repo **Settings → Pages → Source: GitHub Actions**.
3. Same page, **Custom domain: `mppl.style`**, then tick **Enforce HTTPS** once it's available.
4. At your domain registrar, add DNS records for `mppl.style`:
   - `A` records → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` for `www` → `mashappl.github.io`

## Later: turning it into a portfolio

Add a second collection (e.g. `src/content/work/`) for client looks and case studies,
with its own `/work/` page, the same way `homework` is set up.
