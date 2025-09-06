<h1 align="center">jellyfin.org</h1>
<h3 align="center">Part of the <a href="https://jellyfin.org">Jellyfin Project</a></h3>

---

<p align="center">
<img alt="Logo Banner" src="https://raw.githubusercontent.com/jellyfin/jellyfin-ux/master/branding/SVG/banner-logo-solid.svg?sanitize=true"/>
</p>

The next generation of the official Jellyfin website.

The goal of this project is to combine all website on jellyfin.org in a single codebase and improve the documentation site experience.

This project includes a combination of content from:

- [jellyfin-blog](https://github.com/jellyfin/jellyfin-blog) &mdash; The current source for the main website and blog content built using Hugo.
- [jellyfin-docs](https://github.com/jellyfin/jellyfin-docs) &mdash; The current source for the documentation content built using DocFX.

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```console
npm install
```

## Local Development

```console
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```console
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.
