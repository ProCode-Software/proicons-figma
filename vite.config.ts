import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
    plugins: [svelte()],
    build: {
        target: 'ES2015',
        rollupOptions: {
            input: {
                index: './src/main.ts', // Figma
                ui: './index.html'
            },
            output: {
                dir: './dist',
                entryFileNames: `[name].js`,
                chunkFileNames: `[name].js`,
                assetFileNames: `[name].[ext]`
            },
        }
    }
})
