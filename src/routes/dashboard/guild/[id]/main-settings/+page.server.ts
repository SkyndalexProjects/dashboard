import { error } from '@sveltejs/kit';

export async function load({ fetch, params }) {
	try {
		const guildId = params.id;
		const guildsRes = await fetch(`http://localhost:3000/api/guilds`, {
			credentials: 'include'
		});
		if (!guildsRes.ok) {
			error(guildsRes.status, 'Błąd podczas pobierania guildów');
		}
		const guildsData = await guildsRes.json();

		const channelsRes = await fetch(`http://localhost:3000/api/guilds/${guildId}/channels`, {
			credentials: 'include'
		});
		if (!channelsRes.ok) {
			error(channelsRes.status, 'Błąd podczas pobierania kanałów');
		}
		const channelsData = await channelsRes.json();

		return { guilds: guildsData, channels: channelsData };
	} catch (err) {
		console.error('Błąd podczas pobierania danych:', err);
		return { guilds: null, channels: null };
	}
}
