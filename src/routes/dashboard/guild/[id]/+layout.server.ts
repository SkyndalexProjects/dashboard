import { error } from '@sveltejs/kit';
import type { APIGuild } from 'discord-api-types/v10';

export async function load({ fetch, params }) {
	try {
		const res = await fetch(`http://localhost:3000/api/guild`, {
			credentials: 'include',
			headers: {
				guildId: params.id
			}
		});
		if (!res.ok) {
			return error(res.status, 'Error while fetching guild');
		}

		const guild: APIGuild = await res.json();
		return { guild };
	} catch (e: any) {
		error(500, e.message);
	}
}
