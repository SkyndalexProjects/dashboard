"use client";
import type { Guild } from "@/app/globals";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { SignIn } from "./components/ui/signIn";
import Image from "next/image";
export default function PageContent() {
	const { data: session } = useSession();
	const [guilds, setGuilds] = useState<Guild[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			if (session?.user && guilds.length === 0) {
				const fetchGuilds = await fetch("/api/user/getGuilds");
				const guildsData = await fetchGuilds.json();

				setGuilds(guildsData);
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
				<div className="titles">
				<h1> Welcome, {session.user?.name} </h1>
				<h2> Please, choose guild:</h2>
				<hr className="title-divider" />

				</div>

				<div className="guilds-container">
					<div className="guilds-grid">
						{guilds.map((guild) => (
							<Link
								key={guild.id}
								href={`/dashboard/servers/${guild.id}`}
								className="guild"
							>
								<div className="guild-item">
									<Image
										src={guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png` : "/default-icon.png"}
										alt={guild.name}
										width={80}
										height={80}
									/>
									
									<div className="guild-name">{guild.name}</div>
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
		<div className="sign-in-container">
			<SignIn />
		</div>
	);
}
