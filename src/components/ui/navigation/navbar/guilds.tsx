import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchGuilds } from "@/thunks/guilds";
import classes from "./navbar.module.css";
import { Suspense } from "react";
function GuildsList() {
	const guilds = useSelector((state: RootState) =>
		state.guilds.haveGuildsFetched ? state.guilds.data : [],
	);

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
		const currentPage = window.location.pathname
			.split("/")
			.slice(4)
			.join("/");
		const hasNumber = /\d/.test(currentPage);
		if (hasNumber) {
			navigate(`/dashboard/guild/${guild.id}/home`, { replace: true });
		} else {
			navigate(`/dashboard/guild/${guild.id}/${currentPage}`, {
				replace: true,
			});
		}
	};
	const getGuildIconUrl = (guild: { id: string; icon: string }) =>
		guild.icon
			? `https://cdn.discordapp.com/icons/${guild?.id}/${guild?.icon}.png`
			: `/default_guild_icon.png`;

	return (
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
	);
}
function LoadingSkeleton() {
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

function GuildsLoader() {
	const dispatch = useDispatch<AppDispatch>();
	const haveGuildsFetched = useSelector(
		(state: RootState) => state.guilds.haveGuildsFetched,
	);

	useEffect(() => {
		dispatch(fetchGuilds());
	}, [dispatch]);

	if (!haveGuildsFetched) {
		return <LoadingSkeleton />;
	}

	return <GuildsList />;
}

export default function GuildsSelect() {
	return (
		<Suspense fallback={<LoadingSkeleton />}>
			<GuildsLoader />
		</Suspense>
	);
}
