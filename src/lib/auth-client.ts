import { createAuthClient } from 'better-auth/svelte';
import { PUBLIC_BACKEND_URL, PUBLIC_FRONTEND_URL } from '$env/static/public';

const origin = (PUBLIC_FRONTEND_URL || '').replace(/\/$/, '');

export const authClient = createAuthClient({
	baseURL: `${origin}/auth`,
	trustedOrigins: [
		PUBLIC_FRONTEND_URL,
		'https://beta.skyndalex.com',
		'https://skyndalex.com',
		'https://api.skyndalex.com'
	],
	cors: {
		origin: [
			PUBLIC_FRONTEND_URL,
			'https://beta.skyndalex.com',
			'https://skyndalex.com',
			'https://api.skyndalex.com'
		],
		credentials: true
	},
	fetchOptions: {
		credentials: 'include'
	}
});

export const { signIn, signUp, useSession } = authClient;
