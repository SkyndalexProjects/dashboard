import { error } from '@sveltejs/kit';
import type { APIUser } from 'discord-api-types/v10';

export async function load({ fetch, params }) {
	try {
		const res = await fetch(`http://localhost:3000/api/user`, {
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
