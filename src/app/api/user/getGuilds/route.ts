import { auth } from "@/app/auth";
import type { Guild } from "@/app/globals";

export async function GET() {
	const session = await auth();
	if (session?.user) {
		const response = await fetch(
			"https://discord.com/api/users/@me/guilds",
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${session?.accessToken}`,
				},
			},
		);
		const data = await response.json();
		const filteredGuilds = data.filter(
			(guild: Guild) => guild.permissions === 2147483647,
		);
		return Response.json(filteredGuilds);
	}
	return Response.json({ error: "Unauthorized" }, { status: 401 });
}
