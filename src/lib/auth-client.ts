import { createAuthClient } from 'better-auth/svelte';
export const authClient = createAuthClient({
	baseURL: 'http://localhost:3000/api/auth',
	trustedOrigins: ['http://localhost:3000'],
	cors: {
		origin: ['http://localhost:3000'],
		credentials: true
	}
});

export const { signIn, signUp, useSession } = authClient;
