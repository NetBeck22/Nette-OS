# Nette Beckers | Fullstack & Creative Developer

An interactive portfolio and CV for Nette Beckers, a Belgian fullstack and creative developer working on the radio floor at DPG Media since June 2026. Explore her work through a desktop-inspired interface, complete with project windows, a terminal, and a playable Tetris game.

## Run locally

```sh
npm install
npm run dev
```

Create a production build with `npm run build`. The legacy [`nette.html`](nette.html) URL redirects to the React app in `index.html`. GitHub Actions builds and deploys `dist/` to GitHub Pages when changes are pushed to `main`; set the repository's Pages source to **GitHub Actions**.

## Explore

- **About**: Nette's approach, interests, and technical toolkit
- **Projects**: CLASSIFIED, This Is Not a Birthday Party, Robot Simulator, Koningsburcht, MPLang-to-MPNN research, and client work, with links to [GitHub](https://github.com/NetBeck22)
- **CV**: education, professional experience, and volunteering
- **Terminal**: an interactive command-line-style introduction
- **Tetris**: a playable version of Nette's favorite game
- **Contact**: GitHub and ways to get in touch

## Built with

React, Vite, and component-scoped CSS. Each screen lives in `src/components/` with its own JSX and stylesheet; `src/App.jsx` manages the OS shell and windows. Google Fonts provides Syne and Space Mono.


