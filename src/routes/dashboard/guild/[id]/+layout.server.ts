import { error } from '@sveltejs/kit';
import type { APIGuild } from 'discord-api-types/v10';
import { BACKEND_URL } from '$env/static/private';

export async function load({ fetch, params, cookies }) {
	try {
		const sessionToken = cookies.get('__Secure-session_token');

		if (!sessionToken) {
			console.warn('No session token found');
			return error(401, 'No session token found');
		}

		const guildRes = await fetch(`${BACKEND_URL}/api/guild`, {
			credentials: 'include',
			headers: {
				Cookie: `__Secure-session_token=${sessionToken}`,
				guildId: params.id
			}
		});

		if (!guildRes.ok) {
			return error(guildRes.status, 'Error while fetching guild');
		}

		// const guildsRes = await fetch(`${BACKEND_URL}/api/guilds`, {
		//     credentials: 'include',
		//     headers: {
		//         Cookie: `__Secure-session_token=${sessionToken}`
		//     }
		// });

		const guildsPromise: Promise<APIGuild[]> = fetch(`${BACKEND_URL}/api/guilds`).then((res) =>
			res.json()
		);

		const guild: APIGuild = await guildRes.json();

		return { guild, guilds: guildsPromise };
	} catch (e: unknown | { message: string }) {
		const message = e instanceof Error ? e.message : 'Unknown error';
		throw error(500, message);
	}
}
