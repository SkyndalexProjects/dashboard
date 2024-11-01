import { cookies } from "next/headers";
export async function GET(req: Request) {
	const url = new URL(req.url);
	const code = url.searchParams.get("code");

	if (!code) {
		return new Response(
			JSON.stringify({ error: "Code parameter is missing" }),
			{ status: 400 },
		);
	}
	const response = await fetch("https://discord.com/api/oauth2/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({
			client_id: process.env.AUTH_DISCORD_ID as string,
			client_secret: process.env.AUTH_DISCORD_SECRET as string,
			redirect_uri: process.env.REDIRECT_URI as string,
			grant_type: "authorization_code",
			code,
			scope: "identify guilds",
		}),
	});
	const data = await response.json();
	const { access_token, expires_in } = data;

	const cookieStore = await cookies();
	const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

	cookieStore.set("access_token", access_token, {
		path: "/",
		secure: true,
		httpOnly: true,
		sameSite: "lax",
		expires,
	});

	return new Response(null, {
		status: 302,
		headers: {
			Location: "/",
		},
	});
}
