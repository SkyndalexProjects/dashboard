import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	const target = env.BACKEND_URL;
    const backendDev = env.BACKEND_URL || 'http://127.0.0.1:4173';

	return {
		plugins: [sveltekit()],
        server: {
            proxy: {
                '/api': {
                    target: 'http://localhost:4173',
                    changeOrigin: true,
                    secure: false,
                    configure: (proxy) => {
                        proxy.on('proxyReq', (_proxyReq, req) => {
                            req.headers.host = new URL(backendDev).host;
                        });
                    }
                }
            }
        }
	};
});
