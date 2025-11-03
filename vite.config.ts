import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	const target = env.BACKEND_URL;

	return {
		plugins: [sveltekit()],
		server: {
			port: 5173,
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
