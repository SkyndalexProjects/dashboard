import type { APIUser } from 'discord-api-types/v10';
import { BACKEND_URL } from '$env/static/private';
export const prerender = false;

export async function load({ fetch, cookies, params }) {
    try {
        const nodeEnv = process.env.NODE_ENV ?? 'development';
        const cookieName = nodeEnv === 'production' ? '__Secure-session_token' : 'session_token';

        const sessionToken = cookies.get(cookieName);

        if (!sessionToken) {
            console.warn(`No session token found (cookie name: ${cookieName})`);
            return { user: null };
        }

        const res = await fetch(`${BACKEND_URL}/api/user`, {
            credentials: 'include',
            headers: {
                Cookie: `${cookieName}=${sessionToken}`
            }
        });

        if (!res.ok) {
            console.warn(`Failed to fetch user: ${res.status}`);
            return { user: null };
        }

        const userData: APIUser = await res.json();
        return { user: userData, guildId: params.id };
    } catch (err) {
        console.error('Error while downloading user data:', err);
        return { user: null };
    }
}
