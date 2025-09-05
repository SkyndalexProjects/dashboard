import { error } from '@sveltejs/kit';

export async function load({ fetch }) {
	try {
		const res = await fetch(`http://localhost:3000/api/guilds`, {
			credentials: 'include'
		});
		if (!res.ok) {
			throw error(res.status, 'Error while fetching guilds');
		}

		const guildsData = await res.json();
		return { guilds: guildsData };
	} catch (err) {
		console.error('Error while downloading guilds data:', err);
		return { data: null };
	}
}
