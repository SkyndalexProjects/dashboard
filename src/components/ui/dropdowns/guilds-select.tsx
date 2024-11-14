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
		guild.name.toLowerCase().includes(searchTerm.toLowerCase()),
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
		`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`;

	return (
		<div className="dropdown">
			<Select
				className="select"
				options={filteredGuilds.map(
					(guild: { id: string; name: string; icon: string }) => ({
						value: guild.id,
						label: (
							<div
								style={{
									display: "flex",
									alignItems: "center",
								}}
							>
								<img
									src={getGuildIconUrl(guild)}
									alt={guild.name}
									style={{
										width: 20,
										height: 20,
										marginRight: 10,
									}}
								/>
								{guild.name}
							</div>
						),
						icon: guild.icon,
					}),
				)}
				onChange={(selectedOption) => {
					const guild = guilds.find(
						(ch: { id: string }) => ch.id === selectedOption?.value,
					);
					if (guild) {
						handleGuildClick(guild);
					}
				}}
				placeholder={
					guild ? (
						<div style={{ display: "flex", alignItems: "center" }}>
							<img
								src={getGuildIconUrl(guild)}
								alt={guild.name}
								style={{
									width: 20,
									height: 20,
									marginRight: 10,
								}}
							/>
							{guild.name}
						</div>
					) : (
						"Select a guild"
					)
				}
				inputValue={searchTerm}
				onInputChange={(newValue) => setSearchTerm(newValue)}
				onMenuOpen={() => setDropdownVisible(true)}
				onMenuClose={() => setDropdownVisible(false)}
				value={
					selectedGuild
						? {
								value: selectedGuild.id,
								label: (
									<div
										style={{
											display: "flex",
											alignItems: "center",
										}}
									>
										<img
											src={getGuildIconUrl(selectedGuild)}
											alt={selectedGuild.name}
											style={{
												width: 20,
												height: 20,
												marginRight: 10,
											}}
										/>
										{selectedGuild.name}
									</div>
								),
							}
						: null
				}
				styles={{
					control: (provided) => ({
						...provided,
						backgroundColor: "#101111a6",
						border: "1px solid #0048ff",
						color: "#ffffff",
						fontSize: "16px",
						fontWeight: "bold",
						cursor: "pointer",
						height: "43px",
						borderRadius: "5px",
						paddingLeft: "10px",
						textAlign: "left",
						position: "relative",
						paddingRight: "40px",
					}),
					menu: (provided) => ({
						...provided,
						color: "#ffffff",
						backgroundColor: "#101111d9",
						width: "185px",
						border: "1px solid #0048ff",
						borderRadius: "10px",
						marginTop: "10px",
						zIndex: 1,
						maxHeight: "300px",
						overflowY: "auto",
						overflowWrap: "break-word",
					}),
					option: (provided, state) => ({
						...provided,
						padding: "12px 16px",
						whiteSpace: "nowrap",
						backgroundColor: state.isSelected
							? "#101111d9"
							: state.isFocused
								? "#101111a6"
								: "#101111d9",
						color: "#ffffff",
					}),
				}}
				components={{
					DropdownIndicator: () => (
						<img src={"/dropdown_vector.svg"} alt="dropdown icon" />
					),
					IndicatorSeparator: () => null,
				}}
			/>
		</div>
	);
}
