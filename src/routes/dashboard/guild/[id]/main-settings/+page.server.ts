import { BACKEND_URL } from '$env/static/private';
import type { APIChannel, APIGuild } from 'discord-api-types/v10';

export async function load({ fetch, params }) {
	const guildId = params.id;

	const guilds: Promise<APIGuild[]> = fetch(`${BACKEND_URL}/api/guilds`).then((res) => res.json());
	const channels: Promise<APIChannel[]> = fetch(
		`${BACKEND_URL}/api/guilds/${guildId}/channels`
	).then((res) => res.json());
	return {
		guilds,
		channels
	};
}
