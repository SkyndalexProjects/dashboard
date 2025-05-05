import Navbar from "@/components/ui/navigation/navbar";
import Sidebar from "@/components/ui/navigation/sidebar";
import classes from "./main-settings.module.css";
import Switch from "@/components/ui/inputs/switch";
import WelcomingTabs from "@/dashboard/guild/[id]/main-settings/tabs/welcoming-tabs";
import React, { useState } from "react";
import Select, { SelectOption } from "@/components/ui/inputs/search";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import MultiSelect from "@/components/ui/inputs/multi";
export default function MainSettings() {
	const exampleCommands = [
		{
			id: 1,
			name: "Command 1",
			description: "Description 1",
		},
		{
			id: 2,
			name: "Command 2",
			description: "Description 2",
		},
	];
	return (
		<div>
			<Navbar />
			<Sidebar />
			<p className={classes.greetingsAndFarewell}>
				{" "}
				Greetings & Farewell
				<div className={classes.underlineVector}></div>
			</p>

			<div className={classes.container}>
				<WelcomingTabs />
			</div>

			<p className={classes.permissions}>
				{" "}
				Permissions
				<div className={classes.underlineVector}></div>
			</p>

			<div className={classes.permissionSettings}>
				<BlockedCommands />
				<BlockedChannels />
			</div>
		</div>
	);

	function BlockedCommands() {
		const [blockedCommands, setBlockedCommands] = useState<string[]>([
			"Command 1",
			"Command 2",
			"Command 3",
			"Command 4",
			"Command 5",
			"Command 6",
			"Command 7",
			"Command 8",
		]);
		const [commandSearchTerm, setCommandSearchTerm] = useState("");

		const handleCommandChange = (values: string[]) => {
			setBlockedCommands(values);
		};

		return (
			<div className={classes.setting}>
				<div className={classes.settingOverlay}>
					<p className={classes.overlayTitle}>BLOCKED COMMANDS</p>

					<MultiSelect
						values={blockedCommands}
						onChange={handleCommandChange}
						searchTerm={commandSearchTerm}
						setSearchTerm={setCommandSearchTerm}
						className={classes.selectContainer}
						inputClassName={classes.inputContainer}
						indicatorClassName={classes.indicator}
						disableSearch={false}
					>
						{exampleCommands.map((command) => (
							<SelectOption key={command.id} value={command.name}>
								{command.name}
							</SelectOption>
						))}
					</MultiSelect>
				</div>
			</div>
		);
	}

	function BlockedChannels() {
		const [blockedChannels, setBlockedChannels] = useState<string[]>([]);
		const [channelsSearchTerm, setChannelsSearchTerm] = useState("");

		const handleChannelChange = (values: string[]) => {
			setBlockedChannels(values);
		};

		const channels = useSelector((state: RootState) => state.channels.data);

		const filteredChannels = channels
			.filter((channel) =>
				channel.name
					.toLowerCase()
					.includes(channelsSearchTerm.toLowerCase()),
			)
			.slice(0, 5);

		return (
			<div className={classes.setting}>
				<div className={classes.settingOverlay}>
					<p className={classes.overlayTitle}>BLOCKED CHANNELS</p>

					<MultiSelect
						values={blockedChannels}
						onChange={handleChannelChange}
						searchTerm={channelsSearchTerm}
						setSearchTerm={setChannelsSearchTerm}
						className={classes.selectContainer}
						placeholder="Search for a channel"
						inputClassName={classes.inputContainer}
						indicatorClassName={classes.indicator}
						disableSearch={false}
					>
						{filteredChannels.map((channel: Channel) => (
							<SelectOption key={channel.id} value={channel.name}>
								{channel.name}
							</SelectOption>
						))}
					</MultiSelect>
				</div>
			</div>
		);
	}
}
