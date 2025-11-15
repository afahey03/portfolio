import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'

export default defineConfig({
    plugins: [
        react(),
        {
            name: 'copy-cname',
            closeBundle() {
                try {
                    copyFileSync('CNAME', 'dist/CNAME')
                    copyFileSync('robots.txt', 'dist/robots.txt')
                } catch (e) {
                    console.warn('Could not copy files:', e.message)
                }
            }
        }
    ],
    base: '/',
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
    },
})
