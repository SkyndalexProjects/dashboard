import type { APIGuild } from 'discord-api-types/v10';

export async function load({ fetch }) {
	const guilds: Promise<APIGuild[]> = fetch('http://localhost:3000/api/guilds').then((res) =>
		res.json()
	);

	return {
		guilds
	};
}
