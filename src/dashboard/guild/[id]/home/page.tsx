import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { AppDispatch, RootState } from "../../../../store";
import { fetchChannels } from "../../../../thunks/channels";
import { fetchGuilds } from "../../../../thunks/guilds";
import { fetchUser } from "../../../../thunks/user";
import { fetchRoles } from "../../../../thunks/roles";
import Select, { StylesConfig} from "react-select";
import chroma from "chroma-js"
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

	const areRolesFetched = useSelector(
		(state: RootState) => state.roles.areRolesFetched,
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
		if (!areRolesFetched) {
			dispatch(fetchRoles(guildId as string));
		}
	}, [dispatch, haveGuildsFetched, isUserFetched, areChannelsFetched, areRolesFetched]);

	const guild = useSelector((state: RootState) =>
		Array.isArray(state.guilds.data)
			? state.guilds.data.find((x) => x.id === guildId)
			: undefined,
	);
	const roles =  useSelector((state: RootState) => state.roles.data);
	console.log("roles", roles);

	const channels = useSelector((state: RootState) => state.channels.data);


	const handleChannelClick = (channel: { id: string; name: string }) => {
		setSelectedChannel(channel);
		setDropdownVisible(false);
	};

	const filteredChannels = channels.filter((channel) =>
		channel.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);
	
	
	const colourStyles: StylesConfig<ColourOption, true> = {
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
		option: (provided, { data, isDisabled, isFocused, isSelected }) => ({
			...provided,
			padding: "12px 16px",
			whiteSpace: "nowrap",
			backgroundColor: isDisabled
				? undefined
				: isSelected
				? data.color
				: isFocused
				? chroma(data.color).alpha(0.1).css()
				: "#101111d9",
			color: isDisabled
				? '#ccc'
				: isSelected
				? chroma.contrast(chroma(data.color), 'white') > 2
					? 'white'
					: 'black'
				: data.color,
			cursor: isDisabled ? 'not-allowed' : 'default',
		}),
		multiValue: (styles, { data }) => {
			const color = chroma(data.color);
			return {
				...styles,
				backgroundColor: color.alpha(0.1).css(),
			};
		},
		multiValueLabel: (styles, { data }) => ({
			...styles,
			color: data.color,
		}),
		multiValueRemove: (styles, { data }) => ({
			...styles,
			color: data.color,
			':hover': {
				backgroundColor: data.color,
				color: 'white',
			},
		}),
	};

	return (
		<div>
			<h1> tutaj będzie panel zarządzania dla serwera {guild?.name}</h1>

			<div className="dropdown">
				<Select
					className="select"
					options={filteredChannels.map((channel: { id: any; name: any; }) => ({
						value: channel.id,
						label: channel.name,
					}))}
					onChange={(selectedOption) => {
						const channel = channels.find(
							(ch: { id: any; }) => ch.id === selectedOption?.value,
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
				<Select
					placeholder="Select roles..."
					options={roles.map((role: { id: string; name: string; color: string; }) => ({ value: role.id, label: role.name, color: role.color }))}
					closeMenuOnSelect={false}
					defaultValue={[roles[0], roles[1]]}
					isMulti
					styles={colourStyles}
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
