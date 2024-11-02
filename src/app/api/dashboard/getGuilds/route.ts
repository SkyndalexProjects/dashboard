import { auth } from "@/app/auth";
export async function GET() {
	const session = await auth();
	console.log("accessToken", session?.accessToken);
	const response = await fetch("https://discord.com/api/users/@me/guilds", {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${session?.accessToken}`,
		},
	});
	const data = await response.json();

	console.log("data", data);
	return Response.json(data);
}
