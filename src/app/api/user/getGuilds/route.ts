import { auth } from "@/app/auth";

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
		return Response.json(data);
	}
	return Response.json({ error: "Unauthorized" }, { status: 401 });
}
