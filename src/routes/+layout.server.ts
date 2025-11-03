import { error } from '@sveltejs/kit';
import type { APIUser } from 'discord-api-types/v10';
import { BACKEND_URL } from "$env/static/private";

export async function load({ fetch }) {
	try {
		const res = await fetch(`${BACKEND_URL}/api/user`, {
			credentials: 'include'
		});

		if (!res.ok) {
			error(res.status, 'Error while fetching user');
		}

		const userData: APIUser = await res.json();
		return { user: userData };
	} catch (err) {
		console.error('Error while downloading user data:', err);
		return { data: null };
	}
}
