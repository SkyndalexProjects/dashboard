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
	interface Guild {
		id: string;
		name: string;
		permissions: number;
	}
	const [guilds, setGuilds] = useState<Guild[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			if (session) {
				const fetchGuilds = await fetch("/api/dashboard/getGuilds");
				const guildsData = await fetchGuilds.json();

				const filteredGuilds: Guild[] = guildsData.filter(
					(guild: Guild) => guild.permissions === 2147483647,
				);
				setGuilds(filteredGuilds);
			}
		};
		fetchData();
	}, [session]);

	if (session) {
		return (
			<div>
				Signed in as {session.user?.name} (${session.accessToken})<br />
				<button onClick={() => signOut()}>Sign out</button>
				<h2>Your Guilds:</h2>
				<ul>
					{guilds.map((guild) => (
						<li key={guild.id}>{guild.name}</li>
					))}
				</ul>
			</div>
		);
	}

	return (
		<div>
			<SignIn />
		</div>
	);
}
