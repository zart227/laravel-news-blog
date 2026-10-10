import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'url';
import { resolve } from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.js',
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
            '@': fileURLToPath(new URL('./resources/js', import.meta.url)),
            'ziggy': fileURLToPath(new URL('./vendor/tightenco/ziggy/dist/index.js', import.meta.url)),
            'vue': 'vue/dist/vue.esm-bundler.js'
        },
    },
    build: {
        chunkSizeWarningLimit: 1000,
        cssCodeSplit: true,
        sourcemap: false,
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true
            }
        },
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor': [
                        'vue',
                        'vue-toastification',
                        '@inertiajs/vue3',
                        'chart.js',
                        'vue-chartjs',
                        'pinia'
                    ],
                    'utils': [
                        'lodash',
                        'axios',
                        'date-fns'
                    ]
                },
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js',
                assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
            }
        }
    },
    optimizeDeps: {
        include: ['ziggy-js', 'vue-toastification'],
        exclude: ['vue-demi']
    }
});
