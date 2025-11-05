import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	const target = env.BACKEND_URL;

	return {
		plugins: [sveltekit()],
        server: {
            proxy: {
                '/api': {
                    target: 'http://localhost:4173',
                    changeOrigin: true,
                    secure: false
                }
            }
        }
	};
});
