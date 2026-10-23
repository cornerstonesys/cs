# The Cornerstone Systems — Website (v1)

## Folder structure

```
cornerstone-systems/
├── index.html    ← page content and structure
├── style.css     ← all colors, layout, and responsive styles
├── script.js     ← mobile menu, active links, form validation
└── README.md     ← this file
```

Optional later: add an `images/` folder if you replace the hero illustration or add your own photos.

## Open it locally

1. Unzip the folder anywhere on your computer.
2. Double-click `index.html` — it opens in your browser.
3. To edit, open the folder in a code editor (e.g. VS Code). Save, then refresh the browser.

Tip: in VS Code, the free "Live Server" extension refreshes the page automatically on save.

## Things to update before going live

- **Email & address:** search `index.html` for `[your-email@example.com]` and `[Business address / service area]` and replace them.
- **Contact form:** it only validates — it does not send. Connect it to a form service (Formspree, Netlify Forms, etc.) or a backend, then update the submit code in `script.js` and remove the yellow notice in the form.
- **Colors:** change them in one place — the `:root` block at the top of `style.css`.

## Publishing

The site is plain HTML/CSS/JS, so it works on any static host: GitHub Pages, Netlify, Vercel, or regular web hosting. Upload the three files together.
