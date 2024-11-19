import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../../store";
import { useEffect, useState } from "react";
import { fetchGuilds } from "../../../thunks/guilds";
import { useNavigate, useParams } from "react-router-dom";

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
	const dispatch = useDispatch<AppDispatch>();

	const areChannelsFetched = useSelector(
		(state: RootState) => state.channels.areChannelsFetched,
	);

	useEffect(() => {
		if (!areChannelsFetched) {
			dispatch(fetchGuilds());
		}
	}, [areChannelsFetched, dispatch]);

	const guilds = useSelector((state: RootState) => state.guilds.data);
	const [searchTerm, setSearchTerm] = useState("");

	const [dropdownVisible, setDropdownVisible] = useState(false);
	const [selectedGuild, setSelectedGuild] = useState<{
		id: string;
		name: string;
		icon: string;
	} | null>(null);

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
		setSelectedGuild(guild);
		setDropdownVisible(false);
	};

	const { id: guildId } = useParams();
	const guild = useSelector((state: RootState) =>
		Array.isArray(state.guilds.data)
			? state.guilds.data.find((x) => x.id === guildId)
			: undefined,
	);

	const getGuildIconUrl = (guild: { id: string; icon: string }) =>
		guild.icon
			? `https://cdn.discordapp.com/icons/${guild?.id}/${guild?.icon}.png`
			: `/default_guild_icon.png`;

	return (
		<div>
			<div className="guilds-list">
				{filteredGuilds.map((guild) => (
					<div
						key={guild?.id}
						onClick={() => handleGuildClick(guild)}
						title={guild?.name}
					>
						<img
							src={getGuildIconUrl(guild)}
							alt={guild?.name}
							className="guild-icon"
						/>
					</div>
				))}
			</div>
		</div>
	);
}
