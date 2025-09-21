import { error } from '@sveltejs/kit';
import type { APIChannel, APIGuild, APIUser } from 'discord-api-types/v10';

export async function load({ fetch, params }) {
	const guildId = params.id;

	const guilds: Promise<APIGuild[]> = fetch('http://localhost:3000/api/guilds').then((res) =>
		res.json()
	);
	const channels: Promise<APIChannel[]> = fetch(
		`http://localhost:3000/api/guilds/${guildId}/channels`
	).then((res) => res.json());
	return {
		guilds,
		channels
	};
}
