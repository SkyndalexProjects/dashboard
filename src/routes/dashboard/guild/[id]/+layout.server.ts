import { error } from '@sveltejs/kit';
import type { APIGuild } from 'discord-api-types/v10';
import { BACKEND_URL } from "$env/static/private";

export async function load({ fetch, params }) {
    try {
        const res = await fetch(`${BACKEND_URL}/guild`, {
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
    } catch (e: unknown | { message: string }) {
        const message = (e instanceof Error) ? e.message : 'Unknown error';
        throw error(500, message);
    }
}
