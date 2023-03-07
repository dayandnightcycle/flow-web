import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    build: {
        chunkSizeWarningLimit: 4000
    },
    server: {
        host: '0.0.0.0',
        port: '8080',
        open: true,

        proxy: {
            "/flow": {
                target: 'http://10.43.68.29:8081',
                changeOrigin: true
            },
            "/test": {
                target: 'http://10.43.68.29:8079',
                changeOrigin: true
            },
        }
    },
    optimizeDeps: {
        // include: ['@/../../lib/vform3/designer.umd.js']
        include: ['@/../lib/vform3/designer.umd.js']  //此处路径必须跟main.js中import路径完全一致！
        //此处路径必须跟main.js中import路径完全一致！
    },
})

