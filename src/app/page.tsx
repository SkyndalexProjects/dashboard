"use client";
import type { Guild } from "@/app/globals";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { SignIn } from "./components/ui/signIn";

export default function PageContent() {
	const { data: session } = useSession();
	const [guilds, setGuilds] = useState<Guild[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			if (session?.user && guilds.length === 0) {
				const fetchGuilds = await fetch("/api/user/getGuilds");
				const guildsData = await fetchGuilds.json();

				const filteredGuilds: Guild[] = guildsData.filter(
					(guild: Guild) => guild.permissions === 2147483647,
				);
				setGuilds(filteredGuilds);
			}
		};
		fetchData();
	}, [session]);

	console.log("guilds", guilds);

	if (session) {
		return (
			<div>
				Signed in as {session.user?.name} <br />
				<button onClick={() => signOut()}>Sign out</button>
				<h2>Choose guild:</h2>
				<div className="guilds-grid">
					{guilds.map((guild) => (
						<div
							key={guild.id}
							className="guild"
							onClick={() =>
								redirect(`/dashboard/servers/${guild.id}`)
							}
						>
							<img
								src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
								alt={`<no icon>`}
							/>
							<p>{guild.name}</p>
						</div>
					))}
				</div>
			</div>
		);
	}

	return (
		<div>
			<SignIn />
		</div>
	);
}
