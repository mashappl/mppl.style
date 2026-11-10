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

1. Copy `src/content/homework/_TEMPLATE.md` and rename it, e.g. `03-colour-analysis.md`.
   The filename becomes the page address: `mppl.style/homework/03-colour-analysis/`.
2. Make a folder for its photos, e.g. `src/assets/homework/03/`, and drop the photos in.
3. Fill in the sections you need (intro, starting point, what I notice, putting it together, reflection).
   Delete the ones you don't. Delete the `draft: true` line when it's ready.
4. Commit and push. The site updates by itself in about a minute.

## Client brief (homework 01)

- Questions: `src/data/brief.js` (Ukrainian). The home page sheets read from the same file.
- Form logic: `public/brief/app.js` (wizard, autosave, photos, PDF/HTML/JSON downloads).
  At the top of that file, `CONFIG`:
  - `STYLIST_CONTACT` — where clients send their answers (currently a placeholder).
  - `SUBMIT_ENDPOINT` — leave empty for demo mode (nothing is sent), or paste a Formspree URL to receive briefs by email.
- If you change question ids a lot, bump `LS_KEY` in `app.js` so old saved drafts don't clash.

## Languages

The site has English (`mppl.style/`) and Ukrainian (`mppl.style/uk/`). All the site's own text lives in
`src/i18n.ts`. Homework entries are written once, in whichever language you like, and appear on both.

## Project layout

| Path | What it is |
| --- | --- |
| `src/content/homework/` | One Markdown file per assignment |
| `src/assets/homework/` | Images for the assignments |
| `src/views/` | Home, About, Homework pages (shared by both languages) |
| `src/i18n.ts` | All site text, English + Ukrainian |
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

## Texture credits

Paper textures in `public/textures/` are from Unsplash (free under the Unsplash License):
- `rough.jpg` — Olga Thelavart, https://unsplash.com/photos/vS3idIiYxX0 (page background)
- `fibre.jpg` — João Vítor Duarte, https://unsplash.com/photos/k4Lt0CjUnb0
