import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        svelte(),
        // Assets in Figma must be inlined
        viteSingleFile({
            useRecommendedBuildConfig: false,
            inlinePattern: ['*ui*', '*.css']
        })
    ],
    build: {
        target: 'ES2015', // Figma doesn't support ?? operator
        rollupOptions: {
            input: {
                index: './src/main.ts', // Figma
                ui: './index.html' // UI
            },
            output: {
                dir: './dist',
                entryFileNames: `[name].js`,
                chunkFileNames: `[name].js`,
                assetFileNames: `[name].[ext]`,
            },
        }
    }
})
