import type { APIGuild } from 'discord-api-types/v10';
import { env } from '$env/dynamic/private';

export async function load({ fetch }) {
	try {
		const guilds: Promise<APIGuild[]> = fetch(`${env.BACKEND_URL}/api/guilds`).then((res) =>
			res.json()
		);

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
