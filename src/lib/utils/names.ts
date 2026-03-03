interface Channel {
	id: string;
	guildId: string;
	name: string;
	type: string;
}

export function asName(value: string, chs: Channel[] | null | undefined): string {
	const arr = Array.isArray(chs) ? chs : [];
	const found = arr.find((c) => String(c.id) === value || String(c.name) === value);
	return found ? String(found.name) : value;
}
