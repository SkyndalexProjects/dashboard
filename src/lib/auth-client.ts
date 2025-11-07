import { createAuthClient } from 'better-auth/svelte';
import { PUBLIC_BACKEND_URL, PUBLIC_FRONTEND_URL } from '$env/static/public';

const origin = (PUBLIC_FRONTEND_URL || '').replace(/\/$/, '');

export const authClient = createAuthClient({
	baseURL: `${origin}/auth`,
	trustedOrigins: [origin],
	cors: {
		origin: [origin],
		credentials: true
	}
});

export const { signIn, signUp, useSession } = authClient;
