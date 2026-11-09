# WSO2 Open Banking UK Toolkit Documentation

This repository contains the source code for WSO2 Open Banking Toolkit - UK documentation

## Prerequisites

The site is built with [Docusaurus](https://docusaurus.io/) 3. You need [Node.js](https://nodejs.org/) 20 or later and npm.

```bash
$ node --version
v20.0.0
```

## Run project locally (Dev Mode)

**Clone the repo**

```bash
$ git clone https://github.com/wso2/docs-ob-toolkit-uk.git
```

**Install the dependencies**

```bash
$ cd docs-ob-toolkit-uk && npm ci
```

**Start the dev server**

```bash
$ npm run start
```

The site is served at `http://localhost:3000/en/latest/`.

## Commands

| Command | What it does |
| :------ | :----------- |
| `npm run start` | Dev server with hot reload on port 3000. |
| `npm run build` | Production build into `build/`. `BASE_URL` selects where the site is mounted (default `/en/latest/`, must look like `/en/<version>/`). |
| `npm run typecheck` | TypeScript check (`tsc`). |
| `npm run audit` | Dependency security audit (`audit-ci`), also run in CI. |

## Writing content

Pages live in `en/docs/` and stay `.md` files, but Docusaurus compiles them as **MDX**, so the parser is strict:

- Write `{` and `<` that are not meant as code or JSX inside backticks or fenced code blocks. Outside code, escape them
  (`\{`, `\<`) or use a code span, for example `` `<APIM_HOME>` ``. A bare `<APIM_HOME>` is read as a JSX tag and fails the build.
- Indented code blocks are not supported; use fenced blocks.
- HTML comments are written `{/* comment */}`, not `<!-- -->`.
- Callouts use `:::note`, `:::tip`, `:::info`, `:::warning`, `:::caution` or `:::danger` and are closed with `:::`.
  Collapsible content uses `<details><summary>...</summary>...</details>`.
- Internal links are relative `.md` paths with an optional anchor. Images live in `en/docs/assets/img/`, and downloadable files in `static/assets/attachments/`.

`npm run build` reports any page that does not compile.

## Broken links

The site has links and anchors that were already broken in the MkDocs version. They are kept as they were, so
Docusaurus' `onBrokenLinks`, `onBrokenAnchors` and `onBrokenMarkdownLinks` are set to `warn` rather than `throw`. The
build prints them. Fix them in the content, and once none are left, switch the three settings to `throw`.

## Deploy

Pushes to `main` run `.github/workflows/deploy.yml`, which builds the site twice (`BASE_URL=/en/latest/` and
`BASE_URL=/en/1.0.0/`) and publishes the builds to the `gh-pages` branch folders `en/latest` and `en/1.0.0` using
`JamesIves/github-pages-deploy-action`. The workflow can also be started manually (`workflow_dispatch`). Pull requests
against `main` and `versions` run `.github/workflows/pr-checks.yml`: `npm ci`, audit, typecheck and build. Workflow actions
are pinned by commit SHA.

## License

Licenses this source under the Apache License, Version 2.0 ([LICENSE](LICENSE)), You may not use this file except in compliance with the License.
