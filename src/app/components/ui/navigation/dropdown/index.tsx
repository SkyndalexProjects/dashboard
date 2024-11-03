"use client";

import type { AppDispatch, RootState } from "@/app/store";
import { fetchGuilds } from "@/app/thunks/guilds";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
const Dropdown = () => {
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
	)?.slice().sort((a, b) => {
		if (a.icon && !b.icon) return -1;
		if (!a.icon && b.icon) return 1;
		return 0;
	});

	return (
		<ul>
			<li className="dropdown">
				<a href="#" className="dropdown-toggle" data-toggle="dropdown">
					Guilds <b className="caret"></b>
				</a>
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

export default Dropdown;
