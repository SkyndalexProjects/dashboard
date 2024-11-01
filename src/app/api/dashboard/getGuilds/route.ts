import { cookies } from "next/headers";

export async function GET() {
	const cookieStore = await cookies();
	const access_token = cookieStore.get("access_token");

	const response = await fetch("https://discord.com/api/users/@me/guilds", {
		headers: {
			authorization: `Bearer ${access_token?.value}`,
		},
	});
	const data = await response.json();
	return Response.json(data);
}