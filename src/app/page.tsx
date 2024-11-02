"use client";
import { SignIn } from "./components/signIn";
import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
export default function Page() {
	return (
		<SessionProvider>
			<PageContent />
		</SessionProvider>
	);
}

export function PageContent() {
	const { data: session } = useSession();
	const [guilds, setGuilds] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			if (session) {
				const fetchGuilds = await fetch("/api/dashboard/getGuilds");
				const guildsData = await fetchGuilds.json();
				setGuilds(guildsData);
			}
		};
		fetchData();
	}, [session]);

	console.log("guilds", guilds);
	if (session) {
		return (
			<div>
				Signed in as {session.user?.name} (${session.accessToken})<br />
				<button onClick={() => signOut()}>Sign out</button>
			</div>
		);
	}

	return (
		<div>
			<SignIn />
		</div>
	);
}
