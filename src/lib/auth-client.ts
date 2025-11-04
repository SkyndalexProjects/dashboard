import { createAuthClient } from 'better-auth/svelte';
import { PUBLIC_BACKEND_URL } from '$env/static/public';

const origin = (PUBLIC_BACKEND_URL || '').replace(/\/$/, '');

console.log("origin:", origin);
export const authClient = createAuthClient({
	baseURL: `${origin}/auth`,
	trustedOrigins: [origin],
	cors: {
		origin: [origin],
		credentials: true
	}
});

export const { signIn, signUp, useSession } = authClient;
