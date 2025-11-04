import { error } from '@sveltejs/kit';
import type { APIUser } from 'discord-api-types/v10';
import { BACKEND_URL } from "$env/static/private";
export const prerender = false;

export async function load({ fetch }) {
    try {
        const res = await fetch(`${BACKEND_URL}/api/user`, {
            credentials: 'include'
        });

        if (!res.ok) {
            console.warn(`Failed to fetch user: ${res.status}`);
            return { user: null };
        }

        const userData: APIUser = await res.json();
        return { user: userData };
    } catch (err) {
        console.error('Error while downloading user data:', err);
        return { user: null };
    }
}