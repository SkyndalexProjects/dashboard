import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { Link } from "react-router-dom";
import type { RootState, AppDispatch } from "./store";
import { fetchGuilds } from "./thunks/guilds";
import { fetchUser } from "./thunks/user";
import { useTranslation } from "react-i18next";
export default function GuildsList() {
	const dispatch = useDispatch<AppDispatch>();
	const guilds = useSelector((state: RootState) =>
		state.guilds.haveGuildsFetched ? state.guilds.data : [],
	);
	const haveGuildsFetched = useSelector(
		(state: RootState) => state.guilds.haveGuildsFetched,
	);
	const user = useSelector(
		(state: RootState) => state.user.data as unknown as User,
	);

	useEffect(() => {
		if (!haveGuildsFetched) {
			dispatch(fetchGuilds());
		}
		if (Object.keys(user).length === 0) {
			dispatch(fetchUser());
		}
		if (guilds.length === 0 && haveGuildsFetched) {
			dispatch(fetchGuilds());
		}
	}, [dispatch, haveGuildsFetched, user, guilds]);

	const { t } = useTranslation();
	const withBotAdded = guilds.filter(
		(guild) =>
			(BigInt(guild.permissions) & BigInt(0x20)) === BigInt(0x20) &&
			guild.isBotAdded,
	);
	const withoutBotAdded = guilds.filter(
		(guild) =>
			(BigInt(guild.permissions) & BigInt(0x20)) === BigInt(0x20) &&
			!guild.isBotAdded,
	);

	if (withBotAdded.length === 0 && withoutBotAdded.length === 0) {
		return (
			<div className="guild loading">
				{Array.from({ length: 15 }).map((_, index) => (
					<div key={index} className="guild-overlay loading">
						<div className="guild-icon loading" />
						<div className="guild-name loading" />
						<div className="guild-button loading" />
					</div>
				))}
			</div>
		);
	}
	return (
		<div>
			<h1 className="title">
				{t("guild_list.welcome_message", {
					username: user?.username,
				})}{" "}
			</h1>
			<h2 className="subtitle">
				{" "}
				{t("guild_list.choosing_message", {
					username: user?.username,
				})}{" "}
			</h2>
			<div className="guilds-container">
				<div className="guilds-grid">
					{withBotAdded.map((guild) => (
						<div className="guild" key={guild?.id}>
							<img
								src={
									guild?.icon
										? `https://cdn.discordapp.com/icons/${guild?.id}/${guild?.icon}.png`
										: "/default_guild_icon.png"
								}
								alt={`<no icon>`}
								onError={(e) => {
									e.currentTarget.src =
										"/default_guild_icon.png";
								}}
								className="guild-icon"
							/>
							<p className="guild-name">{guild?.name}</p>
							<button className="guild-button">
								<Link
									to={`/dashboard/guild/${guild?.id}/home`}
									className="guild-button"
								>
									<img src="/gear.svg" alt="gear icon" />
									{t("guild_list.button_set", {
										username: user?.username,
									})}
								</Link>
							</button>
						</div>
					))}

					{withoutBotAdded.map((guild) => (
						<div className="guild" key={guild?.id}>
							<img
								src={
									guild?.icon
										? `https://cdn.discordapp.com/icons/${guild?.id}/${guild?.icon}.png`
										: "/default_guild_icon.png"
								}
								alt={`<no icon>`}
								onError={(e) => {
									e.currentTarget.src =
										"/default_guild_icon.png";
								}}
								className="guild-icon"
							/>
							<p className="guild-name">{guild?.name}</p>
							<button className="guild-button">
								<Link
									to={`/dashboard/guild/${guild?.id}/add`}
									className="guild-button"
								>
									<img src="/invite.svg" alt="plus icon" />
									{t("guild_list.button_invite", {
										username: user?.username,
									})}
								</Link>
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
