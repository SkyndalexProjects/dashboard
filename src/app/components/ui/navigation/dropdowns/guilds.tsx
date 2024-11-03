"use client";

import type { AppDispatch, RootState } from "@/app/store";
import { fetchGuilds } from "@/app/thunks/guilds";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

const GuildsDropdown = () => {
	const dispatch = useDispatch<AppDispatch>();
	const haveGuildsFetched = useSelector(
		(state: RootState) => state.guilds.haveGuildsFetched,
	);

	useEffect(() => {
		if (!haveGuildsFetched) {
			dispatch(fetchGuilds());
		}
	}, [dispatch, haveGuildsFetched]);

	const guilds = useSelector((state: RootState) =>
		Array.isArray(state.guilds.data) ? state.guilds.data : undefined,
	)
		?.slice()
		.sort((a, b) => {
			if (a.icon && !b.icon) return -1;
			if (!a.icon && b.icon) return 1;
			return 0;
		});

		const currentGuild = useParams().guildId
		const currentGuildData = guilds?.find(guild => guild.id === currentGuild)

	return (
		<ul>
			<li className="dropdown">
				<p className="dropdown-toggle" data-toggle="dropdown">
					<Image src={`https://cdn.discordapp.com/icons/${currentGuildData.id}/${currentGuildData.icon}.png`} alt="menu" width={38} height={37} />{" "}
					{currentGuildData.name} 
					<Image src="/dropdown.svg" alt="dropdown" width={38} height={37} className="dropdown-icon" />{" "}

					<b className="caret"></b>
				</p>
				<ul className="dropdown-menu">
					{guilds &&
						guilds.map((guild) => (
							<li key={guild.id}>
								<Link href={`/dashboard/servers/${guild.id}`}>
									<img
										src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
										alt={guild.name}
										className="guild-icon"
									/>
									{guild.name}
								</Link>
							</li>
						))}
				</ul>
			</li>
		</ul>
	);
};

export default GuildsDropdown;
