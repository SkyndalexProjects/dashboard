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
			<div className={classes.container}>
				<p className={classes.containerTitle}>
					Main settings
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
						className={classes.titleVector}
					>
						<line x1="0" y1="2" x2="185" y2="2" />
					</svg>
				</p>
			</div>

			<div className={classes.settingsContainer}>
				<p className={classes.containerSubtitle}>
					Starboard
					<p className={classes.optionTitle}>Starboard channel</p>
					<img
						src="/hashtag.svg"
						alt="hashtag"
						className={classes.hashtag}
					/>
					<SearchSelect
						value={starboardChannelSearchTerm}
						onChange={handleStarboardChannelChange}
						searchTerm={starboardChannelSearchTerm}
						setSearchTerm={setStarboardChannelSearchTerm}
						inputClassName={classes.searchInput}
						indicatorClassName={classes.searchIndicator}
					>
						{filteredChannels(starboardChannelSearchTerm).map(
							(channel) => (
								<SelectOption
									key={channel.id}
									value={channel.name}
								>
									{channel.name}
								</SelectOption>
							),
						)}
					</SearchSelect>
					<p className={classes.optionTitle}>Starboard type</p>
					<img src="/star.svg" alt="star" className={classes.star} />
					<SearchSelect
						value={starboardTypeSearchTerm}
						onChange={handleStarboardTypeChange}
						searchTerm={starboardTypeSearchTerm}
						setSearchTerm={setStarboardTypeSearchTerm}
						inputClassName={classes.searchInput}
						indicatorClassName={classes.searchIndicator}
					>
						{starboardTypeChoices.map((type) => (
							<SelectOption key={type.value} value={type.value}>
								{type.label}
							</SelectOption>
						))}
					</SearchSelect>
				</p>
			</div>
			<div className={classes.settingsContainer}>
				<p className={classes.containerSubtitle}>
					Welcoming
					<p className={classes.optionTitle}>Welcome channel</p>
					<img
						src="/hashtag.svg"
						alt="hashtag"
						className={classes.hashtag}
					/>
					<SearchSelect
						value={welcomeChannelSearchTerm}
						onChange={handleWelcomeChannelChange}
						searchTerm={welcomeChannelSearchTerm}
						setSearchTerm={setWelcomeChannelSearchTerm}
						inputClassName={classes.searchInput}
						indicatorClassName={classes.searchIndicator}
					>
						{filteredChannels(welcomeChannelSearchTerm).map(
							(channel) => (
								<SelectOption
									key={channel.id}
									value={channel.name}
								>
									{channel.name}
								</SelectOption>
							),
						)}
					</SearchSelect>
					<p className={classes.optionTitle}>Goodbye channel</p>
					<img
						src="/hashtag.svg"
						alt="hashtag"
						className={classes.hashtag}
					/>
					<SearchSelect
						value={goodbyeChannelSearchTerm}
						onChange={handleGoodbyeChannelChange}
						searchTerm={goodbyeChannelSearchTerm}
						setSearchTerm={setGoodbyeChannelSearchTerm}
						inputClassName={classes.searchInput}
						indicatorClassName={classes.searchIndicator}
					>
						{filteredChannels(goodbyeChannelSearchTerm).map(
							(channel) => (
								<SelectOption
									key={channel.id}
									value={channel.name}
								>
									{channel.name}
								</SelectOption>
							),
						)}
					</SearchSelect>
				</p>
			</div>
			<div className={classes.settingsContainer}>
				<p className={classes.containerSubtitle}>
					Additional
					<p className={classes.optionTitle}>Auto role</p>
					<SearchSelect
						value={autoRoleSearchTerm}
						onChange={handleAutoRoleChange}
						searchTerm={autoRoleSearchTerm}
						setSearchTerm={setAutoRoleSearchTerm}
						inputClassName={classes.searchInput}
						indicatorClassName={classes.searchIndicator}
					>
						{filteredRoles(autoRoleSearchTerm).map((role) => (
							<SelectOption key={role.id} value={role.name}>
								{role.name}
							</SelectOption>
						))}
					</SearchSelect>
				</p>
			</div>
		</div>
	);
}
