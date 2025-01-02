import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../../../store";
import { useEffect, useState } from "react";
import { fetchGuilds } from "../../../../thunks/guilds";
import { useNavigate } from "react-router-dom";
import classes from "./navbar.module.css";
export type ColourOption = {
	value: string;
	label: string;
	isFixed?: boolean;
	color: string;
};

export type colourOptions = {
	value: string;
	label: string;
	isFixed?: boolean;
};

export default function GuildsSelect() {
	const guilds = useSelector((state: RootState) => state.guilds.data);
	const [searchTerm] = useState("");

	const filteredGuilds = guilds.filter((guild) =>
		guild?.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const navigate = useNavigate();

	const handleGuildClick = (guild: {
		id: string;
		name: string;
		icon: string;
	}) => {
		navigate(`/dashboard/guild/${guild.id}/home`);
	};

	const getGuildIconUrl = (guild: { id: string; icon: string }) =>
		guild.icon
			? `https://cdn.discordapp.com/icons/${guild?.id}/${guild?.icon}.png`
			: `/default_guild_icon.png`;

	if (guilds.length === 0) {
		return (
			<div className={`${classes.guildsList} ${classes.loading}`}>
				{Array.from({ length: 15 }).map((_, index) => (
					<div
						key={index}
						className={`${classes.guildIcon} ${classes.loading}`}
					/>
				))}
			</div>
		);
	}
	return (
		<div>
			<div className={classes.guildsList}>
				{filteredGuilds.map((guild) => (
					<div
						key={guild?.id}
						onClick={() => handleGuildClick(guild)}
						title={guild?.name}
					>
						<img
							src={getGuildIconUrl(guild)}
							alt={guild?.name}
							className={classes.guildIcon}
							onError={(e) => {
								e.currentTarget.src = "/default_guild_icon.png";
							}}
						/>
					</div>
				))}
			</div>
		</div>
	);
}
