# Sue Ho — Portfolio

My personal portfolio site for job applications. Plain HTML, CSS and JavaScript —
no build step, no dependencies, so it can be opened directly or hosted free on GitHub Pages.

## Structure

```
portfolio/
├── index.html          # every section of the site lives here
├── css/styles.css      # all styling; design tokens are at the top
├── js/main.js          # mobile menu, scrollspy, scroll reveal
├── assets/
│   ├── Sue-Ho-Resume.pdf
│   └── img/profile.jpg
└── README.md
```

## Viewing it locally

Just double-click `index.html`, or serve it properly (needed if you ever add `fetch` calls):

```bash
python -m http.server 8000
```

Then open http://localhost:8000

## Editing it

**Adding a project** — open `index.html`, find the `TEMPLATE` comment inside the
Projects section, copy that block, remove the `<!--` and `-->` markers around your
copy, and fill it in. Projects with a live link and a source link are worth far more
to an employer than projects with neither.

**Changing colours** — everything comes from the tokens at the top of `css/styles.css`
(`:root { ... }`). Change `--accent` and the whole site follows. Dark mode uses the
same names inside the `prefers-color-scheme: dark` block, so change both.

**Updating the résumé** — replace `assets/Sue-Ho-Resume.pdf` with a newer export,
keeping the same filename so the links keep working.

## Publishing to GitHub Pages

1. Create a new **public** repo on GitHub named `thiho23.github.io`
   (that exact name gives you `https://thiho23.github.io` as the address).
2. Push this folder to it:

```bash
git remote add origin https://github.com/Thiho23/thiho23.github.io.git
git branch -M main
git push -u origin main
```

3. On GitHub: **Settings → Pages → Source: Deploy from a branch → `main` / `(root)`**.
4. Wait a minute, then visit `https://thiho23.github.io`.

Put that URL on your résumé and LinkedIn.

## Before you send it to an employer

- [ ] Check the phone number and email are the ones you actually want public.
- [ ] Add at least one project with a working live link.
- [ ] Open it on your phone — check the menu, the photo and the text all behave.
- [ ] Read the About section out loud. If a sentence sounds like a template, rewrite it.
