import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import { fetchGuilds } from "../thunks/guilds";
import { fetchUser } from "../thunks/user";
import { useParams } from "react-router-dom";

interface Guild {
	id: string;
	name: string;
	icon: string;
	approximate_member_count: number;
}

interface User {
	username: string;
	id: string;
	avatar: string;
}
export default function ViewPanel() {
	const { id: guildId } = useParams();
	const dispatch = useDispatch<AppDispatch>();

	const haveGuildsFetched = useSelector((state: RootState) => {
		return state.guilds.haveGuildsFetched;
	});
	const isUserFetched = useSelector((state: RootState) => {
		return state.user.isUserFetched;
	});

	useEffect(() => {
		if (!haveGuildsFetched) {
			dispatch(fetchGuilds());
		}
		if (!isUserFetched) {
			dispatch(fetchUser());
		}
	}, [dispatch, haveGuildsFetched, isUserFetched]);

	const guilds = useSelector((state: RootState) => state.guilds.data);
	const user = useSelector(
		(state: RootState) => state.user.data as unknown as User,
	) as User;

	console.log("user", user);
	const guild = guilds.find((guild: Guild) => guild.id === guildId);

	return (
		<div>
			<div className="view-panel">
				<div className="section_1">
					<p className="hi-message">
						<img
							src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
							alt="User Avatar"
							className="user-avatar"
						/>
						👋 Hi, {user.username}!{" "}
					</p>
					<p className="view-panel-message-desc">
						{" "}
						How do we start?{" "}
					</p>
				</div>
				<div className="section_2">
					<img
						src={`https://cdn.discordapp.com/icons/${guild?.id}/${guild?.icon}.png`}
						alt="Guild Icon"
						className="guild-icon"
					/>
					<div className="section_2-content">
						<p> Users: {guild?.approximate_member_count} </p>
						<p> Today messages sent: X </p>
						<p> Bots: x </p>
					</div>
				</div>
			</div>
		</div>
	);
}
