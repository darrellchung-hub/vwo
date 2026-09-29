# Study Tests Site

This repository builds a static HTML library from the Markdown study materials in `output/` and publishes it with GitHub Pages.

## Build locally

Requirements: Node.js 22 or newer.

```sh
npm install
npm run build
```

The generated site is written to `dist/`. Open `dist/index.html` to browse it locally. Each Markdown file under `output/` becomes a matching HTML page, including collapsed answer sections.

## Publish with GitHub Pages

1. Push the repository to GitHub.
2. In the repository, open **Settings > Pages** and set **Build and deployment > Source** to **GitHub Actions**.
3. Push to the `main` branch, or run the **Publish study tests to GitHub Pages** workflow manually from the Actions tab.

The workflow builds the HTML site and deploys it. Future Markdown files added under `output/` are included automatically on the next build.