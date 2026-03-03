import type { APIChannel, APIGuild } from 'discord-api-types/v10';
import { env } from '$env/dynamic/private';
import { BACKEND_URL } from '$env/static/private';

export async function load({ fetch, cookies, params }) {
	try {
		const nodeEnv = process.env.NODE_ENV ?? 'development';
		const cookieName = nodeEnv === 'production' ? '__Secure-session_token' : 'session_token';
		const sessionToken = cookies.get(cookieName);

		if (!sessionToken) {
			console.warn('No session token found');
			return { guilds: [], channels: [] };
		}

		const guildId = params.id;

		if (!sessionToken) {
			console.warn('No session token found');
			return { guilds: [] };
		}

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

		const radioPlayerData = await fetch(`${BACKEND_URL}/api/guilds/${guildId}/radio_instance`, {
			credentials: 'include',
			headers: {
				Cookie: `${cookieName}=${sessionToken}`
			}
		}).then((res) => res.json());

		let radioPlayer = radioPlayerData;
		if (radioPlayerData?.requestedBy) {
			try {
				const userData = await fetch(`${BACKEND_URL}/api/users/${radioPlayerData.requestedBy}`, {
					credentials: 'include',
					headers: {
						Cookie: `${cookieName}=${sessionToken}`
					}
				}).then((res) => res.json());

				radioPlayer = {
					...radioPlayerData,
					requestedByUsername: userData?.username ?? radioPlayerData.requestedBy
				};
			} catch {
				radioPlayer = {
					...radioPlayerData,
					requestedByUsername: radioPlayerData.requestedBy
				};
			}
		}

		return {
			guilds,
			channels,
			radioPlayer
		};
	} catch (error) {
		console.error('Error fetching guilds:', error);

		return {
			guilds: []
		};
	}
}
