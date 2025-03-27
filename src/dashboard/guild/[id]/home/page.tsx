import Navbar from "@/components/ui/navigation/navbar";
import Sidebar from "@/components/ui/navigation/sidebar";
import BetaWarning from "@/components/ui/alerts/beta-warning";
import JoinSupportAlert from "@/components/ui/alerts/support-join-warning";
import classes from "./home.module.css";
import SearchSelect from "@/components/ui/inputs/search";
import { SelectOption } from "@/components/ui/inputs/search";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useState } from "react";
interface SettingContainerProps {
	title: string;
	children?: React.ReactNode;
}
interface SettingInputProps {
	title: string;
	options: { id: string; name: string }[];
	searchTerm: string;
	setSearchTerm: (value: string) => void;
	onChange: (value: string) => void;
}
const SettingContainer = ({
	title,
	children,
}: SettingContainerProps & { children?: React.ReactNode }) => (
	<div className={classes.container}>
		<p className={classes.containerTitle}>{title}</p>
		{children}
	</div>
);
const SettingInput = ({
	title,
	options,
	searchTerm,
	setSearchTerm,
	onChange,
}: SettingInputProps) => (
	<div className={classes.inputContainer}>
		<p className={classes.inputTitle}>{title}</p>
		<SearchSelect
			value={searchTerm}
			onChange={onChange}
			searchTerm={searchTerm}
			setSearchTerm={setSearchTerm}
			inputClassName={classes.searchInput}
			indicatorClassName={classes.searchIndicator}
		>
			{options.map((option) => (
				<SelectOption key={option.id} value={option.name}>
					{option.name}
				</SelectOption>
			))}
		</SearchSelect>
	</div>
);
export default function Page() {
	const [starboardChannelSearchTerm, setStarboardChannelSearchTerm] =
		useState("");
	const [starboardTypeSearchTerm, setStarboardTypeSearchTerm] = useState("");
	const [welcomeChannelSearchTerm, setWelcomeChannelSearchTerm] =
		useState("");
	const [goodbyeChannelSearchTerm, setGoodbyeChannelSearchTerm] =
		useState("");
	const [autoRoleSearchTerm, setAutoRoleSearchTerm] = useState("");

	const [, setStarboardChannel] = useState("");
	const [, setStarboardType] = useState("");
	const [, setWelcomeChannel] = useState("");
	const [, setGoodbyeChannel] = useState("");
	const [, setAutoRole] = useState("");

	const channels = useSelector((state: RootState) => state.channels.data);
	const roles = useSelector((state: RootState) => state.roles.data);

	const filteredChannels = (searchTerm: string) =>
		channels
			.filter((channel) =>
				channel.name.toLowerCase().includes(searchTerm.toLowerCase()),
			)
			.slice(0, 5);

	const filteredRoles = (searchTerm: string) =>
		roles
			.filter((role) =>
				role.name.toLowerCase().includes(searchTerm.toLowerCase()),
			)
			.slice(0, 5);

	const starboardTypeChoices = [
		{ label: "Quote", value: "quote" },
		{ label: "Normal message", value: "normal" },
	];

	const handleStarboardChannelChange = (value: string) => {
		setStarboardChannel(value);
	};
	const handleStarboardTypeChange = (value: string) => {
		setStarboardType(value);
	};
	const handleWelcomeChannelChange = (value: string) => {
		setWelcomeChannel(value);
	};
	const handleGoodbyeChannelChange = (value: string) => {
		setGoodbyeChannel(value);
	};
	const handleAutoRoleChange = (value: string) => {
		setAutoRole(value);
	};

	return (
		<div>
			<Navbar />
			<Sidebar />
			<BetaWarning />
			<JoinSupportAlert />

<p className={classes.sectionTitle}> Main settings 

<svg
						width="185"
						height="4"
						viewBox="0 0 185 4"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						style={{
							flexShrink: 0,
							strokeWidth: 4,
							stroke: "#275EE7",
						}}
						className={classes.sectionTitleVector}
					>
						<line x1="0" y1="2" x2="185" y2="2" />
					</svg>
</p>
			<SettingContainer title="Starboard">
				<SettingInput
					title="Starboard Channel"
					options={filteredChannels(starboardChannelSearchTerm)}
					searchTerm={starboardChannelSearchTerm}
					setSearchTerm={setStarboardChannelSearchTerm}
					onChange={handleStarboardChannelChange}
				/>
				<SettingInput
					title="Starboard Type"
					options={starboardTypeChoices.map((choice) => ({
						id: choice.value,
						name: choice.label,
					}))}
					searchTerm={starboardTypeSearchTerm}
					setSearchTerm={setStarboardTypeSearchTerm}
					onChange={handleStarboardTypeChange}
				/>
			</SettingContainer>
			<SettingContainer title="Welcoming">
				<SettingInput
					title="Welcome Channel"
					options={filteredChannels(welcomeChannelSearchTerm)}
					searchTerm={welcomeChannelSearchTerm}
					setSearchTerm={setWelcomeChannelSearchTerm}
					onChange={handleWelcomeChannelChange}
				/>
				<SettingInput
					title="Goodbye Channel"
					options={filteredChannels(goodbyeChannelSearchTerm)}
					searchTerm={goodbyeChannelSearchTerm}
					setSearchTerm={setGoodbyeChannelSearchTerm}
					onChange={handleGoodbyeChannelChange}
				/>
			</SettingContainer>
			<SettingContainer title="Additionals">
				<SettingInput
					title="Auto Role"
					options={filteredRoles(autoRoleSearchTerm)}
					searchTerm={autoRoleSearchTerm}
					setSearchTerm={setAutoRoleSearchTerm}
					onChange={handleAutoRoleChange}
				/>
			</SettingContainer>
		</div>
	);
}
