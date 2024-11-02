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
		icon: string;
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
				Signed in as {session.user?.name} <br />
				<button onClick={() => signOut()}>Sign out</button>
				<h2>Your Guilds:</h2>
				<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "10px" }}>
					{guilds.map((guild) => (
						<div key={guild.id} style={{ padding: "5px", textAlign: "center", borderColor: "#ffffff", borderStyle: "solid", borderWidth: "1px" }}>
							<img src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`} alt={`<no icon>`} style={{ width: "50px", height: "50px" }} />
							<p>{guild.name}</p>
						</div>
					))}
				</div>
				</div>
		)
	}

	return (
		<div>
			<SignIn />
		</div>
	);
}
