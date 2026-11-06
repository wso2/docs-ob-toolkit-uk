import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import fs from 'fs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** Branch-specific values: the only file that differs between the main and versions branches. */
type SiteBranch = {
  siteVersion: string;
  editBranch: string;
  defaultBaseUrl: string;
  searchFacetVersion: string;
};
const siteBranch: SiteBranch = JSON.parse(fs.readFileSync('./site.branch.json', 'utf-8'));

/** The site is only ever published under /en/<name>/ on uk.ob.docs.wso2.com (here: /en/versions/). */
const BASE_URL_PATTERN = /^\/en\/[a-z0-9.-]+\/$/;

/**
 * Resolve the base URL from the BASE_URL environment variable (or the branch default) and fail
 * closed: anything outside /en/<name>/ aborts the build rather than publishing to a wrong path.
 */
function resolveBaseUrl(): string {
  const candidate = process.env.BASE_URL ?? siteBranch.defaultBaseUrl;
  const segment = candidate.split('/')[2] ?? '';
  if (!BASE_URL_PATTERN.test(candidate) || /^\.+$/.test(segment)) {
    throw new Error(
      `Invalid BASE_URL "${candidate}": it must match ${BASE_URL_PATTERN} (for example /en/versions/).`,
    );
  }
  return candidate;
}

const siteUrl = 'https://uk.ob.docs.wso2.com';
const baseUrl = resolveBaseUrl();
const siteName = 'WSO2 Open Banking UK Toolkit Documentation';
const docsRepoUrl = 'https://github.com/wso2/docs-ob-toolkit-uk';

const config: Config = {
  // The MkDocs `site_name` (en/mkdocs.yml).
  title: siteName,
  favicon: 'img/favicon.png',

  future: {
    // Kept off, as on the other branches (see the master branch config).
    v4: false,
  },

  url: siteUrl,
  baseUrl,

  // Matches the URLs MkDocs published (directory-style, trailing slash).
  trailingSlash: true,

  organizationName: 'wso2',
  projectName: 'docs-ob-toolkit-uk',

  // This site is a single page, so a broken link is a real mistake.
  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    format: 'mdx',
    hooks: {
      onBrokenMarkdownLinks: 'throw',
      onBrokenMarkdownImages: 'throw',
    },
  },

  presets: [
    [
      'classic',
      {
        // No docs: the site is the versions page (src/pages/index.tsx).
        docs: false,
        blog: false,
        sitemap: false,
        theme: {
          // Order matters, as on the other branches: site-theme.css layers over custom.css, and
          // ob-content.css (page content styles) loads last.
          customCss: [
            './src/css/custom.css',
            './src/css/site-theme.css',
            './src/css/ob-content.css',
            './src/css/site-look.css',
          ],
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    metadata: [
      {property: 'og:site_name', content: siteName},
      {property: 'og:type', content: 'website'},
      {name: 'description', content: 'Documentation versions of WSO2 Open Banking UK Toolkit'},
    ],
    // Search of the documentation: the same Algolia index and filters as the documentation site. Results are
    // pages of that site, so they open with a full page load (src/theme/SearchBar).
    algolia: {
      appId: '53Q7C94S0J',
      apiKey: '280329fc265f64e34a554d44b16e8979',
      indexName: 'wso2_toolkit',
      contextualSearch: false,
      searchPagePath: false,
      searchParameters: {
        facetFilters: ['language:en', `version:${siteBranch.searchFacetVersion}`],
      },
    },
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      // Brand = icon + "Open Banking UK Toolkit Documentation" (src/theme/Navbar/Logo, links to the latest docs).
      logo: {
        alt: 'WSO2 Open Banking UK Toolkit Documentation',
        src: 'img/wso2-pulse.svg',
        srcDark: 'img/wso2-pulse-dark.svg',
        height: 32,
        width: 32,
      },
      items: [
        {
          href: docsRepoUrl,
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      // Same grey footer as the documentation sites. `copyright` is rendered as HTML by Docusaurus;
      // this is a static literal with no interpolated or user-supplied content.
      style: 'dark',
      copyright:
        'WSO2 Open Banking UK Toolkit - Documentation<br />' +
        'Copyright © WSO2 LLC 2017-2022 | Content licensed under CC By 4.0 | Sample code licensed under Apache 2.0',
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
