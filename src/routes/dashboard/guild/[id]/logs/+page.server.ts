import type { APIChannel, APIGuild } from 'discord-api-types/v10';
import { env } from '$env/dynamic/private';
import { BACKEND_URL } from '$env/static/private';

export async function load({ fetch, cookies, params }) {
	try {
		//TODO: fix outdated code
		const nodeEnv = process.env.NODE_ENV ?? 'development';
		const cookieName = nodeEnv === 'production' ? '__Secure-session_token' : 'session_token';

		const sessionToken = cookies.get('__Secure-session_token');

		if (!sessionToken) {
			console.warn('No session token found');
			return { guilds: [] };
		}
		const guildId = params.id;

		const guilds: Promise<APIGuild[]> = fetch(`${env.BACKEND_URL}/api/guilds`, {
			credentials: 'include',
			headers: {
				Cookie: `__Secure-session_token=${sessionToken}`
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
	} catch (error) {
		console.error('Error fetching guilds:', error);

		return {
			guilds: []
		};
	}
}
