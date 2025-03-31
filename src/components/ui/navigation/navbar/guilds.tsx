import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useNavigate } from "react-router-dom";
import classes from "./navbar.module.css";

export default function GuildsSelect() {
	const guilds = useSelector((state: RootState) => state.guilds.data);

	const filteredGuilds = guilds.filter(
		(guild) =>
			(BigInt(guild.permissions) & BigInt(0x20)) === BigInt(0x20) &&
			guild.isBotAdded,
	);
	const navigate = useNavigate();

	const handleGuildClick = (guild: {
		id: string;
		name: string;
		icon: string;
	}) => {
		const currentPage = window.location.pathname.split("/").slice(4).join("/");
		 console.log("currentPage", currentPage);
		 const hasNumber = /\d/.test(currentPage); // fix problem with different custombots on different guilds
		//  console.log("hasNumber", hasNumber);
		 if (hasNumber) {
			navigate(`/dashboard/guild/${guild.id}/home`, { replace: true });
		} else {
			navigate(`/dashboard/guild/${guild.id}/${currentPage}`, { replace: true });
		}
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
						className={classes.guildIconContainer}
					>
						<img
							src={getGuildIconUrl(guild)}
							alt={guild?.name}
							className={classes.guildIcon}
							onError={(e) => {
								e.currentTarget.src = "/default_guild_icon.png";
							}}
						/>
						<div className={classes.guildNameTooltip}>
							{guild?.name}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
