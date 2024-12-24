# ProIcons Figma Plugin
![Figma](https://img.shields.io/badge/Figma-F24E1E?logo=figma&logoColor=white&style=for-the-badge)
![Sass](https://img.shields.io/badge/Sass-C69?logo=sass&logoColor=fff&style=for-the-badge)
![Svelte](https://img.shields.io/badge/Svelte-%23f1413d.svg?logo=svelte&logoColor=white&style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=for-the-badge)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff&style=for-the-badge)

> [!NOTE]
> This plugin is still a work in progress in active development. You can still use it right now, but not all features have been completed.

The official Figma plugin for the [ProIcons icon library](https://github.com/ProCode-Software/proicons). Built with [Svelte](https://svelte.dev), [Vite](https://vite.dev), Sass and TypeScript.

<img src=".github/preview-light.png#gh-light-mode-only" alt="Preview" height="500">
<img src=".github/preview-dark.png#gh-dark-mode-only" alt="Preview" height="500">

## Features
- 🔣 Use the latest ProIcons in your design
- 🎨 Customize the icons before adding
- 📐 Modern, Figma UI3-based interface
- ✏️ Works with Figma and FigJam

## Community Page
Coming Soon

## Building from Source
1. Clone the repository
```shell
git clone https://github.com/ProCode-Software/proicons-figma.git
```
2. Install dependencies ([PNPM](https://pnpm.io) is required)
```shell
pnpm install
```
3. Run `pnpm run build` to build the plugin into `dist` folder

### Development
If you want to make changes to the plugin in development, you can run `pnpm run dev` instead. This builds the plugin in development mode, rebuilding as changes are made.

- The UI is bundled in `dist/index.html`. The CSS and JavaScript are inlined by [`vite-plugin-singlefile`](https://npmjs.com/package/vite-plugin-singlefile) due to Figma plugin limitations.
- The plugin code is available in `dist/index.js`