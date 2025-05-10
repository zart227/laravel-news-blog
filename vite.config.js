import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
    resolve: {
        alias: {
            '@': '/resources/js',
            'ziggy-js': path.resolve('node_modules/ziggy-js/dist/index.esm.js'),
        },
    },
    optimizeDeps: {
        include: ['ziggy-js'],
    },
    server: {
        hmr: {
            host: 'localhost',
        },
        watch: {
            usePolling: true,
        },
        host: true,
        port: 5173,
        proxy: {
            '/api': {
                target: 'http://localhost:80',
                changeOrigin: true,
                secure: false,
            },
            '/storage': {
                target: 'http://localhost:80',
                changeOrigin: true,
                secure: false,
            },
            '/tags': {
                target: 'http://localhost:80',
                changeOrigin: true,
                secure: false,
            },
            '/articles': {
                target: 'http://localhost:80',
                changeOrigin: true,
                secure: false,
            },
        },
    },
});
