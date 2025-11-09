import { error } from '@sveltejs/kit';
import type { APIGuild } from 'discord-api-types/v10';
import { BACKEND_URL } from "$env/static/private";

export async function load({ fetch, params, cookies }) {
    try {
        const sessionToken = cookies.get('__Secure-session_token');

        if (!sessionToken) {
            console.warn('No session token found');
            return error(401, 'No session token found');
        }

        const res = await fetch(`${BACKEND_URL}/api/guild`, {
            credentials: 'include',
            headers: {
                'Cookie': `__Secure-session_token=${sessionToken}`,
                'guildId': params.id
            }
        });

        if (!res.ok) {
            return error(res.status, 'Error while fetching guild');
        }

        const guild: APIGuild = await res.json();
        return { guild };
    } catch (e: unknown | { message: string }) {
        const message = (e instanceof Error) ? e.message : 'Unknown error';
        throw error(500, message);
    }
}
