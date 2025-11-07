import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const target = env.BACKEND_URL;

    return {
        plugins: [sveltekit()],
        server: {
            port: 5173,
            watch: {usePolling: true,}, // Enable hot reload
            host: '0.0.0.0',
            proxy: {
                '/api': {
                    target,
                    changeOrigin: true,
                    secure: true,
                    rewrite: (p) => p.replace(/^\/api/, '')
                }
            }
        },
        preview: {
            port: 4173,
            proxy: {
                '/api': {
                    target,
                    changeOrigin: true,
                    secure: true,
                    rewrite: (p) => p.replace(/^\/api/, '')
                }
            }
        }
    };
});