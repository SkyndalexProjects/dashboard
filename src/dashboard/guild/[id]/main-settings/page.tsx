import Navbar from "@/components/ui/navigation/navbar";
import Sidebar from "@/components/ui/navigation/sidebar";
import classes from "./main-settings.module.css";
import { useDispatch } from "react-redux";
import WelcomingTabs from "@/dashboard/guild/[id]/main-settings/tabs/welcoming-tabs";
import React, { useEffect, useState } from "react";
import { SelectOption } from "@/components/ui/inputs/search";
import { useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import MultiSelect from "@/components/ui/inputs/multi";
import { fetchChannels } from "@/thunks/channels";
import {fetchRoles} from "@/thunks/roles";
interface Role {
	id: string;
	name: string;
	color: string;
	permissions: string;
	position: number;
	hoist: boolean;
	managed: boolean;
	mentionable: boolean;
}
export default function MainSettings() {
	const dispatch = useDispatch<AppDispatch>();

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
			{/* TODO: fix containers*/}

			<Navbar />
			<Sidebar />

			<div className={classes.greetingsAndFarewell}>
				{" "}
				Greetings & Farewell
				<div className={classes.underlineVector}></div>
			</div>

			<div className={classes.container}>
				<WelcomingTabs />
			</div>
			<div className={classes.dangerous}>
				Dangerous
				<div className={classes.underlineVector}></div>
				<Dangerous />
			</div>
			<div className={classes.permissions}>
				{" "}
				Permissions
				<div className={classes.underlineVector}></div>
			</div>

			<div className={classes.additionals}>
				{" "}
				Additionals
				<div className={classes.underlineVector}></div>
			</div>

			<div className={classes.autoRoles}>
				<AutoRoles />
			</div>
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
			console.log("Selected values:", values);
			setBlockedChannels(values);
		};

		const channels = useSelector((state: RootState) => state.channels.data);

		console.log("channels from blocked channels", channels);
		const haveChannelsFetched = useSelector(
			(state: RootState) => state.channels.areChannelsFetched,
		);

		const guildId = location.pathname.split("/")[3];

		useEffect(() => {
			if (!blockedChannels.length && channels.length) {
				setBlockedChannels(channels.map((channel) => channel.name));
			}
		}, [channels, blockedChannels]);

		useEffect(() => {
			if (!haveChannelsFetched) {
				dispatch(fetchChannels(guildId));
			}
		}, []);

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
	function AutoRoles() {
		const [autoRoles, setAutoRoles] = useState<string[]>([]);
		const [rolesSearchTerm, setRolesSearchTerm] = useState("");
		const handleRoleChange = (values: string[]) => {
			setAutoRoles(values);
		};
		const roles = useSelector((state: RootState) => state.roles.data);
		const haveRolesFetched = useSelector(
			(state: RootState) => state.roles.areRolesFetched,
		);
		const guildId = location.pathname.split("/")[3];
		useEffect(() => {
			if (!autoRoles.length && roles.length) {
				setAutoRoles(roles.map((role) => role.name));
			}
		}, [roles, autoRoles]);
		useEffect(() => {
			if (!haveRolesFetched) {
				dispatch(fetchRoles(guildId));
			}
		}, []);

		const filteredRoles = roles
			.filter((role) =>
				role.name.toLowerCase().includes(rolesSearchTerm.toLowerCase()),
			)
			.slice(0, 5);

		return (
			<div className={classes.setting}>
				<div className={classes.settingOverlay}>
					<p className={classes.overlayTitle}>AUTO ROLES</p>

					<MultiSelect
						values={autoRoles}
						onChange={handleRoleChange}
						searchTerm={rolesSearchTerm}
						setSearchTerm={setRolesSearchTerm}
						className={classes.selectContainer}
						inputClassName={classes.inputContainer}
						indicatorClassName={classes.indicator}
						disableSearch={false}
					>
						{filteredRoles.map((role: Role) => (
							<SelectOption key={role.id} value={role.name}>
								{role.name}
							</SelectOption>
						))}
					</MultiSelect>
				</div>
			</div>
		);
	}
	function Dangerous() {
		return (
			<div>
				<div className={classes.alert}>
					<p className={classes.alertText}>
						Be careful! There is no turning back!
					</p>
				</div>

				<div className={classes.whiteDivider} />


				<div className={classes.buttonContainers}>
					<button className={classes.actionButton}>
						Reset economy
					</button>
					<button className={classes.actionButton}>
						Reset settings
					</button>
				</div>
			</div>
		);
	}
}
