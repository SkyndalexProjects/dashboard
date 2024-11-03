"use client";
import type { Guild } from "@/app/globals";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
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
		if (session) {
			fetchData();
		}
	}, [session]);

	if (session) {
		console.log("guilds", guilds);

		return (
			<div>
				<h1 className="title"> Welcome, {session.user?.name} </h1>
				<h2 className="title"> Please, choose guild:</h2>
				<div className="guilds-container">
					<div className="guilds-grid">
						{guilds.map((guild) => (
							<Link
								key={guild.id}
								href={`/dashboard/servers/${guild.id}`}
								className="guild"
							>
								<div>
									<img
										src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
										alt={`<no icon>`}
									/>
									<p>{guild.name}</p>
								</div>
							</Link>
						))}
					</div>
				</div>
				<button onClick={() => signOut()} className="sign-out">
					Sign out
				</button>
			</div>
		);
	}

	return (
		<div>
			<SignIn />
		</div>
	);
}
