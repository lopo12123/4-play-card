import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [ vue() ],
    base: './',
    resolve: {
        alias: {
            '@': resolve("src")
        }
    },
    server: {
        port: 10086,
        proxy: {
            '/api': '127.0.0.1:10087'
        }
    },
})
