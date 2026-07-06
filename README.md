<h1 align="center">Sameer Shanbhag — Portfolio</h1>

<p align="center">
  Personal portfolio website of <a href="https://www.linkedin.com/in/sameershanbhag/">Sameer Shanbhag</a> —
  software engineer working across full-stack development, distributed systems, and cloud infrastructure.
</p>

<p align="center">
  <strong>Live:</strong> <a href="https://sameershanbhag.com">sameershanbhag.com</a> ·
  <strong>Blog:</strong> <a href="https://blog.sameershanbhag.com">blog.sameershanbhag.com</a>
</p>

## Tech Stack

- [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- [react-router-dom v5](https://v5.reactrouter.com/) (HashRouter)
- [styled-components](https://styled-components.com/) for theming (purple theme)
- [react-awesome-reveal](https://github.com/morellodev/react-awesome-reveal) for scroll animations
- [Base Web (baseui)](https://baseweb.design/) accordion for the experience page
- Deployed to GitHub Pages via `gh-pages`

## Development

```bash
npm install       # install dependencies (Node 20+ recommended)
npm run dev       # start the Vite dev server
npm run build     # production build into build/
npm run preview   # preview the production build locally
npm run deploy    # build and publish build/ to the gh-pages branch
```

## Refreshing GitHub project data

`git_data_fetcher.mjs` pulls pinned repositories, pull requests, and issues from the
GitHub GraphQL API. Copy `env.example` to `.env`, fill in `GITHUB_TOKEN` and
`GITHUB_USERNAME`, then run:

```bash
node git_data_fetcher.mjs
```

## Structure

- `src/portfolio.js` — all portfolio content (greeting, skills, experience, education, contact)
- `src/theme.js` — the purple color theme
- `src/pages/` — route-level pages (splash, home, education, experience, projects, contact)
- `src/containers/` and `src/components/` — sections and reusable pieces

## Credits

Based on the excellent [masterPortfolio](https://github.com/ashutosh1919/masterPortfolio)
template by [Ashutosh Hathidara](https://github.com/ashutosh1919) (MIT licensed) —
heavily customized, trimmed, and migrated to Vite + React 18.

## License

MIT — see [LICENSE](./LICENSE).
