"use client";

import type { AppDispatch, RootState } from "@/app/store";
import { fetchGuilds } from "@/app/thunks/guilds";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Dropdown = () => {
	const dispatch = useDispatch<AppDispatch>();

	const guilds = useSelector((state: RootState) =>
		Array.isArray(state.guilds.data) ? state.guilds.data : undefined,
	);

	useEffect(() => {
		dispatch(fetchGuilds());
	}, [dispatch]);

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
								<a href="#">
									<img
										src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
										alt={guild.name}
										className="guild-icon"
									/>
									{guild.name}
								</a>
							</li>
						))}
				</ul>
			</li>
		</ul>
	);
};

export default Dropdown;
