import Navbar from "@/components/ui/navigation/navbar";
import Sidebar from "@/components/ui/navigation/sidebar";
import classes from "./main-settings.module.css";
import Switch from "@/components/ui/inputs/switch";
import WelcomingTabs from "@/dashboard/guild/[id]/main-settings/tabs/welcoming-tabs";
import React, { useState } from "react";
import Select, { SelectOption } from "@/components/ui/inputs/search";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
export default function MainSettings() {
	// const channels = useSelector((state: RootState) => state.channels.data);
	//
	// const filteredChannels = channels
	// 	.filter((channel) =>
	// 		channel.name.toLowerCase().includes(searchTerm.toLowerCase()),
	// 	)
	// 	.slice(0, 5);
	interface SettingProps {
		name: string;
	}

	interface Command {
		id: number;
		name: string;
		description: string;
	}
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
		const [commandSearchTerm, setCommandSearchTerm] = useState("");

		const handleCommandSearchChange = (value: string) => {
			setCommandSearchTerm(value);
		};

		return (
			<div className={classes.setting}>
				<div className={classes.settingOverlay}>
					<p className={classes.overlayTitle}>BLOCKED COMMANDS</p>

					<Select
						value={commandSearchTerm}
						onChange={handleCommandSearchChange}
						searchTerm={commandSearchTerm}
						setSearchTerm={setCommandSearchTerm}
						className={classes.selectContainer}
						placeholder="Search for a command"
						inputClassName={classes.inputContainer}
						indicatorClassName={classes.indicator}
						disableSearch={false}
					>
						{exampleCommands.map((command) => (
							<SelectOption key={command.id} value={command.name}>
								{command.name}
							</SelectOption>
						))}
					</Select>
				</div>
			</div>
		);
	}

	function BlockedChannels() {
		const [channelSearchTerm, setChannelSearchTerm] = useState("");

		const handleChannelSearchChange = (value: string) => {
			setChannelSearchTerm(value);
		};

		const channels = useSelector((state: RootState) => state.channels.data);

		const filteredChannels = channels
			.filter((channel) =>
				channel.name
					.toLowerCase()
					.includes(channelSearchTerm.toLowerCase()),
			)
			.slice(0, 5);

		return (
			<div className={classes.setting}>
				<div className={classes.settingOverlay}>
					<p className={classes.overlayTitle}>BLOCKED CHANNELS</p>

					<Select
						value={channelSearchTerm}
						onChange={handleChannelSearchChange}
						searchTerm={channelSearchTerm}
						setSearchTerm={setChannelSearchTerm}
						className={classes.selectContainer}
						placeholder="Search for a channel"
						inputClassName={classes.inputContainer}
						indicatorClassName={classes.indicator}
						disableSearch={false}
					>
						{filteredChannels.map((channel) => (
							<SelectOption key={channel.id} value={channel.name}>
								{channel.name}
							</SelectOption>
						))}
					</Select>
				</div>
			</div>
		);
	}
}
