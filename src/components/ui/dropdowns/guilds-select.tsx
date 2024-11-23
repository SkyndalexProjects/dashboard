import Select from "react-select";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { useState } from "react";
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

export default function GuildsSelect() {
	const { id: guildId } = useParams();
	if (!guildId) {
		throw new Error("Guild ID is missing");
	}

	const guilds = useSelector((state: RootState) => state.guilds.data);
	const [searchTerm, setSearchTerm] = useState("");

	const [dropdownVisible, setDropdownVisible] = useState(false);
	const [selectedGuild, setSelectedGuild] = useState<{
		id: string;
		name: string;
	} | null>(null);

	console.log("guilds", guilds);
	const filteredChannels = guilds.filter((guild) =>
		guild.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);
	const handleGuildClick = (guild: { id: string; name: string }) => {
		setSelectedGuild(guild);
		setDropdownVisible(false);
	};

	const DropdownIndicator = ({
		isDropdownOpen,
	}: { isDropdownOpen: boolean }) => (
		<img
			src="/dropdown_vector.svg"
			alt="dropdown icon"
			className={`dropdown-icon ${isDropdownOpen ? "rotate" : ""}`}
		/>
	);

	return (
		<div className="guilds-select-container">
			<Select
				options={filteredChannels.map(
					(channel: { id: any; name: any }) => ({
						value: channel.id,
						label: channel.name,
					}),
				)}
				onChange={(selectedOption) => {
					const guild = guilds.find(
						(ch: { id: any }) => ch.id === selectedOption?.value,
					);
					if (guild) {
						handleGuildClick(guild);
					}
				}}
				placeholder="Select guild"
				inputValue={searchTerm}
				onInputChange={(newValue) => setSearchTerm(newValue)}
				onMenuOpen={() => setDropdownVisible(true)}
				onMenuClose={() => setDropdownVisible(false)}
				value={
					selectedGuild
						? {
								value: selectedGuild.id,
								label: selectedGuild.name,
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
