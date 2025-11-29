import { BACKEND_URL } from '$env/static/private';
import type { APIChannel, APIGuild } from 'discord-api-types/v10';
import { error } from '@sveltejs/kit';

export async function load({ fetch, params, cookies }) {
	try {
        const nodeEnv = process.env.NODE_ENV ?? 'development';
        const cookieName = nodeEnv === 'production' ? '__Secure-session_token' : 'session_token';
        const sessionToken = cookies.get(cookieName);

		if (!sessionToken) {
			console.warn('No session token found');
			return { guilds: [], channels: [] };
		}

		const guildId = params.id;

		const guilds: Promise<APIGuild[]> = fetch(`${BACKEND_URL}/api/guilds`, {
			credentials: 'include',
            headers: {
                Cookie: `${cookieName}=${sessionToken}`
            }
		}).then((res) => res.json());

		const channels: Promise<APIChannel[]> = fetch(`${BACKEND_URL}/api/guilds/${guildId}/channels`, {
			credentials: 'include',
            headers: {
                Cookie: `${cookieName}=${sessionToken}`
            }
		}).then((res) => res.json());

		return {
			guilds,
			channels
		};
	} catch (e: unknown | { message: string }) {
		const message = e instanceof Error ? e.message : 'Unknown error';
		throw error(500, message);
	}
}
