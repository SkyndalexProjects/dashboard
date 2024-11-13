import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { AppDispatch, RootState } from "../../../../store";
import { fetchChannels } from "../../../../thunks/channels";
import { fetchGuilds } from "../../../../thunks/guilds";
import { fetchUser } from "../../../../thunks/user";
import Select from "react-select";
export default function Page() {
	const { id: guildId } = useParams();
	console.log("guildId", guildId);
	const dispatch = useDispatch<AppDispatch>();

	const [dropdownVisible, setDropdownVisible] = useState(false);
	const [selectedChannel, setSelectedChannel] = useState<{
		id: string;
		name: string;
	} | null>(null);
	const [searchTerm, setSearchTerm] = useState("");

	const haveGuildsFetched = useSelector(
		(state: RootState) => state.guilds.haveGuildsFetched,
	);
	const isUserFetched = useSelector(
		(state: RootState) => state.user.isUserFetched,
	);
	const areChannelsFetched = useSelector(
		(state: RootState) => state.channels.areChannelsFetched,
	);

	useEffect(() => {
		if (!haveGuildsFetched) {
			dispatch(fetchGuilds());
		}
		if (!isUserFetched) {
			dispatch(fetchUser());
		}
		if (!areChannelsFetched) {
			dispatch(fetchChannels(guildId as string));
		}
	}, [dispatch, haveGuildsFetched, isUserFetched, areChannelsFetched]);

	const guild = useSelector((state: RootState) =>
		Array.isArray(state.guilds.data)
			? state.guilds.data.find((x) => x.id === guildId)
			: undefined,
	);

	const channels = useSelector((state: RootState) => state.channels.data);


	const handleChannelClick = (channel: { id: string; name: string }) => {
		setSelectedChannel(channel);
		setDropdownVisible(false);
	};

	const filteredChannels = channels.filter((channel) =>
		channel.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);


	return (
		<div>
			<h1> tutaj będzie panel zarządzania dla serwera {guild?.name}</h1>

			<div className="dropdown">
				<Select
					className="select"
					options={filteredChannels.map((channel) => ({
						value: channel.id,
						label: channel.name,
					}))}
					onChange={(selectedOption) => {
						const channel = channels.find(
							(ch) => ch.id === selectedOption?.value,
						);
						if (channel) {
							handleChannelClick(channel);
						}
					}}
					placeholder="Search channels..."
					inputValue={searchTerm}
					onInputChange={(newValue) => setSearchTerm(newValue)}
					onMenuOpen={() => setDropdownVisible(true)}
					onMenuClose={() => setDropdownVisible(false)}
					value={
						selectedChannel
							? {
									value: selectedChannel.id,
									label: selectedChannel.name,
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
						IndicatorSeparator: () => null
					}}
				/>
			</div>
		</div>
	);
}
