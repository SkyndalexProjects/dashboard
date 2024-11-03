import { auth } from "@/app/auth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
	const url = new URL(req.url);
	const guildId = url.searchParams.get("id");

	const session = await auth();

	if (session) {
		const response = await fetch(`https://discord.com/api/guilds/${guildId}`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${session?.accessToken}`,
			},
		});
		const data = await response.json();
		console.log("get guild", data);
		return Response.json(data);
	}
}
