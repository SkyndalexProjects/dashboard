import { auth } from "@/app/auth";
export const dynamic = "force-static";
export async function GET() {
  try {
    const session = await auth();

    console.log("session", session);
    const response = await fetch("https://discord.com/api/users/@me/guilds", {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
    const data = await response.json();
    return new Response(JSON.stringify({ data }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error in GET function:", error);
    return new Response(null, { status: 500, statusText: 'Internal Server Error' });
  }
}
