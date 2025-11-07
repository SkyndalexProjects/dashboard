import { error } from '@sveltejs/kit';
import type { APIGuild } from 'discord-api-types/v10';
import { env } from '$env/dynamic/private';

export async function load({ fetch }): Promise<{ guilds: APIGuild[] }> {
	try {
		const res = await fetch(`${env.BACKEND_URL}/api/guilds`, {
			credentials: 'include'
		});

		if (!res.ok) {
			return error(res.status, 'Error while fetching guilds');
		}

		const guildsData: APIGuild[] = await res.json();
		return {
			guilds: guildsData
		};
	} catch (err) {
		console.error('Error while downloading guilds data:', err);
		return { guilds: [] };
	}
}
