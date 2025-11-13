import type { LayoutServerLoad } from './$types';

export const prerender = false;

export const load: LayoutServerLoad = async ({ parent }) => {
	const data = await parent();
	return data;
};
