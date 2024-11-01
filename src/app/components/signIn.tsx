"use client";
import { permanentRedirect } from "next/navigation";

export function SignIn() {
	return (
		<button
			onClick={() =>
				permanentRedirect(process.env.NEXT_PUBLIC_DISCORD_AUTH_URL as string)
			}
		>
			Sign In
		</button>
	);
}
