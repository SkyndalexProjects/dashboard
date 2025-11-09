import { error } from '@sveltejs/kit';
import type { APIGuild } from 'discord-api-types/v10';
import { env } from '$env/dynamic/private';

export async function load({ fetch, cookies }): Promise<{ guilds: APIGuild[] }> {
    try {
        const sessionToken = cookies.get('__Secure-session_token');

        if (!sessionToken) {
            console.warn('No session token found');
            return { guilds: [] };
        }

        console.log("Trying to fetch guilds from backend...");
        const res = await fetch(`${env.BACKEND_URL}/api/guilds`, {
            credentials: 'include',
            headers: {
                'Cookie': `__Secure-session_token=${sessionToken}`
            }
        });

        if (!res.ok) {
            return error(res.status, 'Error while fetching guilds');
        }

        const guildsData: APIGuild[] = await res.json();
        console.log('Fetched guilds data:', guildsData);
        return {
            guilds: guildsData
        };
    } catch (err) {
        console.error('Error while downloading guilds data:', err);
        return { guilds: [] };
    }
}