import type { APIUser } from 'discord-api-types/v10';
import { BACKEND_URL } from "$env/static/private";
export const prerender = false;

export async function load({ fetch, cookies }) {
    try {
        const sessionToken = cookies.get('__Secure-session_token');

        if (!sessionToken) {
            console.warn('No session token found');
            return { user: null };
        }

        const res = await fetch(`${BACKEND_URL}/api/user`, {
            credentials: 'include',
            headers: {
                'Cookie': `__Secure-session_token=${sessionToken}`
            }
        });

        if (!res.ok) {
            console.warn(`Failed to fetch user: ${res.status}`);
            return { user: null };
        }

        const userData: APIUser = await res.json();
        return { user: userData };
    } catch (err) {
        console.error('Error while downloading user data:', err);
        return { user: null };
    }
}
