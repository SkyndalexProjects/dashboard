import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState, AppDispatch } from "./store";
import { fetchGuilds } from "./thunks/guilds";
import { fetchUser } from "./thunks/user";

interface User {
	username: string;
}

export default function GuildsList() {
	const dispatch = useDispatch<AppDispatch>();
	const guilds = useSelector((state: RootState) => state.guilds.data);
	const user = useSelector(
		(state: RootState) => state.user.data as unknown as User,
	);

	useEffect(() => {
		dispatch(fetchGuilds());
		dispatch(fetchUser());
	}, [dispatch]);

	return (
		<div>
			<h1 className="title"> Welcome, {user?.username} </h1>
			<h2 className="subtitle"> Please, choose guild:</h2>
			<div className="guilds-container">
				<div className="guilds-grid">
					{guilds.map((guild) => (
						<div className="guild">
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
							/>
							<p className="guild-name">{guild?.name}</p>
							<button className="guild-button">
								<Link
									key={guild?.id}
									to={`/dashboard/guild/${guild?.id}/home`}
									className="guild-button"
								>
									<img src="/gear.svg" alt="gear icon" />
									SET
								</Link>
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
