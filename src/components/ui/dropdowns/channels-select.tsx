import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../../store";
import { useEffect, useState } from "react";
import { fetchChannels } from "../../../thunks/channels";
import { useParams } from "react-router-dom";

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

export default function ChannelsSelect() {
	const { id: guildId } = useParams();
	if (!guildId) {
		throw new Error("Guild ID is missing");
	}
	const dispatch = useDispatch<AppDispatch>();

	const areChannelsFetched = useSelector(
		(state: RootState) => state.channels.areChannelsFetched,
	);

	useEffect(() => {
		if (!areChannelsFetched) {
			dispatch(fetchChannels(guildId as string));
		}
	});

	const channels = useSelector((state: RootState) => state.channels.data);
	const [searchTerm, setSearchTerm] = useState("");

	const [dropdownVisible, setDropdownVisible] = useState(false);
	const [selectedChannel, setSelectedChannel] = useState<{
		id: string;
		name: string;
	} | null>(null);

	const filteredChannels = channels.filter((channel) =>
		channel.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);
	const handleChannelClick = (channel: { id: string; name: string }) => {
		setSelectedChannel(channel);
		setDropdownVisible(false);
	};

	return (
		<div className="dropdown">
			<Select
				className="select"
				options={filteredChannels.map(
					(channel: { id: any; name: any }) => ({
						value: channel.id,
						label: channel.name,
					}),
				)}
				onChange={(selectedOption) => {
					const channel = channels.find(
						(ch: { id: any }) => ch.id === selectedOption?.value,
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
					IndicatorSeparator: () => null,
				}}
			/>
		</div>
	);
}
