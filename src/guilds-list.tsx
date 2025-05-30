import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import "./index.css";
import { Link } from "react-router-dom";
import { fetchGuilds } from "./features/guilds";
import { fetchUser } from "@/features/user";
import { useTranslation } from "react-i18next";
import { useRef } from "react";

export default function GuildsList() {
	const dispatch = useAppDispatch();

	const haveGuildsFetched = useAppSelector(
		(state) => state.guilds.haveGuildsFetched,
	);
	const isUserFetched = useAppSelector((state) => state.user.isUserFetched);
	const isInitialFetch = useRef(true);

	const guilds = useAppSelector((state) => state.guilds.data);
	const user = useAppSelector((state) => state.user.data as unknown as User);

	useEffect(() => {
		if (isInitialFetch.current) {
			if (!haveGuildsFetched) {
				dispatch(fetchGuilds());
			}
			if (!isUserFetched) {
				dispatch(fetchUser());
			}
			isInitialFetch.current = false;
		}
	}, [haveGuildsFetched, isUserFetched, dispatch]);

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
			<div>
				<h1 className="title skeleton-text"></h1>
				<h2 className="subtitle skeleton-text"></h2>
				<div className="guilds-container">
					<div className="guilds-grid">
						{Array.from({ length: 9 }).map((_, index) => (
							<div key={index} className="guild skeleton">
								<div className="guild-icon-skeleton"></div>
								<div className="guild-name-skeleton"></div>
								<div className="guild-button-skeleton"></div>
							</div>
						))}
					</div>
				</div>
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
							<Link
								to={`/dashboard/guild/${guild?.id}/home`}
								className="guild-button"
							>
								<img src="/gear.svg" alt="gear icon" />
								{t("guild_list.button_set", {
									username: user?.username,
								})}
							</Link>
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
							<Link
								to={`/dashboard/guild/${guild?.id}/add`}
								className="guild-button"
							>
								<img src="/invite.svg" alt="plus icon" />
								{t("guild_list.button_invite", {
									username: user?.username,
								})}
							</Link>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
