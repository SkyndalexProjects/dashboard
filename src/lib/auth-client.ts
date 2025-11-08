import { createAuthClient } from 'better-auth/svelte';
import { PUBLIC_BACKEND_URL, PUBLIC_FRONTEND_URL } from '$env/static/public';

const origin = (PUBLIC_FRONTEND_URL || '').replace(/\/$/, '');

export const authClient = createAuthClient({
    emailAndPassword: {
        enabled: false
    },
    baseURL: `${origin}/auth`,
    trustedOrigins: [
        process.env.FRONTEND_URL as string,
        'https://beta.skyndalex.com',
        'https://skyndalex.com',
        'https://api.skyndalex.com'
    ],
    advanced: {
        useSecureCookies: true,
        crossSubDomainCookies: {
            enabled: true,
            domain: process.env.OAUTH_DOMAIN as string,
        },
    },
    cors: {
        origin: [
            process.env.FRONTEND_URL as string,
            'https://beta.skyndalex.com',
            'https://skyndalex.com',
            'https://api.skyndalex.com'
        ],
        credentials: true,
    },
    session: {
        cookie: {
            sameSite: 'none',
            secure: true,
        },
        cookieCache: {
            enabled: true,
            maxAge: 15 * 60,
        },
    }
});

export const { signIn, signUp, useSession } = authClient;
