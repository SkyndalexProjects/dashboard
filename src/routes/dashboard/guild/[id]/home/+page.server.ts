import type { APIGuild } from 'discord-api-types/v10';
import { env } from '$env/dynamic/private';

export async function load({ fetch, cookies }) {
    try {
        const sessionToken = cookies.get('__Secure-session_token');

        if (!sessionToken) {
            console.warn('No session token found');
            return { guilds: [] };
        }

        const guilds: Promise<APIGuild[]> = fetch(`${env.BACKEND_URL}/api/guilds`, {
            credentials: 'include',
            headers: {
                'Cookie': `__Secure-session_token=${sessionToken}`
            }
        }).then((res) => res.json());

        return {
            guilds
        };
    } catch (error) {
        console.error('Error fetching guilds:', error);

        return {
            guilds: []
        };
    }
}
