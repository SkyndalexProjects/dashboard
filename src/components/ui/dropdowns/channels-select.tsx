import Select from "react-select";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./dropdowns.module.css";
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
	const channels = useSelector((state: RootState) => state.channels.data);
	
	const [searchTerm, setSearchTerm] = useState("");

	const [dropdownVisible, setDropdownVisible] = useState(false);
	const [selectedChannel, setSelectedChannel] = useState<{
		id: string;
		name: string;
	} | null>(null);

	console.log("channels", channels);
	const filteredChannels = channels
		? channels.filter((channel) =>
			channel.name.toLowerCase().includes(searchTerm.toLowerCase()),
		)
		: [];
	const handleChannelClick = (channel: { id: string; name: string }) => {
		setSelectedChannel(channel);
		setDropdownVisible(false);
	};

	const DropdownIndicator = ({
		isDropdownOpen,
	}: { isDropdownOpen: boolean }) => (
		<img
			src="/dropdown_vector.svg"
			alt="dropdown icon"
			className={`${classes.dropdownIcon} ${isDropdownOpen ? "rotate" : ""}`}
		/>
	);

	return (
		<div className="dropdown">
			<Select
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
						border: "1px solid #242424",
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
						backgroundColor: "#ffffff",
						width: "100%",
						border: "1px solid #ffffff",
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
								? "#242424"
								: "#242424",
						color: "#ffffff",
						border: state.isFocused
							? "1px solid #ffffff"
							: "1px solid #242424",
					}),
				}}
				components={{
					DropdownIndicator: () => (
						<DropdownIndicator isDropdownOpen={dropdownVisible} />
					),

					IndicatorSeparator: () => null,
				}}
			/>
		</div>
	);
}
