import { BACKEND_URL } from '$env/static/private';
import type { APIChannel, APIGuild } from 'discord-api-types/v10';
import { error } from "@sveltejs/kit";

export async function load({ fetch, params }) {
    try {
        const guildId = params.id;

        const guilds: Promise<APIGuild[]> = fetch(`${BACKEND_URL}/api/guilds`).then((res) => res.json());
        const channels: Promise<APIChannel[]> = fetch(
            `${BACKEND_URL}/api/guilds/${guildId}/channels`
        ).then((res) => res.json());
        return {
            guilds,
            channels
        };
    } catch (e: unknown | { message: string }) {
        const message = (e instanceof Error) ? e.message : 'Unknown error';
        throw error(500, message);
    }
}
