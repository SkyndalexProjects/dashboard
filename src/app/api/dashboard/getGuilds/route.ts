<<<<<<< HEAD
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
=======
import { auth } from "@/app/auth";
export async function GET() {
    const session = await auth()
    console.log("accessToken", session?.accessToken);
    const response = await fetch("https://discord.com/api/users/@me/guilds", {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
    const data = await response.json();

    console.log("data", data);
    return Response.json(data);
>>>>>>> b43c062 (fix: authentication (with Authjs))
}
